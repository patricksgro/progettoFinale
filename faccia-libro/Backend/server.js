import express from "express";
import cors from 'cors'
import helmet from "helmet";
import "dotenv/config"
import { connectDB } from "./db.js";
import userRouter from "./routes/users.js";
import { errorHandler } from "./middlewares/common/errorHandler.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import { authVerify } from "./middlewares/common/authVerify.js";
import passport from "passport";
import googleStrategy from "./helpers/passportConfig.js";
import friendshipRouter from "./routes/friendship.js";
import { likeRouter } from "./routes/like.js";


const server = express()

server.use(cors())
server.use(express.json())
server.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],

                // JS solo dal tuo dominio + da Google per OAuth
                scriptSrc: [
                    "'self'",
                    "https://accounts.google.com",    // Google OAuth
                    "https://apis.google.com",        // Google API SDK
                ],

                // CSS dal tuo dominio + inline (utile per framework) + font o librerie esterne
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com",   // Google Fonts
                ],

                // immagini da dominio locale + Cloudinary
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://res.cloudinary.com",     // Cloudinary CDN
                ],

                // font locali e da CDN (es. Google Fonts)
                fontSrc: [
                    "'self'",
                    "https://fonts.gstatic.com",      // Google Fonts static files
                    "data:",
                ],

                // fetch / XHR solo al tuo backend + API esterne legittime (es. Brevo)
                connectSrc: [
                    "'self'",
                    "https://api.brevo.com",          // invio email OTP o marketing
                    "https://res.cloudinary.com",     // upload o fetch immagini
                    "https://accounts.google.com",    // login con Google
                    "https://apis.google.com",
                ],

                // Blocca completamente <object>, <embed>, ecc.
                objectSrc: ["'none'"],

                // Facoltativo ma consigliato
                frameAncestors: ["'none'"], // come frameguard: deny
            },
        },

        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        noSniff: true,
        crossOriginEmbedderPolicy: false, // utile se usi fetch da Cloudinary o Google
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
)

passport.use(googleStrategy)

server.use('/auth', authRouter)
server.use('/users', authVerify, userRouter)
server.use('/posts', authVerify, postRouter)
server.use('/posts', authVerify, commentRouter)
server.use('/friends', authVerify, friendshipRouter)
server.use('/likes', authVerify, likeRouter)

server.use(errorHandler)

connectDB()

server.listen(process.env.PORT, () => {
    console.log('Server avviato alla porta ' + process.env.PORT)
})