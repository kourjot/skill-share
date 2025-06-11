import express from 'express';
import cors from 'cors';
// import cron from "node-cron"
import passport from "./config/passport.js"; 
import { connection } from "./config/db.js"


import {userRouter} from "./router/userRouter.js"

import "dotenv/config"
const port = process.env.PORT ||3110
const app = express();
app.use(cors())
app.use(express.json());
// cron.schedule('*/14 * * * *',async()=>{
//     const data=await fetch("https://skill-share-1-v5lq.onrender.com/")
//     let asyncData=await data.json()
//     console.log(asyncData)
// })
app.use(passport.initialize());
app.use(userRouter)
app.listen(port,()=>{
    connection ()
    console.log(`Server is running on port ${port} 🚀`)
})