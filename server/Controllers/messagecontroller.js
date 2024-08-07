import Conversation from "../Models/conversation.js";
import Message from "../Models/message.js";
import { getReceiverSocketId ,io } from "../socket/socket.js";

export const sendmessage = async(req ,res ) => {
try{
const {message} = req.body;
 const {id:receiverId} = req.params;
 const senderId = req.currentuser._id;

 let conversation = await Conversation.findOne({
    participants : {$all : [senderId,receiverId]}
 })

 if(!conversation) {
    conversation =  await Conversation.create({
        participants : [senderId,receiverId],

    })
 }

 const newmessage = new Message({
  senderId,
  receiverId,
  message
 })

 if(newmessage) {
    conversation.messages.push(newmessage._id)
 } ///message collection is for each every messages irrelevant to the current user 
 // conversation collection is for saving the new message id to the converation between two user so that we can easily store individual message and get all the messages in b/w two users using the id of the each message

await Promise.all([conversation.save() ,newmessage.save()]);

const receiverSocketId = getReceiverSocketId(receiverId);

console.log("receiver id:",receiverId)

if (receiverSocketId) {
	// io.to(<socket_id>).emit() used to send events to specific client
	io.to(receiverSocketId).emit("newMessage", newmessage);
}
 
res.status(200).json(newmessage)

}
catch(error){
    res.status(500)
}

};

export const getmessage = async(req,res ) =>{
try {
   const {id : receiverId } = req.params
   const senderId = req .currentuser._id;


   const conversation = await Conversation.findOne({
      participants : {$all : [senderId,receiverId]}
   }).populate("messages")

   if(!conversation){
     return res.status(200).json([])
   }

   const message = conversation.messages
   res.status(200).json(message)
}
   catch (error) {
  res.status(400).json({error : "get message error"})
   }
}