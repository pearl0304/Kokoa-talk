import { Router } from "express"
const userRouter = Router()

import { userController } from "../controllers/user_ctrl.js"

userRouter.get('/register',userController.getRegisterPage)




export default userRouter