import  { user} from "../model/userModel.js";
import {Photo} from "../model/photoModel.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
const likePhoto =async(req,res)=>{
    try{
        const {postId}=req.params
        const  token  = req.headers.authorization;
   
        if (!token) {
            return res.status(404).json({ message: "Token  is needed" });
        }
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId=decoded.id
        // console.log(userId);
        const username=decoded.username
        // console.log(username);
        const photoExist=await Photo.findById(postId)
        if(!photoExist){
            return res.status(400).json({message:"photo not exist"})
        }
        const isLiked=photoExist.likeBy.includes(userId)
        if(isLiked){
            photoExist.likeBy=photoExist.likeBy.filter(Id=>Id && Id!==userId)
            photoExist.likes=Math.max(0,photoExist.likes-1)
        }else{
            photoExist.likeBy.push(userId)
            photoExist.likes+=1
        }
        await photoExist.save()
        const likedUsers = await user.find({ _id: { $in: photoExist.likeBy.filter(id=>id)} })
        .select("username userProfile")
        res.status(200).json({
            message:isLiked?"Photo unliked":"Photo liked", 
        })
  
    }catch(err){
        console.log("Error in liking photo",err)
        res.status(500).json({
                msg:"Server error"
        })
    }
}
export {likePhoto}