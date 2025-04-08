import { OTP } from "../model/otpModel.js";
import { user} from "../model/userModel.js";
import "dotenv/config"
import nodemailer from "nodemailer"
import crypto from "node:crypto"
const gmail=process.env.GMAIL_NODEMAILER
const pass=process.env.GMAIL_NODEMAILER_PASS
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:gmail,
        pass:pass
    }
})
const forgotPassword=async(req,res)=>{
    const {email}=req.body
  
    try{
        const emailExists=await user.findOne({email})
        
        if(!emailExists){
            return res.status(404).send("user not found")
        }
        const otpExists=await OTP.find({email})
       
        if(otpExists){
            await OTP.deleteOne({email})
        }
            const ot=crypto.randomInt(100000,1000000)
        const newOtp=new OTP({
            email:email,
            otp:ot
        })
        await newOtp.save()
        const mailOptions=({
            to:email,
            subject:`Reset Password OTP FITNESS BUDDY`,
            text:ot.toString(), 
            html:`<h1>Reset Password <h1> ${ot}`
        })
       transporter.sendMail(mailOptions)
    //    console.log(newOtp)
       res.json({newOtp})
    } catch(err){
        console.log("err from server",err);
        res.status(500).send("error in forgot password")
    }


}
export {forgotPassword}