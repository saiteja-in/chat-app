import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const  sendMessage=async(req,res)=>{
    // console.log("message sent",req.params.id)
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;  // or const id=req.params.id;
        const senderId =req.user._id;

        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }
        const newMessage=new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save();
        // await newMessage.save();

        
        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()])


        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendmessage controller",error.message)
        res.status(500).json({error:"internal service error"})
    }
}

export const getMessages=async(req,res)=>{
    try {
        const{id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages"); //not reference but actual msgs
//it doesnot give the messages array in the conversation but total message (id,senderid,receiverid,message array)
        if(!conversation) return res.status(200).json([])
        const messages=conversation.messages;
        res.status(200).json(messages)

    } catch (error) {
        console.log("error in getMessages controller",error.message)
        res.status(500).json({error:"internal service error"})
    }
}