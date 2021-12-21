import mongoose from 'mongoose';
import {channelSchema} from './Schema.js'
var Channel = mongoose.model('Channel',channelSchema)


export async function checkDuplicateChannel(createChannelData){
    try{
        const existedChannel = await Channel.findOne({$and:[{"channelUsers":createChannelData['channelUsers'][0]},{"channelUsers":createChannelData['channelUsers'][1]},{"channelType":"personal"}]}).exec()
        if(existedChannel){
            return 'existed_channel'
        }else{
            return 'can_make_channel'   
        }
        
    }catch(e){
        console.error(e)
    }
}

export async function createChannle(createChannelData){
    try{
        const channel = new Channel(createChannelData)
        await channel.save()

    }catch(e){
        console.error(e)
    }
}

export async function findMyChannelList(id){
    try{
        const userId = id
        const myChannelList = await Channel.find({"channelUsers":id})
        return myChannelList
    }catch(e){
        console.error(e)
    }
}
