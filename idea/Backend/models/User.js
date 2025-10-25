import mongoose, { Schema } from "mongoose";
import Post from "./Post.js";
import bcrypt from 'bcrypt'
import { Like } from "./Likes.js";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date,
    },
    bio: {
        type: String,
        default: "",
        trim: true
    },
    avatar: {
        type: String,
        default: "/defaultUserImg.jpg"
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,7}$/, 'Email non valida']
    },
    googleID: {
        type: String
    },
    password: {
        type: String,
        minlength: 8,
        select: false
    },
}, { timestamps: true })


UserSchema.virtual('posts', {
    ref: 'Post',            // il modello di riferimento
    localField: '_id',      // campo dell'autore
    foreignField: 'author', // campo nel post che contiene l'ID utente
    justOne: false
})

//quando convert in json o object includi i campi virtuali
UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })


//eliminazione post insieme all'user
UserSchema.pre('findOneAndDelete', async function (next) {
    const user = await this.model.findOne(this.getFilter());
    if (user) {
        await Post.deleteMany({ author: user._id });

        await Like.deleteMany({ user: user._id });
    }
    next();
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next()

    } catch (err) {
        next(err)
    }
})

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

//prima definisco schema poi creo il modello
const User = mongoose.model('User', UserSchema)

export default User