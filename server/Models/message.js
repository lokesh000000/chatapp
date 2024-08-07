import mongoose  from "mongoose";
import userModel from "./userModel.js";

const MessageSchema = new mongoose.Schema({
    senderId : {type : mongoose.Schema.Types.ObjectId,
        ref : userModel,
        require : true
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : userModel,
        require : true
    },
    message :{
        type : String,
        require : true
    }
 } ,{timestamps : true})


 const Message = mongoose.model("Messages" , MessageSchema)
 
 export default Message