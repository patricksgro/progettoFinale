import express from "express";
import { acceptFriendRequest, cancelFriendRequest, declineFriendRequest, getFriends, getPendingRequests, removeFriend, sendFriendRequest } from "../controllers/friendship.js";

const friendshipRouter = express.Router()

friendshipRouter.post('/send', sendFriendRequest)

friendshipRouter.patch('/accept/:requesterId', acceptFriendRequest)

friendshipRouter.patch('/decline/:requesterId', declineFriendRequest)

friendshipRouter.patch('/cancel/:recipientId', cancelFriendRequest)

friendshipRouter.patch('/remove/:id', removeFriend)

friendshipRouter.get('/pendingRequests', getPendingRequests)

friendshipRouter.get('/', getFriends)

export default friendshipRouter