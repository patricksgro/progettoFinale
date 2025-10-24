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
import messageRouter from "./routes/messages.js";
import http from 'http'
import { initSocket } from "./helpers/socket.js";


const app = express()

const server = http.createServer(app)

initSocket(server)
//rate-limit globale
app.use(cors())
app.use(express.json())
app.use(
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
                    "http://localhost:5173",
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

app.use('/auth', authRouter)
app.use('/users', authVerify, userRouter)
app.use('/posts', authVerify, postRouter)
app.use('/posts', authVerify, commentRouter)
app.use('/friends', authVerify, friendshipRouter)
app.use('/likes', authVerify, likeRouter)
app.use('/messages', authVerify, messageRouter)

app.use(errorHandler)

connectDB()

server.listen(process.env.PORT, () => {
    console.log('Server avviato alla porta ' + process.env.PORT)
})