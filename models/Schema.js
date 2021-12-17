import mongoose from "mongoose"
const { Schema } = mongoose;
import validator from "validator";

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : true,
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
    reg_dt : {
        type : Date,
        default : Date.now
    }
})

export {userSchema}