import { Router } from "express"
const chatRouter = Router()
import {chatController} from "../controllers/chat_ctrl.js"


chatRouter.get('/list',chatController.getChatListPage)
export default chatRouter