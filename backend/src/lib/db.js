import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("✅ Successfully connected to DB code_prepare : ",conn.connection.host);

    }catch(err){
        console.error("❌ Error connecting to MongoDB",error);
        process.exit(1);
    }
};