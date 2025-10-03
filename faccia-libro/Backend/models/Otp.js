import mongoose, { Schema } from "mongoose";

export const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    }
})

// TTL Index: cancella doc scaduti
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model('Otp', otpSchema)