import { profile } from "../model/userProfile.js";
import { user } from "../model/userModel.js";
import {v2} from "cloudinary"
import jwt from "jsonwebtoken"
import "dotenv/config"
  // Cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  export const profileUpload = async (req, res) => {
      const { token } = req.headers.authorization;
      if (!token) {
          return res.status(404).json({ message: "Token needed" });
      }
  
      // Destructure values from the request body
      const { skills, description } = req.body;
      const photo = req.file.path;
  
      try {
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          const { email: userEmail, username: userName } = decoded;
  
          // Check if the user exists in the database
          const userExist = await user.findOne({ email: userEmail });
          if (!userExist) {
              return res.status(400).json({ message: "User does not exist" });
          }
  
          // Check if the user already has a profile
          const existProfile = await profile.findOne({ username: username });
  
          let url;
          if (photo) {
              // Upload the new photo to Cloudinary if provided
              const uploadResponse = await v2.uploader.upload(photo);
              url = uploadResponse.secure_url;
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
  
          if (existProfile) {
              // If profile exists, update it
              await profile.updateOne({ _id: userExist._id }, { $set: updateFields });
              return res.status(200).json({ message: "Profile updated successfully" });
          } else {
              // If no profile exists, create a new one
              const newProfile = new profile({
                  userId: userExist._id,
                  username: userName,
                  skills: skills || [],
                  description: description || '',
                  image: url || '',  // Default to empty if no image
              });
              await newProfile.save();
              return res.status(201).json({ message: "Profile created successfully" });
          }
  
      } catch (err) {
          console.error("Error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }
  };
  