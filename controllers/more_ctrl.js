export const moreController = {
    getMorePage : async(req,res)=>{
        try{
            res.render('more')
        }catch(e){
            console.error(e)
        }
    }
}