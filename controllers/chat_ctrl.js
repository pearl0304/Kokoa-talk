import moment from 'moment'
import { ObjectId } from 'mongodb'
import {findUserDataById} from '../models/user.js'
import {checkDuplicateChannel,
        createChannle,
        findMyChannelList,
        findPersonalChannel,
        findMessagesByChId} from '../models/chat.js'

export const chatController = {
    getChatListPage : async(req,res)=>{
        try{
            const tokenData = (req.body.userData['_id'])
            const userId = ObjectId(tokenData)
            const tmp = []
            const friendsData = []

            const mychannelList = await findMyChannelList(userId)
     
            mychannelList.forEach((element)=>{
      
                for(let i=0; i<2;i++){
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
            const params = req.params['id']
            const id =  params.slice(1,params.length)
            const friendId = ObjectId(id)
     
            const tokenData = (req.body.userData['_id'])
            const userId = ObjectId(tokenData)

            const createChannelData = {
                channelUsers : [friendId,userId],
                channelType : 'personal'
            }

            const existedChannel = await checkDuplicateChannel(createChannelData)

            if(existedChannel == 'can_make_channel'){
                await createChannle(createChannelData)
            }

            const channelInfo = await findPersonalChannel(createChannelData)
                       
            const ChannelData = {
                channelId : channelInfo['_id'],
                channelType : channelInfo['channelType'],
                friendId : friendId,
                userId : userId,            
            }

            res.render('chat-room',ChannelData)

        }catch(e){
            console.error(e)
        }
    },

    ajaxPostUsersData : async (req,res)=>{
        try{
        const channelId = ObjectId(req.body.channelId)  
        const friendId = ObjectId(req.body.friendId)

        const friendData = await findUserDataById(friendId)

        const messages = await findMessagesByChId(channelId)


        res.send({messages :messages, friendNick : friendData['userNick'],friendProfileImg :friendData['profileImg']})
    
        }catch(e){
            console.error(e)    
        }
       
    },
    ajaxPostFriendData : async(req,res) =>{
        try{
            const friendId = ObjectId(req.body.friendId)

            const friendData = await findUserDataById(friendId)
            res.send({friendNick : friendData['userNick'],friendProfileImg :friendData['profileImg']})

        }catch(e){
            console.error(e)
        }
    }
}
