import express from 'express';
import { connection } from "./config/db.js"
import "dotenv/config"
const port = process.env.PORT ||3110
const app = express();

app.use(express.json());
app.listen(port,()=>{
    connection ()
    console.log(`Server is running on port ${port}`)
})