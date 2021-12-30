import { Router } from "express"
const moreRouter = Router()
import {moreController} from "../controllers/more_ctrl.js"
import { mainController } from "../controllers/main_ctrl.js";

moreRouter.get('/',mainController.getTokenData,moreController.getMorePage)





export default moreRouter