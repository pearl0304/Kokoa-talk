import { ObjectId } from "mongodb"
import {findUserDataById} from "../models/user.js"

export const moreController = {
    getMorePage : async(req,res)=>{
        try{
            // NOTE : "Get user data from token"
            const tokenData = req.body.userData['_id']
            const _id = ObjectId(tokenData)
            const userData = await findUserDataById(_id)

            res.render('more',{
                profileImg : userData['profileImg'],
                userNick : userData['userNick'],
                userEmail: userData['userEmail']
            })
        }catch(e){
            console.error(e)
        }
    }
}