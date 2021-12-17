import { Router } from "express";
const router = Router();
import user from "./user_router.js"
import friends from "./friends_router.js"

import { mainController } from "../controllers/main_ctrl.js";

router.get('/',mainController.getIndexPage)
router.use('/user',user)
router.use('/friends',mainController.getTokenData,friends)



export default router