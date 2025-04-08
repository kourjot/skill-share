import { Schema,model } from "mongoose";
const registerotp=new Schema({
    email:{type:String},
    otp:{type:Number}
})
const registerOtp=model("otpRegister",registerotp)
export {registerOtp}