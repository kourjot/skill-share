import  { user} from "../model/userModel.js";
import {Photo} from "../model/photoModel.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

const commentPost=async(req,res)=>{
    const  token  = req.headers.authorization;
   
      if (!token) {
          return res.status(404).json({ message: "Token needed" });
      }
    const { postId} = req.params;
   
    const { text } = req.body;
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
         
        const {username } = decoded;
        // console.log(username)
        const userExist = await user.findOne({username});
        if (!userExist) {
            return res.redirect("https://skill-sharev8.netlify.app/");
        }
        
        const ImageExist=await Photo.findById(postId)
        // console.log(ImageExist)
        if(!ImageExist){
            return res.status(404).json({message:"image not found"})
        }
        let comment ={
            username,
            text
        }
        // console.log("Comment before saving:", comment);
       
        ImageExist.comments.push(comment)
        // console.log("Updated comments array:", ImageExist.comments);y
        await ImageExist.save()
        res.status(201).json({message:"comment added successfully"})

    }catch(err){
        console.log("Error in comment",err);
        return res.status(500).json({message:"server error"})
    }
}

export {commentPost}