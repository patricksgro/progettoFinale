import express from "express";
import cors from 'cors'
import "dotenv/config"
import { connectDB } from "./db.js";
import userRouter from "./routes/users.js";
import { errorHandler } from "./middlewares/common/errorHandler.js";
import postRouter from "./routes/posts.js";


const server = express()

server.use(cors())
server.use(express.json())

server.use('/users', userRouter)
server.use('/posts', postRouter)

server.use(errorHandler)

connectDB()

server.listen(process.env.PORT, () => {
    console.log('Server avviato alla porta ' + process.env.PORT)
})