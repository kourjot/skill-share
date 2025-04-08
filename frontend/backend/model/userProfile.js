import {Schema,model} from "mongoose"
const profileSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"user",required:true},
    image:{type:String,default:""},
    username:{type:String,unique:true,required:true},
    skills:{type:String},
    description:{type:String},
    totalFollower:{type:Number,default:0},
    totalFollows:{type:Number,default:0},
    follwers:[Number],
    follows:[Number]
})
const profile=model("profile",profileSchema)
export {profile}