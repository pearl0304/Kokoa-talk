import { insertUser } from "../models/user.js"
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

        }catch(e){
            console.error(e)
        }
    }








}