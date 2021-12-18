import { Router } from "express"
const findRouter = Router()
import {findController} from '../controllers/find_ctrl.js'

findRouter.get('/',findController.getFindPage)

export default findRouter