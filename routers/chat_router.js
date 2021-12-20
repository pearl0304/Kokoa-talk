import { Router } from "express"
const chatRouter = Router()
import {chatController} from "../controllers/chat_ctrl.js"
import { mainController } from "../controllers/main_ctrl.js";

chatRouter.get('/list',chatController.getChatListPage)
chatRouter.get('/room/:id',mainController.getTokenData,chatController.getChatRoom)






export default chatRouter