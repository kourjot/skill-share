import {Router} from "express"
import {login,registration} from "../controller/userController.js"

import {sendRegisterOtp} from "../controller/nodemailerController.js"

import { profileMulter } from "../middleware/multer.js"

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
userRouter.post("/profile",profileMulter.single("image"),profileUpload)
userRouter.get("/getprofile",tokenVerify,getProfile)

export {userRouter}