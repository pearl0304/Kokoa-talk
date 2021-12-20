import { Router } from "express"
const userRouter = Router()
import multer from "multer"

const upload = multer({dest:'uploads/profile'})
import { userController } from "../controllers/user_ctrl.js"
import { mainController } from "../controllers/main_ctrl.js";

userRouter.get('/signUp',userController.getsignUpPage)
userRouter.post('/signUp',upload.single('profile-img'),userController.insertUser)
userRouter.post('/login',userController.login)
userRouter.get('/profile/:id',userController.getUserProfliePage)
userRouter.get('/myProfile/:id',mainController.getTokenData,userController.getMyProfliePage)
userRouter.post('/myProfile',mainController.getTokenData,userController.updateMyProflie)
export default userRouter