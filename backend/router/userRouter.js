import {Router} from "express"
import passport from "passport";
import { githubAuth, githubCallback } from "../controller/githubAuthController.js";
import {login,registration} from "../controller/userController.js"

import {sendRegisterOtp} from "../controller/nodemailerController.js"

import { profileMulter } from "../middleware/multer.js"
import { uploadImage ,getAillImage} from "../controller/postImage.js"
import { profileUpload,getProfile} from "../controller/userProfile.js"
import  {tokenVerify} from "../middleware/tokenMiddleware.js"
import  {forgotPassword} from "../controller/forgotPasswordController.js" 
import {resetpassword} from "../controller/resetPasswordController.js"
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
userRouter.post("/uploadPost",profileMulter.single("post"),uploadImage)
userRouter.get("/getMyPosts",tokenVerify,getAillImage)
export {userRouter}