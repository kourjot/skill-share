import { profile } from "../model/userProfile.js";
import { user } from "../model/userModel.js"
import path from "path"
import fs from "fs"
import {v2} from "cloudinary"
import jwt from "jsonwebtoken"
import "dotenv/config"
  // Cloudinary configuration
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const profileUpload = async (req, res) => {
      const  token  = req.headers.authorization;
      if (!token) {
          return res.status(404).json({ message: "Token needed" });
      }
//   console.log(token)
      // Destructure values from the request body
      const { skills, description } = req.body;
    //   console.log(req.body);
    //   const photo = req.file.path;
    let photo;
    if (req.file) {
        photo = req.file.path;
    
    }
    // console.log(process.env.JWT_SECRET_KEY)
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const { email,username } = decoded;
        // console.log(email,username)
          // Check if the user exists in the database
          const userExist = await user.findOne({ email });
          if (!userExist) {
              return res.status(400).json({ message: "User does not exist" });
          }
  
          // Check if the user already has a profile
          const existProfile = await profile.findOne({ username: username });
  
          let url;
          if (req.file) {
              // Upload the new photo to Cloudinary if provided
              const uploadResponse = await v2.uploader.upload(photo);
              url = uploadResponse.secure_url;
              fs.unlinkSync(photo)
          }
  
          // Prepare the fields to be updated or added
          let updateFields = {};
          
          if (skills) {
              updateFields.skills = skills;
          }
          
          if (description) {
              updateFields.description = description;
          }
  
          if (url) {
              updateFields.image = url;
          }

        // console.log("jot")

        //   console.log(updateFields);

          if (existProfile) {
              // If profile exists, update it
            //   console.log("existProfile",existProfile)
            await profile.findByIdAndUpdate(existProfile._id, { $set: updateFields });
              return res.status(200).json({ message: "Profile updated successfully" });
          } else {
              // If no profile exists, create a new one
              const newProfile = new profile({
                  userId: userExist._id,
                  username: username,
                  skills: skills || [],
                  description: description || '',
                  image: url || '',  // Default to empty if no image
              });
              await newProfile.save();
            //   console.log(newProfile)
              return res.status(201).json({ message: "Profile created successfully"});
          }
  
      } catch (err) {
          console.error("Error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }
  };

const getProfile=async(req,res)=>{
    try{
        const  token  = req.headers.authorization;
       
        if (!token) {
            return res.status(404).json({ message: "Token needed" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email: userEmail, username: username } = decoded;
        // Check if the user exists in the database
        const findUser=await user.findOne({ email: userEmail})
        if(!findUser){
            return res.status(404).json({message:"User not found"})
        }
        const findProfile=await profile.findOne({userId:findUser._id,username})
        // console.log(findProfile)
        if(!findProfile){
            let newData= {
               userId:findUser._id ,
               username: username,
               skills:  [],
               description: '',
               image: ""
           }
        //    await newData.save()
            return res.status(404).json({message:newData})
        }
         res.status(200).json({userProfile:findProfile})
    }catch(err){
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
  
export { profileUpload,getProfile}