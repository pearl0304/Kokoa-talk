import {findUserDataByEmail} from "../models/user.js"
export const friendsController = {
    getfriendsPage : async(req,res)=>{
        try{
            const data = req.body.userData
            const userData = await findUserDataByEmail(data)
            res.render('friends',{userNick :userData['userNick'],profileImg:userData['profileImg']})

        }catch(e){
            console.error(e)

        }
    }
}