import MongoClient from "./config.js";
var conn = MongoClient.connect()

async function getUserColletion(){
    try{
        const client = await conn 
        return client.db("kokoa").collection("users");
    }catch(e){
        console.error(e)
    }
} 

export async function insertUser(data){
    const userCollection = await getUserColletion()
    userCollection.insertOne({
        ...data,
        reg_dt : new Date()
    })
}