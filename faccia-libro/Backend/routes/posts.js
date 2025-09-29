import express from "express";
import { createPost, deletePost, editPost, getAll, getPost } from "../controllers/posts.js";
import { validateObjectId } from "../middlewares/common/validateObjectId.js";
import { sanitizeRequest } from "../middlewares/common/sanitizeRequest.js";
import { validateRequest } from "../middlewares/common/validateRequest.js";
import { createPostSchema, updatePostSchema } from "../validations/Post.validation.js";


const postRouter = express.Router()

postRouter.get('/', getAll)

postRouter.post('/', sanitizeRequest, validateRequest(createPostSchema), createPost)

postRouter.get('/:id', validateObjectId, getPost)

postRouter.put('/:id', validateObjectId, sanitizeRequest, validateRequest(updatePostSchema), editPost)

postRouter.delete('/:id', validateObjectId, deletePost)

export default postRouter