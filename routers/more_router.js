import { Router } from "express"
const moreRouter = Router()
import {moreController} from "../controllers/more_ctrl.js"

moreRouter.get('/',moreController.getMorePage)
export default moreRouter