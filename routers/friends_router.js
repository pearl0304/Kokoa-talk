import { Router } from "express"
const friendsRouter = Router()
import {friendsController} from '../controllers/friends_ctrl.js'

friendsRouter.get('/',friendsController.getfriendsPage)



export default friendsRouter