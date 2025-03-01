import { Schema,model } from "mongoose";
const photoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    userProfile:{
      type:String,
      default:""
    },
    username:{
      type:String,
      required:true
    },
    email:{
       type:String
    },
    description: {
      type: String,
      default: "",
    },
    photo: {
      type: String, 
    },
    likeBy: [
      {
        type: String, 
      },
    ],
    comments: [
      {
        username:String,
        text:String,
      },
    ],
    likes: {
      type: Number,
      default: 0, 
    },
  },
);

const Photo = model("Photo", photoSchema);
export {Photo}
