import mongoose  from "mongoose";
import userModel from "./userModel.js";
import Message from "./message.js";

const conversationSchema = new mongoose.Schema({
    participants : [{type : mongoose.Schema.Types.ObjectId,
        ref : userModel,
        require : true
    }],
messages : [ {
        type: mongoose.Schema.Types.ObjectId,
        ref : Message,
        require : true,
        default: []
    } ]
 } ,{timestamps : true})


 const Conversation = mongoose.model("conversation" ,conversationSchema )
 
 export default Conversation