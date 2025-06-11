import express from 'express';
import cors from 'cors';
import passport from "./config/passport.js"; 
import { connection } from "./config/db.js"


import {userRouter} from "./router/userRouter.js"

import "dotenv/config"
const port = process.env.PORT ||3110
const app = express();
app.use(cors())
app.use(express.json());

app.use(passport.initialize());
app.use(userRouter)
app.listen(port,()=>{
    connection ()
    console.log(`Server is running on port ${port} 🚀`)
})