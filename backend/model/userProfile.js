import {Schema,model} from "mongoose"
const profileSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"user",required:true},
    image:{type:String,default:""},
    username:{type:String,unique:true,required:true},
    skills:[String],
    description:{type:String},
    totalFollower:{Type:Number,default:0},
    totalFollows:{Type:Number,default:0},
    follwers:[Number],
    follows:[Number]
})
const profile=model("profile",profileSchema)
export {profile}