import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const mainController = {
    getIndexPage : async (req,res)=>{
        res.render('index')
    },

    getTokenData : async (req,res,next)=>{
        try{
            const token = req.cookies['jwtToken']
            if(!token){
                res.send("<script>There no user information. Please Login frist');location.href='/';</script>")
            }
            else{
                const secretKey = process.env.SECRET_CODE
                const tokenData = jwt.verify(token,secretKey)
                const expire =  parseInt(tokenData['exp']+'000') 
                const now = Date.now()
    
                if(expire < now){
                    res.send("<script>alert('Your login session has expired. Pleas login in again');location.href='/';</script>")
                }else{
                    req.body.userData = tokenData
                    next()
                }
            }
        }catch(e){
            console.error(e)
        }
    }
}