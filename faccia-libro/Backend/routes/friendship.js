import express from "express";
import { acceptFriendRequest, declineFriendRequest, getFriends, sendFriendRequest } from "../controllers/friendship.js";

const friendshipRouter = express.Router()

friendshipRouter.post('/send', sendFriendRequest)

friendshipRouter.patch('/accept/:requesterId', acceptFriendRequest)

friendshipRouter.patch('/decline/:requesterId', declineFriendRequest)

friendshipRouter.get('/', getFriends)

export default friendshipRouter