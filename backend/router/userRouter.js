import {Router} from "express"

import {login,registration,allphoto} from "../controller/userController.js"

import {sendRegisterOtp} from "../controller/nodemailerController.js"

import { profileMulter } from "../middleware/multer.js"
import { makeCommunity ,showAllCommunity,joinCommunity,commMessage,getMessage} from "../controller/community.js";
import { uploadImage ,getAillImage} from "../controller/postImage.js"
import { profileUpload,getProfile,getUserProfileByName} from "../controller/userProfile.js"
import  {tokenVerify} from "../middleware/tokenMiddleware.js"
import  {forgotPassword} from "../controller/forgotPasswordController.js" 
import {resetpassword} from "../controller/resetPasswordController.js"
import {commentPost,getAllComments} from "../controller/commentController.js"
import {likePhoto} from "../controller/likeController.js"
const userRouter = Router()

userRouter.get("/",async(req,res)=>{
    try{
        return res.status(200).json({message:"server runs fine in every 15 minutes"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})
userRouter.post("/otp-register",sendRegisterOtp)
userRouter.post("/sign-in",registration)
userRouter.post("/log-in",login)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/resetPassword",resetpassword)

userRouter.post("/profile",profileMulter.single("image"),profileUpload)
userRouter.get("/getprofile",tokenVerify,getProfile)
userRouter.get("/getUserProfileByName/:username",getUserProfileByName)
userRouter.post("/uploadPost",profileMulter.single("post"),uploadImage)
userRouter.get("/getMyPosts",tokenVerify,getAillImage)

userRouter.post("/commentPost/:postId",tokenVerify,commentPost)
userRouter.get("/allPhoto",allphoto)
userRouter.get("/getAllComments/:postId",getAllComments)
userRouter.post("/likePhoto/:postId",tokenVerify,likePhoto)
userRouter.post("/makeCommunity",makeCommunity)
userRouter.get("/getCommunity",showAllCommunity)
userRouter.post("/joinCommunity",joinCommunity)
userRouter.post("/postMessage",commMessage)
userRouter.get("/getMessage/:name",getMessage)
export {userRouter}