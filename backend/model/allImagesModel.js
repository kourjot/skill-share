import { Schema,model } from "mongoose";

const AllImages=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"user"},
    username:{type:String},
    email:{type:String},
    images:[String]
})

const Images=model("Images",AllImages)
export { Images}