import {findUserDataByEmail} from "../models/user.js"
import {findAllUsers,countAllUsers} from "../models/friends.js"

export const friendsController = {
    getfriendsPage : async(req,res)=>{
        try{
            const data = req.body.userData
            const userData = await findUserDataByEmail(data)
            const friends = await findAllUsers(data)
            const friendsCount = await countAllUsers(data)
                        
            res.render('friends',{
                userNick :userData['userNick'],
                profileImg:userData['profileImg'],
                statusMessage:userData['statusMessage'],
                _id : userData['_id'],
                friendsCount:friendsCount,
                friends
            })

        }catch(e){
            console.error(e)

        }
    }
}