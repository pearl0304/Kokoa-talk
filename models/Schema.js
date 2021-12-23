import mongoose from "mongoose"
const { Schema } = mongoose;
import validator from "validator";

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }       
    },
    userNick : {
        type : String,
        required : true
    },
    userPw : {
        type : String,
        required : true
    },
    profileImg :{
        type : String
    },
    statusMessage :{
        type : String
    },
    reg_dt : {
        type : Date,
        default : Date.now
    }
})


const channelSchema = new Schema({
    channelUsers :[Schema.Types.ObjectId],
    channelType : {
        type:String
    },
    created_dt : {
        type : Date,
        default : Date.now
    } 
})

const messageSchema = new Schema({
    channelId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    channelType : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    reg_dt : {
        type : Date,
        default : Date.now
    }

})
export {userSchema, channelSchema,messageSchema}