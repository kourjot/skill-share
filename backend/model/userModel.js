import { Schema,model } from "mongoose";
const register=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
})
const user=model("user",register)
export {user}