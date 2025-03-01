import {Router} from "express"
import passport from "passport";
import { githubAuth, githubCallback } from "../controller/githubAuthController.js";
import {login,registration,allphoto} from "../controller/userController.js"

import {sendRegisterOtp} from "../controller/nodemailerController.js"

import { profileMulter } from "../middleware/multer.js"
import { uploadImage ,getAillImage} from "../controller/postImage.js"
import { profileUpload,getProfile,getUserProfileByName} from "../controller/userProfile.js"
import  {tokenVerify} from "../middleware/tokenMiddleware.js"
import  {forgotPassword} from "../controller/forgotPasswordController.js" 
import {resetpassword} from "../controller/resetPasswordController.js"
import {commentPost} from "../controller/commentController.js"
const userRouter = Router()

userRouter.post("/otp-register",sendRegisterOtp)
userRouter.post("/sign-in",registration)
userRouter.post("/log-in",login)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/resetPassword",resetpassword)
userRouter.get("/auth/github", githubAuth);
userRouter.get("/auth/github/callback", githubCallback);
userRouter.post("/profile",profileMulter.single("image"),profileUpload)
userRouter.get("/getprofile",tokenVerify,getProfile)
userRouter.get("/getUserProfileByName/:username",getUserProfileByName)
userRouter.post("/uploadPost",profileMulter.single("post"),uploadImage)
userRouter.get("/getMyPosts",tokenVerify,getAillImage)

userRouter.post("/commentPost/:postId",tokenVerify,commentPost)
export {userRouter}