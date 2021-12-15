import { Router } from "express";
const router = Router();
import user from "./user_router.js"

import { mainController } from "../controllers/main_ctrl.js";

router.get('/',mainController.getIndexPage)
router.use('/user',user)



export default router