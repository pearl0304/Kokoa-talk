import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import {channelSchema, messageSchema} from './Schema.js'
var Channel = mongoose.model('Channel',channelSchema)
var Message = mongoose.model('Message',messageSchema)


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

export async function findPersonalChannel(createChannelData){
    try{
        const channelInfo = await Channel.findOne({$and:[{"channelUsers":createChannelData['channelUsers'][0]},{"channelUsers":createChannelData['channelUsers'][1]},{"channelType":"personal"}]}).exec()
        return channelInfo

    }catch(e){
        console.error(e)
    }
}

export async function insertMessages(data){
    try{
        const message = new Message(data)
        await message.save()

    }catch(e){
        console.error(e)
    }
}

export async function findMessagesByChId(id){
    try{
        const messageData = await Message.find({"channelId":id}).limit(20).sort({"_id" : -1})
        return messageData

    }catch(e){
        console.error(e)}
}

