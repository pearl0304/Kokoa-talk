import {checkDuplicateEmail,checkDuplicateNick,insertUserData,findeUserData} from '../models/user.js'
import jwt from 'jsonwebtoken'

export const userController = {

    getsignUpPage : async(req,res)=>{
        try{
            res.render('signUp')  
        }catch(e){
            console.error(e)
        }
    },
    tmp : async(req,res)=>{
        console.log(req.file)
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
                profileImg : filename 
            }

            //check duplicate Email and Nick
            const emailCheck = await checkDuplicateEmail(data)
            if(emailCheck == 'DUPLICATE'){
                res.send("<script>alert('This EMAIL is already in use');history.back();</script>")
            }
            const nickCheck = await checkDuplicateNick(data)
            if(nickCheck == 'DUPLICATE'){
                res.send("<script>alert('This NICK NAME is already in use');history.back();</script>")
            }

            await insertUserData(data)

            // create token
            const created_token = jwt.sign(
                {
                    userEmail:data['userEmail'],
                    userNick : data['userNick']
                }
                , process.env.SECRET_CODE,
                {
                    expiresIn: '50m'
                }
            )
            // Save token in Cookie
            res.cookie('jwtToken',created_token)
            req.body.userData={userEmail:data['userEmail'],userNick : data['userNick']}
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
                    userNick : userData['userNick']
                }
                , process.env.SECRET_CODE,
                {
                    expiresIn: '1m'
                }
            )
            // Save token in Cookie
            res.cookie('jwtToken',created_token)
            req.body.userData={userEmail:userData['userEmail'],userNick : userData['userNick']}
            res.send("<script>location.href='/friends'</script>")
        }catch(e){

        }
    }   
}

