import express from "express";
import { getMessagesWithUser, getUsers, sendMessage } from "../controllers/messages.js";
import uploadCloudinary from "../middlewares/common/uploadCloudinary.js";
import { validateObjectId } from "../middlewares/common/validateObjectId.js";

const messageRouter = express.Router()

messageRouter.get('/users', getUsers)

messageRouter.get('/:id', validateObjectId, getMessagesWithUser)

messageRouter.post('/:id/send', validateObjectId, uploadCloudinary.single('image'), sendMessage)

export default messageRouter