import { OTP} from "../model/otpModel.js"
import {user } from "../model/userModel.js"
import argon2 from "argon2"
 const resetpassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body
    // console.log(email,otp,newPassword)
    const hash=await argon2.hash(newPassword)
    // console.log(hash)
    try{
        const emailExist = await OTP.findOne({email:email})
    if(!emailExist){ 
        return res.status(404).send("user not exist")
    }
    if(emailExist.otp==otp){
       await user.updateOne({email},{$set:{password:hash}})
       await OTP.deleteOne({email})
       res.status(200).json({hash,
        message:"password reset successfully"
       })
    }
   
    }catch(err){
        console.log("error in reset Password",err);
        res.status(500).send("error in reset Password",err)
    }

}
export {resetpassword}