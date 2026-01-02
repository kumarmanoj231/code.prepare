import express from "express"

import {ENV} from "./lib/env.js"

const app = express();

app.get("/health",(req,res)=>{
    res.status(200).json({msg: "api is up & running"});
    
});

app.listen(ENV.PORT,()=>{
    console.log(`app is listening at PORT : ${ENV.PORT}`);
});
