import { Router } from "express"
const userRouter = Router()

import { userController } from "../controllers/user_ctrl.js"

userRouter.get('/signUp',userController.getsignUpPage)
userRouter.post('/signUp',userController.insertUser)

userRouter.post('/login',userController.login)



export default userRouter