import mongoose, { Schema } from "mongoose";


const friendshipSchema = new Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Friendship = mongoose.model('Friendship', friendshipSchema)