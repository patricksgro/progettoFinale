import express from "express";
import cors from 'cors'
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