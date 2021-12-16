import {checkDuplicateEmail,checkDuplicateNick,insertUserData} from '../models/user.js'
import Swal from 'sweetalert2'
export const userController = {

    getRegisterPage : async(req,res)=>{
        try{
            await res.render('register')  
        }catch(e){
            console.error(e)
        }
    },

    insertUser : async(req,res)=>{
        try{
            const data = {
                userEmail : req.body.userEmail,
                userNick : req.body.userNick,
                userPw : req.body.userPw
            }
            // check duplicate Email and Nick
            const emailCheck = await checkDuplicateEmail(data)
            if(emailCheck == 'DUPLICATE'){
                res.send("<script>alert('This EMAIL is already in use');history.back();</script>")
            }
            const nickCheck = await checkDuplicateNick(data)
            if(nickCheck == 'DUPLICATE'){
                res.send("<script>alert('This NICK NAME is already in use');history.back();</script>")
            }

            await insertUserData(data)
            res.render('friends')
        }catch(e){
            console.error(e)
        }
    }








}