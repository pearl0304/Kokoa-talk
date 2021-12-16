import express from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import cookeParser from "cookie-parser"
import router from "./routers/main_router.js"
import dotenv from "dotenv"
dotenv.config()
const {MONGO_KOKOA_URI} = process.env

class App {
    constructor(){
        this.app = express()
        this.getDbConn()
        this.setViewEngine()
        this.setMiddleware()
        this.setStatic()
        this.getRouters()
    }
    getDbConn(){
        mongoose
        .connect(MONGO_KOKOA_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));
    }
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