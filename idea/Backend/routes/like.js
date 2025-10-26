import express from "express"
import { validateObjectId } from "../middlewares/common/validateObjectId.js"
import { getLikesPost,  likePost, unlikePost } from "../controllers/like.js"

export const likeRouter = express.Router()

likeRouter.post('/:id/addLike', validateObjectId, likePost)

likeRouter.post('/:id/removelike', validateObjectId, unlikePost)

likeRouter.get('/:id/getLikes', validateObjectId, getLikesPost)