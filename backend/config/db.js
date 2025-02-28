import {connect} from "mongoose"
import "dotenv/config"
const connection =async()=>{
    try{
        await connect("mongodb+srv://pkour6188:WJGKzN2xyxM4RYjN@skill-share.oflnc.mongodb.net/?retryWrites=true&w=majority&appName=skill-share")
        console.log("Connected to MongoDB")
    }catch(err){
        console.error("Failed to connect to MongoDB", err)
    }
};

export { connection };
