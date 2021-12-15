/*
get~ : go to page
post~ : process something

TODO : 
Register 
Login
JWT Token
*/
export const userController = {

    getRegisterPage:async(req,res)=>{
        try{
            await res.render('register')  
        }catch(e){
            console.error(e)
        }
    },








}