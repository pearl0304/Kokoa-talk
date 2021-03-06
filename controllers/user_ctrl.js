import { ObjectId } from 'mongodb'
import {checkDuplicateEmail,
        insertUserData,
        findeUserData,findUserDataById,findUserDataByEmail,
        updateUserProfileImg,updateUserNick,updateUserStatusMessage,updateAllUserProfileInfo
    } from '../models/user.js'
    
import jwt from 'jsonwebtoken'

export const userController = {

    getsignUpPage : async(req,res)=>{
        try{
            res.render('signUp')  
        }catch(e){
            console.error(e)
        }
    },
    insertUser : async(req,res)=>{
        try{
            let filename = '/public/images/profile.svg'
            if(req.file){
                filename = `/uploads/profile/${req.file.filename}` 
            }

            if(req.body.userEmail == null || req.body.userNick == null || req.body.userPw == null) {
                res.send("<script>alert('There no user information. Please write sign up data');location.href='/user/signUp';</script>")
            }

            const data = {
                userEmail : (req.body.userEmail).toLowerCase(),
                userNick : (req.body.userNick).toLowerCase(),
                userPw : req.body.userPw,
                profileImg : filename ,
                statusMessage : ''
            }

            // NOTE : "check duplicate Email and Nick"
            const emailCheck = await checkDuplicateEmail(data)
            if(emailCheck == 'DUPLICATE'){
                res.send("<script>alert('This EMAIL is already in use');history.back();</script>")
            }

            await insertUserData(data)
           const userData = await findUserDataByEmail(data)
     
            // NODE : "create token"
            const created_token = jwt.sign(
                {
                    userEmail:userData['userEmail'],
                    _id : userData['_id']
                }
                , process.env.SECRET_CODE,
                {
                    expiresIn: '1day'
                }
            )
            // NOTE : "Save token in Cookie"
            res.cookie('jwtToken',created_token)
            req.body.userData={userEmail:userData['userEmail'], _id: userData['_id']}
            res.send("<script>location.href='/friends'</script>")
        }catch(e){
            console.error(e)
        }
    }, 
    login : async(req,res)=>{
        try{

            if(req.body.userEmail == null || req.body.userPw == null) {
                res.send("<script>alert('There no user information. Please write sign up data');location.href='/';</script>")
            }
            const data = {
                userEmail : req.body.userEmail,
                userPw : req.body.userPw
            }
            const emailCheck = await checkDuplicateEmail(data)
            if(emailCheck == 'NONE'){
                res.send("<script>alert('There is no signUped email. Please signUp first');location.href='/user/signUp';</script>")
            }

            const userData = await findeUserData(data)
 
            // NOTE : "create token"
            const created_token = jwt.sign(
                {
                    userEmail:userData['userEmail'],
                    _id : userData['_id']
                }
                , process.env.SECRET_CODE,
                {
                    expiresIn: '1day'
                }
            )
            // NOTE : "Save token in Cookie"
            res.cookie('jwtToken',created_token)
            req.body.userData={userEmail:userData['userEmail'], _id:userData['_id']}
            res.send("<script>location.href='/friends'</script>")
        }catch(e){

        }
    },
    getUserProfliePage : async(req,res)=>{
        try{
            const params = req.params['id']
            const id = params.slice(1,params.length)
            const _id = ObjectId(id)

            const userData = await findUserDataById(_id)            
            res.render('user_profile',{userNick:userData['userNick'],profileImg:userData['profileImg'],statusMessage:userData['statusMessage'],_id:userData['_id']})

        }catch(e){
            console.error(e)
        } 
    },
    getMyProfliePage : async(req,res)=>{
        try{
            const tokenData = (req.body.userData['_id'])        
            const params = req.params['id']
            const id = params.slice(1,params.length)

            if(tokenData !== id) {
                res.send("<script>alert('Invalid access path');location.href='/user/login';</script>")
            }

            const _id = ObjectId(id)
            const userData = await findUserDataById(_id)
            res.render('my_profile',{userNick:userData['userNick'],profileImg:userData['profileImg'],statusMessage:userData['statusMessage'],_id:userData['_id']})

        }catch(e){
            console.error(e)
        } 
    },
    updateMyProflie : async(req,res)=>{
        const tokenData = req.body.userData['_id']
        const _id = ObjectId(tokenData)
        const userData = await findUserDataById(_id)
        const editUserNick = (req.body.userNick).toLowerCase()
        const editStatusMessage = req.body.statusMessage
        

        if(req.file&&editUserNick&&editStatusMessage){
            const editProfileImg = `/uploads/profile/${req.file.filename}` 
            await updateAllUserProfileInfo(_id,editProfileImg,editUserNick,editStatusMessage)

            userData['profileImg'] =editProfileImg 
            userData['userNick']=editUserNick
            userData['statusMessage']=editStatusMessage

        }else if(req.file&&editUserNick){
            const editProfileImg = `/uploads/profile/${req.file.filename}` 
            await updateUserProfileImg(_id,editProfileImg)
            await updateUserNick(_id,editUserNick)

            userData['profileImg'] =editProfileImg 
            userData['userNick']=editUserNick

        }else if(req.file&&editStatusMessage){
            const editProfileImg = `/uploads/profile/${req.file.filename}` 
            await updateUserProfileImg(_id,editProfileImg)
            await updateUserStatusMessage(_id,editStatusMessage)

            userData['profileImg'] =editProfileImg 
            userData['statusMessage']=editStatusMessage

        }else if( (req.file&&!editUserNick) || (req.file&&!editStatusMessage) || (req.file&&!editUserNick&&!editStatusMessage)){
            const editProfileImg = `/uploads/profile/${req.file.filename}` 
            await updateUserProfileImg(_id,editProfileImg)
            
            userData['profileImg'] =editProfileImg

        }else if ((!req.file&&editUserNick)||(editUserNick&&!editStatusMessage)||(!req.file&&editUserNick&&!editStatusMessage)){
            await updateUserNick(_id,editUserNick) 
            
            userData['userNick']=editUserNick

        }else if ((!req.file&&!editUserNick)||(!editUserNick&&editStatusMessage)||(!req.file&&!editUserNick&&editStatusMessage)){
            await updateUserStatusMessage(_id,editStatusMessage)
            
            userData['statusMessage']=editStatusMessage
        }
  
        res.render('my_profile',{userNick:userData['userNick'],profileImg:userData['profileImg'],statusMessage:userData['statusMessage'],_id:_id})

    }

       
}

