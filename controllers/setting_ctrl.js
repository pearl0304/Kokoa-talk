export const settingController = {
    getsettingPage : async(req,res)=>{
        try{
            res.render('setting')
        }catch(e){
            console.error(e)
        }
    }
}