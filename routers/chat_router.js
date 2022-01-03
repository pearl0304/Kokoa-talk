import { Router } from "express"
const chatRouter = Router()
import {chatController} from "../controllers/chat_ctrl.js"
import { mainController } from "../controllers/main_ctrl.js";

chatRouter.get('/list',mainController.getTokenData,chatController.getChatListPage)
chatRouter.get('/room/:id',mainController.getTokenData,chatController.getChatRoom)
chatRouter.post('/room/users',mainController.getTokenData, chatController.ajaxPostUsersData)
chatRouter.post('/room/friend',mainController.getTokenData, chatController.ajaxPostFriendData)
chatRouter.post('/room/page/:height',mainController.getTokenData,chatController.ajaxPostMessagePagination)




export default chatRouter