import mongoose, { Schema } from "mongoose";
import { CommentSchema } from "./Comment.js";


export const PostSchema = new Schema({
    cover: {
        type: String,
        trim: true,
        match: [/\.(jpg|jpeg|png|gif|webp|svg|mp4|avi|mov|mkv|webm)$/i, 'URL non valida']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    readTime: {
        value: {
            type: Number,
            min: 1
        },
        unit: {
            type: String,
            trim: true,
            enum: ['min', 'hour']
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        CommentSchema
    ]
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post