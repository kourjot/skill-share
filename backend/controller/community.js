import { community } from "../model/community.js";
import jwt from "jsonwebtoken"
import { user } from "../model/userModel.js";
import "dotenv/config"
export const makeCommunity=async(req,res)=>{
    const token=req.headers.authorization
    const {name}=req.body
    console.log(name)
    if(!token){
        return res.status(404).json({message:"not needed"})
    }
    try{
        // console.log(token)
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log(decoded)
        console.log(process.env.JWT_SECRET_KEY)
        if(!decoded){
            console.log("18")
            return res.status(400).json({message:"token not valid"})
        }
        const {username,email}=decoded
        const userExist=await user.findOne({username:username})
        if(!userExist){
            console.log("22")
            return res.status(400).json({message:"user not exist"})
        }
        
        // const username=decoded.username
        console.log(username)
        const newCommunity=new community({
            userId:userExist._id,
            username,
            name:name,
            members:[],
            messages:[]
        })
        await newCommunity.save()
        res.status(200).json({message:"communnity made sucessfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"error in make community"})
    }
}


export const showAllCommunity=async(req,res)=>{
    try{
        const allCommunity = await community.find({}, { name: 1, _id: 0 })
        res.status(200).json({data:allCommunity})
    }catch(err){
        res.status(500).json({messgae:"error in get all community"})
    }
}