import axiosInstance from "../lib/axios";

export const sessionApi = {
    createSession : async (data) =>{
        const response = await axiosInstance.post("/sessions",data);
        return response.data;
    },
    getActiveSessions : async () =>{
        const response = await axiosInstance.get("/sessions/active",data);
        return response.data;
    },
    getMyRecentSessions : async () =>{
        const response = await axiosInstance.get("/sessions/my-recent",data);
        return response.data;
    },
    getSessionById : async (id) =>{
        const response = await axiosInstance.get(`/sessions/${id}`,data);
        return response.data;
    },
    joinSession : async (id) =>{
        const response = await axiosInstance.post(`/sessions/${id}/join`,data);
        return response.data;
    },
    endSession : async (id) =>{
        const response = await axiosInstance.post(`/sessions/${id}/end`,data);
        return response.data;
    },
    getStreamToken : async () =>{
        const response = await axiosInstance.get("/chat/token",data);
        return response.data;
    },
}