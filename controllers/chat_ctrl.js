import { ObjectId } from 'mongodb'
import {findUserDataById} from '../models/user.js'
import {checkDuplicateChannel,createChannle,findMyChannelList} from '../models/chat.js'

export const chatController = {
    getChatListPage : async(req,res)=>{
        try{
            const tokenData = (req.body.userData['_id'])
            const userId = ObjectId(tokenData)
            const tmp = []
            const friendsData = []

            const mychannelList = await findMyChannelList(userId)
            mychannelList.forEach((element)=>{
                for(let i=0; i<mychannelList.length;i++){
                    const arr = element['channelUsers'][i]
                    tmp.push(arr)           
                } 
            })
            const friendsId = tmp.filter(id => String(id) !== String(userId))

            for(let j=0; j<friendsId.length;j++){
                const result = await findUserDataById(friendsId[j])
                friendsData.push(result)
            }
            res.render('chat-list',{friendsData:friendsData})
        }catch(e){
            console.error(e)
        }
    },
    getChatRoom : async(req,res)=>{
        try{
            // friend data
            const params = req.params['id']
            const id =  params.slice(1,params.length)
            const friendId = ObjectId(id)
            const friend = await findUserDataById(friendId)


            // user data           
            const tokenData = (req.body.userData['_id'])
            const userId = ObjectId(tokenData)
            const user = await findUserDataById(userId)


            // Create Channel
            const createChannelData = {
                channelUsers : [friendId,userId],
                channelType : 'personal'
            }
 

            const existedChannel = await checkDuplicateChannel(createChannelData)
            if(existedChannel == 'existed_channel'){
                res.render('chat-room')
            }else{
                await createChannle(createChannelData)
                res.render('chat-room')
            }

        }catch(e){
            console.error(e)
        }
    }
}
