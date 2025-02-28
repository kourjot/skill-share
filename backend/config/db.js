import {connect} from "mongoose"
import "dotenv/config"
const connection =async()=>{
    try{
        await connect("mongodb://localhost:27017/SkilShare")
        console.log("Connected to MongoDB")
    }catch(err){
        console.error("Failed to connect to MongoDB", err)
    }
}
export {connection}