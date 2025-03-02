import mongoose, { mongo } from "mongoose"
const communitySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    name:{type:String,unique:true,required:true},
    username:{type:String,required:true},
    members:[{image:String,username:String}],
    messages:[{image:String,username:String,messages:String}]
})

const community=mongoose.model("community",communitySchema)
export {community}