import { ObjectId } from 'mongodb'
import {findUserDataById} from '../models/user.js'
export const chatController = {
    getChatListPage : async(req,res)=>{
        try{
            res.render('chat-list')
        }catch(e){
            console.error(e)
        }
    },
    getChatRoom : async(req,res)=>{
        try{
            // friend data
            const params = req.params['id']
            const id =  params.slice(1,params.length)
            const friend_id = ObjectId(id)
            const friend = await findUserDataById(friend_id)


            // user data           
            const tokenData = (req.body.userData['_id'])
            const user_id = ObjectId(tokenData)
            const user = await findUserDataById(user_id)

            res.render('chat-room')

        }catch(e){
            console.error(e)
        }
    }
}
