import { Router } from "express"
const settingRouter = Router()
import { settingController } from "../controllers/setting_ctrl.js"

settingRouter.get('/',settingController.getsettingPage)

export default settingRouter