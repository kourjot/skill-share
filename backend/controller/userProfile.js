import { profile } from "../model/userProfile.js";
import { user } from "../model/userModel.js";
import path from "path";
import fs from "fs";
import { v2 } from "cloudinary";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const profileUpload = async (req, res) => {
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(404).json({ message: "Token needed" });
  }

  const { skills, description } = req.body;
  let photo;

  if (req.file) {
    photo = req.file.path;
  }

  try {
    // Decode the JWT token to get user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { email: email, username } = decoded;

    // Check if the user exists in the database
    const userExist = await user.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if the profile exists
    const existProfile = await profile.findOne({ userId: userExist._id });

    let url;
    if (req.file) {
      // Upload the new photo to Cloudinary if provided
      const uploadResponse = await v2.uploader.upload(photo);
      url = uploadResponse.secure_url;
      fs.unlinkSync(photo); // Delete the file after uploading
    }

    // Prepare fields to be updated
    let updateFields = {};
    if (skills) updateFields.skills = skills;
    if (description) updateFields.description = description;
    if (url) updateFields.image = url;

    // If there are no fields to update, return an error
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No profile data to update" });
    }

    let result;
    if (existProfile) {
      // If profile exists, update it
      result = await profile.updateOne({ userId: userExist._id }, { $set: updateFields });

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: "No changes were made to the profile" });
      }
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      // If no profile exists, create a new one
      const newProfile = new profile({
        userId: userExist._id,
        username: username,
        skills: skills || [],
        description: description || '',
        image: url || "",  // Default to empty if no image
      });
      await newProfile.save();
      return res.status(201).json({ message: "Profile created successfully", userProfile: newProfile });
    }

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
