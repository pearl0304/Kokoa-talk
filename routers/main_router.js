import { Router } from "express";
const router = Router();
import user from "./user_router.js"
import friends from "./friends_router.js"
import chat from "./chat_router.js"
import find from "./find_router.js"
import more from "./more_router.js"
import setting from "./setting_router.js"
import { mainController } from "../controllers/main_ctrl.js";

router.get('/',mainController.getIndexPage)
router.use('/user',user)
router.use('/friends',mainController.getTokenData,friends)
router.use('/chat',chat)
router.use('/find',find)
router.use('/more',more)
router.use('/setting',setting)



export default router