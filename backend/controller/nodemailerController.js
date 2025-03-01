import crypto from "node:crypto"
import { registerOtp } from "../model/registerOtpModel.js";
import nodemailer from "nodemailer"
import "dotenv/config"

const transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:process.env.GMAIL_NODEMAILER,
        pass:process.env.GMAIL_NODEMAILER_PASS
    }
})

 const sendRegisterOtp=async(req,res)=>{
    const {email}=req.body
    try{
        const otpExist=await registerOtp.findOne({email})
        if(otpExist){
            await registerOtp.deleteOne({email})
        }
        const otp=crypto.randomInt(10000,100000)
       
        const mailOptions={
            to:email,
            subject:"OTP for Sign-In",
            text:otp.toString()
        }
        console.log(otp)
        await transport.sendMail(mailOptions)
        const newotp=new registerOtp({
            email,
            otp:otp.toString()
        })
        await newotp.save()
        res.status(200).json({msg:"otp send sucessfull"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"server error in register otp"})
    }
}
export {sendRegisterOtp}