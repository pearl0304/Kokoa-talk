export const findController = {
    getFindPage : async(req,res)=>{
        try{
            res.render('find')
        }catch(e){
            console.error(e)
        }
    }
}