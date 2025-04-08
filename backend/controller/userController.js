import { user } from "../model/userModel.js";
import { registerOtp } from "../model/registerOtpModel.js";
import { Photo } from "../model/photoModel.js";
import jwt from "jsonwebtoken"

import argon2 from "argon2"
import "dotenv/config"
const registration=async(req,res)=>{
    const{username,email,password,otp}=req.body
    if(!username || !email  || !password || !otp){
        return res.status(404).json({msg:"all fields are required"})
    }
    try{
        const userExist=await user.findOne({email})
        if(userExist){
            return res.status(400).json({msg:"user already exist"})
        }
        const hash=await argon2.hash(password)
        const otpTrue=await registerOtp.findOne({email})
        if(otp==otpTrue.otp){
            await registerOtp.deleteOne({email})
        }
        else{
            return res.status(404).json({msg:"wrong Otp"})
        }
        const newUser=new user({
            username,
            email,
            password:hash
        })
      
        const data=await newUser.save()
       
        
        res.status(201).json({msg:"registration sucessfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"server error in registration"})
    }
}

 const login=async(req,res)=>{
    console.log("login")
    const{email,password}=req.body
    // console.log(email);
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }
 
    try{
     
        const dbExist=await user.findOne({email})
        if(!dbExist){
            return res.status(404).json({msg:"User not exist"})
        }
        const hashed=await argon2.verify(dbExist.password,password)
        if(hashed){
        const token=jwt.sign({ id: dbExist._id,username: dbExist.username, email: dbExist.email},process.env.JWT_SECRET_KEY,{expiresIn:"2day"})
        // console.log(token)
        return res.status(200).json({token:token})
        }
        return res.status(401).json({msg:"Invalid credentials"})

    }catch(err){
        console.log(err);
        res.status(500).json({msg:"server error in login"})
    }
}


export const allphoto=async(req,res)=>{
    try{
        const data=await Photo.find()
        res.status(200).json({data:data})
    }catch(err){
        res.status(500).json({message:"error in get all photo"})
    }
}

export {login,registration}

