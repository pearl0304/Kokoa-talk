import { Router } from "express"
const userRouter = Router()
import multer from "multer"

const upload = multer({dest:'uploads/profile'})
import { userController } from "../controllers/user_ctrl.js"

userRouter.get('/signUp',userController.getsignUpPage)
userRouter.post('/signUp',upload.single('profile-img'),userController.insertUser)

userRouter.post('/login',userController.login)



export default userRouter