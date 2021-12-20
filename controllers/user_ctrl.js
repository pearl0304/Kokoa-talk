import { ObjectId } from 'mongodb'
import {checkDuplicateEmail,
        insertUserData,
        findeUserData,findUserDataById,findUserDataByEmail,
        updateUserProfileImg,updateUserNick,updateUserStatusMessage
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
            const data = {
                userEmail : req.body.userEmail,
                userNick : req.body.userNick,
                userPw : req.body.userPw,
                profileImg : filename ,
                statusMessage : ''
            }

            //check duplicate Email and Nick
            const emailCheck = await checkDuplicateEmail(data)
            if(emailCheck == 'DUPLICATE'){
                res.send("<script>alert('This EMAIL is already in use');history.back();</script>")
            }

            await insertUserData(data)
            const userData = await findUserDataByEmail(data)
            console.log(userData['_id'])
     
            // create token
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
            // Save token in Cookie
            res.cookie('jwtToken',created_token)
            req.body.userData={userEmail:userData['userEmail'], _id: userData['_id']}
            res.send("<script>location.href='/friends'</script>")
        }catch(e){
            console.error(e)
        }
    }, 
    login : async(req,res)=>{
        try{
            const data = {
                userEmail : req.body.userEmail,
                userPw : req.body.userPw
            }
            const emailCheck = await checkDuplicateEmail(data)
            if(emailCheck == 'NONE'){
                res.send("<script>alert('There is no signUped email. Please signUp first');location.href='/user/signUp';</script>")
            }

            const userData = await findeUserData(data)
 
            // create token
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
            // Save token in Cookie
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
        const profileImg = ''
        const edit_nick = req.body.userNick
        const edit_statusMessage = req.body.statusMessage  

        if(req.file){
            profileImg = `/uploads/profile/${req.file.filename}`   
            await updateUserProfileImg(_id,profileImg) 
 
        }else{
            profileImg =  userData['profileImg']
        }
  
  





        res.render('my_profile',{userNick:edit_nick,profileImg:edit_filename,statusMessage:edit_statusMessage,_id:_id})

    }

       
}

