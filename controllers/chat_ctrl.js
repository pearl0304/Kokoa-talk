export const chatController = {
    getChatListPage : async(req,res)=>{
        try{
            res.render('chat-list')
        }catch(e){
            console.error(e)
        }
    }
}