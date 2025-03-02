import { community } from "../model/community.js";
import jwt from "jsonwebtoken"
import { user } from "../model/userModel.js";
import "dotenv/config"
import { profile } from "../model/userProfile.js";
import { getUserProfileByName } from "./userProfile.js";
export const makeCommunity=async(req,res)=>{
    const token=req.headers.authorization
    const {name}=req.body
    // console.log(name)
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
export const joinCommunity = async (req, res) => {
    const token = req.headers.authorization;
    const { name } = req.body;
    // console.log(name);

    if (!token) {
        return res.status(404).json({ message: "token needed" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email, username } = decoded;

        if (!decoded) {
            return res.status(400).json({ message: "token not valid" });
        }

        // Use findOne instead of find to get a single community
        const communityExist = await community.findOne({ name: name });
        if (!communityExist) {
            return res.status(400).json({ message: 'no community exists' });
        }
        // console.log(communityExist);
        const userExists = await community.findOne({
            name: name,
            "members.username": username
        });
        // console.log(userExists)
        if(userExists){
            return res.status(400).json({message:"user already joined"})
        }
        

        // Ensure members is initialized as an array if it's undefined
        if (!communityExist.members) {
            communityExist.members = [];
        }

        const imageExist = await profile.findOne({ username: username });
        let image;
        if (imageExist && imageExist.image !== "") {
            image = imageExist.image;
        }

        const newMember = {
            image: image,
            username: username
        };

        // Push the new member into the members array
        communityExist.members.push(newMember);

        // Save the updated community document
        await communityExist.save();

        res.status(200).json({ message: "joined successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'error in join community' });
    }
};


export const commMessage=async(req,res)=>{
    const token=req.headers.authorization
    if(!token){
        return req.status(404).json({message:"token needed"})
    }
    const {communityId,message}=req.body
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(404).json({message:"token not valid"})
        }
        const {username,email}=decoded
        const communityExist=await community.findOne({_id:communityId})
        if(!communityExist){
            return res.status(400).json({message:"community not exist"})
        }
        const photoExist=await profile.findOne({username:username})
        let image=""
        if(photoExist&&photoExist.image!=""){
            image=photoExist.image
        }
        const newMessage={
            image,
            username,
            message
        }
        communityExist.messages.push(newMessage)
        await communityExist.save()
        res.status(200).json({message:"sent sucessfully"})
    }catch(err){
        return res.status(500).json({message:"error in community message"})
    }
}