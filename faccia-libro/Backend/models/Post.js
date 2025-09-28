import mongoose, { Schema } from "mongoose";


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
            required: true,
            min: 1
        },
        unit: {
            type: String,
            required: true,
            trim: true,
            enum: ['min', 'hour']
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post