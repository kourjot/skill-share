import { Schema,model } from "mongoose";

const otpSchema=new Schema({
    email:{type:String,required:true},
    otp:{type:Number, required:true}
})

const OTP=model("otp",otpSchema)
export {OTP}  