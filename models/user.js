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
        const userData = await User.findOne({_id:_id}).exec()
        return userData
    }catch(e){
        console.error(e)
    }
}

export async function updateUserProfileImg(_id,profileImg){
    try{
        await User.updateOne({_id:_id},{$set:{profileImg:profileImg}}).exec()

    }catch(e){
        console.error(e)
    }
}

export async function updateUserNick(_id,userNick){
    try{
        await User.updateOne({_id:_id},{$set:{userNick:userNick}}).exec()
    }catch(e){
        console.error(e)
    }
}

export async function updateUserStatusMessage(_id,statusMessage){
    try{
        await User.updateOne({_id:_id},{$set:{statusMessage:statusMessage}}).exec()
    }catch(e){
        console.error(e)
    }
}

export async function updateAllUserProfileInfo(_id,editProfileImg,editUserNick,editStatusMessage){
    try{
        await User.updateOne({_id:_id},{$set:{profileImg:editProfileImg,userNick:editUserNick,statusMessage:editStatusMessage,}}).exec()
    }catch(e){
        console.error(e)
    }
}