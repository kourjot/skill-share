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
const getAllComments = async (req, res) => {
    try {
        const { postId } = req.params; // Get post ID from request params

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        // Find the post by ID
        const ImageExist = await Photo.findById(postId);

        if (!ImageExist) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Fetch user profiles for each comment
        const commentsWithProfiles = await Promise.all(
            ImageExist.comments.map(async (comment) => {
                const userInfo = await user.findOne({ username: comment.username });

                return {
                    username: comment.username,
                    text: comment.text,
                    userProfile: userInfo ? userInfo.userProfile : "" // If no profile image, return empty
                };
            })
        );

        // Send response with comments & profile images
        res.status(200).json({ 
            postId: ImageExist._id, 
            photo: ImageExist.photo, 
            comments: commentsWithProfiles 
        });

    } catch (err) {
        console.log("Error in getting comments", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export {commentPost,getAllComments}