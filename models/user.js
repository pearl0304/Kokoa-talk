import mongoose from 'mongoose';
import {userSchema} from './Schema.js'
var User = mongoose.model('User',userSchema)

export async function checkDuplicateEmail(data){
    try{       
        const email = await User.findOne({userEmail : data['userEmail']}).exec()
        if(email){
            return "DUPLICATE"            
        }
    }catch(e){
        console.error(e)
    }
}

export async function checkDuplicateNick(data){
    try{
        const nick = await User.findOne({userNick : data['userNick']}).exec()
        if(nick){
            return "DUPLICATE"
        }

    }catch(e){
        console.error(e)
    }
}

export async function insertUserData(data){
    try{
        const user = new User(data)
        await user.save()  
    }catch(e){
        console.error(e)
    }
}