import { Router } from "express"
const userRouter = Router()

import { userController } from "../controllers/user_ctrl.js"

userRouter.get('/register',userController.getRegisterPage)
userRouter.post('/register',userController.insertUser)




export default userRouter