import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
    //created at and updaated at-->will be useful to display time of the message when its sent
},{timestamps:true});

const Message=mongoose.model("Message",MessageSchema);
export default Message;