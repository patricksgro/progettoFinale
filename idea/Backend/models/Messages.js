import mongoose, { Schema } from "mongoose";


export const messagesSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
},
{
    timestamps: true
})

export const Messages = mongoose.model('Messages', messagesSchema)