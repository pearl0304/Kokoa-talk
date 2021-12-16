import express from "express"
import MongoClient from './models/config.js'
import helmet from "helmet"
import cookeParser from "cookie-parser"
import router from "./routers/main_router.js"

class App {
    constructor(){
        this.app = express()
        this.db = MongoClient.connect()

        this.setViewEngine()
        this.setMiddleware()
        this.setStatic()
        this.getRouters()
    }
    getDbConfig(){this.db}
    setViewEngine(){
        this.app.set('views','src/public/views')
        this.app.set('view engine', 'ejs')
    }
    setMiddleware(){
        this.app.use(helmet({
            contentSecurityPolicy: false,
        }))
    
        this.app.use(cookeParser())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
    }

    setStatic(){
        this.app.use('/public',express.static('src/public/'))
        this.app.use('/js',express.static('src/public/js'))
        this.app.use('/uploads',express.static('uploads'))
    }

    getRouters(){
        this.app.use(router)
    }

}

export default App