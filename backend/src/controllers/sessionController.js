import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

/**
 * Create a new tutoring session: persists a Session, initializes a video call, and creates a chat channel.
 *
 * Expects req.body to contain `problem` and `difficulty`, and req.user to contain `_id` and `clerkId`.
 * Sends HTTP responses via `res` (400 on validation failure, 201 with the created session, 500 on server error).
 *
 * @param {import('express').Request} req - Request object; body must include `problem` and `difficulty`, and user must include `_id` and `clerkId`.
 * @param {import('express').Response} res - Response object used to send HTTP status and JSON payloads.
 */
export async function createSession(req,res) {
    try {
        const {problem,difficulty}= req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problem || !difficulty){
            return res.status(400).json({message: "Problem and difficulty is required"});
        }

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const session = await Session.create({
            problem,
            difficulty,
            host:userId,
            callId});

        // stream video call
        await streamClient.video.call("default",callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {problem,difficulty,sessionId:session._id.toString()},
            },
        });


        // chat client

        const channel = chatClient.channel("messaging",callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members:[clerkId]
        });

        await channel.create()

        res.status(201).json({session});

    } catch (error) {
        console.log("Error in createSession controller:",error.message);
        req.status(500).json({message: "Internal server error"});
    }
}

/**
 * Retrieve up to 20 active sessions ordered by newest and respond with them in JSON under the `sessions` key.
 *
 * Sends a 200 status with `{ sessions }` when successful; on failure logs the error and responds with a 500 status and a generic error message.
 */
export async function getActiveSessions(_,res) {
    try {
        const sessions = await Session.find({status: "active"})
        .populate("host","name profileImage email clerkId")
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({sessions});

    } catch (error) {
        console.log("Error in getActiveSessions controller:",error.message);
        req.status(500).json({message: "Internal server error"});
    }   
}

/**
 * Fetches the most recent completed sessions involving the requesting user and sends them in the response.
 *
 * Queries sessions with status "completed" where the requester is either the host or the participant, sorted by creation time (newest first) and limited to 20. On success responds with HTTP 200 and JSON { sessions: [...] }. On failure responds with HTTP 500 and JSON { message: "Internal server error" }.
 *
 * @param {import('express').Request} req - Express request; expects authenticated user ID at `req.user._id`.
 * @param {import('express').Response} res - Express response used to send the JSON result or error status.
 */
export async function getMyRecentSessions(req,res) {
    try {
        // where user is either host or participant
        const userId = req.user._id;
        const sessions = await Session.find({
            status:"completed",
            $or: [{host:userId},{participant:userId}]
        }).sort({createdAt:-1}).limit(20);

        res.status(200).json({sessions});

    } catch (error) {
       console.log("Error in getMyRecentSessions controller:",error.message);
        req.status(500).json({message: "Internal server error"}); 
    }
}

/**
 * Retrieve a session by its ID and return it with populated host and participant details.
 *
 * Finds the Session specified by `req.params.id`, populates the host and participant fields
 * with `name`, `email`, `profileImage`, and `clerkId`, and sends the session in the response.
 *
 * @param {import('express').Request} req - Express request object; expects `req.params.id` to be the session ID.
 * @param {import('express').Response} res - Express response object used to send HTTP status and JSON body.
 */
export async function getSessionById(req,res) {
    try {
        const {id} = req.params;

        const session = await Session.findById(id)
        .populate("host", "name email profileImage clerkId")
        .populate("participant", "name email profileImage clerkId");

        if(!session) return res.status(404).json({message: "Session not found"});

        res.status(200).json({session});

    } catch (error) {
        console.log("Error in getSessionById controller:",error.message);
        req.status(500).json({message: "Internal server error"});
    }
}

/**
 * Adds the requesting user as the participant of a session and adds their clerkId to the session's chat channel.
 *
 * If the session does not exist, responds with 404 "Session not found". If the session already has a participant, responds with 404 "Session is full". On success responds with 200 and the updated session. On unexpected errors responds with 500 "Internal server error".
 */
export async function joinSession(req,res) {
    try {
        const {id} = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);
        if(!session) return res.status(404).json({message: "Session not found"});
        
        // check if room full
        if(session.participant) return res.status(404).json({message: "Session is full"});

        session.participant = userId;
        await session.save()

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId])

        res.status(200).json({session});


    } catch (error) {
       console.log("Error in joinSession controller:",error.message);
        req.status(500).json({message: "Internal server error"}); 
    }
}

/**
 * End a session and clean up its associated streaming resources.
 *
 * Marks the session's status as "completed", deletes the associated video call (hard delete)
 * and removes the session's chat channel. Only the session host may end the session; the
 * controller responds with HTTP 404 if the session is not found, 403 if the requester is not
 * the host, and 400 if the session is already completed. On success, the session is persisted
 * with status "completed" and streaming resources are removed.
 */
export async function endSession(req,res) {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);
        if(!session) return res.status(404).json({message: "Session not found"});

        // check if user is the host
        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({message: "Only host can end the session"});
        }

        // check session is already completed
        if(session.status == "completed"){
            return res.status(400).json({message: "Session already ended."});
        }
        session.status = "completed";
        await session.save();

        // delete the call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({hard: true});

        // delete stream chat channel
        const channel = chatClient.channel("messaging",session.callId);
        await channel.delete();

    } catch (error) {
        console.log("Error in endSession controller:",error.message);
        req.status(500).json({message: "Internal server error"}); 
    }
}