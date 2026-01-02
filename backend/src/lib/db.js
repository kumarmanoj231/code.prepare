import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async ()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined in environment variables");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("✅ Successfully connected to DB code_prepare : ",conn.connection.host);

    }catch(err){
        console.error("❌ Error connecting to MongoDB",err);
        process.exit(1);
    }
};