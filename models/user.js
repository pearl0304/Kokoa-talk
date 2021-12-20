import mongoose from 'mongoose';
import {userSchema} from './Schema.js'
var User = mongoose.model('User',userSchema)

export async function checkDuplicateEmail(data){
    try{       
        const email = await User.findOne({userEmail : data['userEmail']}).exec()
        if(email){
            return "DUPLICATE"            
        }else{
            return "NONE"
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

export async function findeUserData(data){
    try{
        const userData = await  User.findOne({userEmail:data['userEmail'], userPw:data['userPw']}).exec()
        return userData

    }catch(e){
        console.error(e)
    }
}

export async function findUserDataByEmail(data){
    try{
        const userData = await  User.findOne({userEmail:data['userEmail']}).exec()
        return userData

    }catch(e){
        console.error(e)
    }
}

export async function findUserDataById(_id){
    try{
        const userData = await  User.findOne({_id:_id}).exec()
        return userData
    }catch(e){
        console.error(e)
    }
}