import mongoose from 'mongoose';
import {userSchema} from './Schema.js'
var Friends= mongoose.model('User',userSchema)

export async function findAllUsers(data){
    try{
        const email = data['userEmail']
        const friends = await Friends.find({userEmail: {$ne:email}}).sort({userNick:1}).limit(20)
        return friends

    }catch(e){
        console.error(e)
    }
}

export async function countAllUsers(data){
    try{
        const email = data['userEmail']
        const count = await Friends.find({userEmail: {$ne:email}}).count()
        return count
    }catch(e){
        console.error(e)
    }
}