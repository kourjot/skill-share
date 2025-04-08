import {connect} from "mongoose"
import "dotenv/config"
const connection =async()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")
    }catch(err){
        console.error("Failed to connect to MongoDB", err)
    }
};

export { connection };
