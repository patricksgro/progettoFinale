import express from "express";
import { createComment, edit, getAll, remove } from "../controllers/comments.js";
import { validateObjectId } from "../middlewares/common/validateObjectId.js";
import { findPost } from "../middlewares/common/findPost.js";
import { sanitizeRequest } from "../middlewares/common/sanitizeRequest.js";
import { validateRequest } from "../middlewares/common/validateRequest.js";
import { CreateCommentSchema, UpdateCommentSchema } from "../validations/Comment.validation.js";
import { validateCommentID } from "../middlewares/common/comments/validateCommentID.js";

const commentRouter = express.Router()

commentRouter.get('/:id/comments', validateObjectId, findPost, getAll)

commentRouter.post('/:id/comments', validateObjectId, findPost, sanitizeRequest, validateRequest(CreateCommentSchema), createComment)

commentRouter.put('/:id/comments/:commentID', validateObjectId, validateCommentID, findPost, sanitizeRequest, validateRequest(UpdateCommentSchema), edit)

commentRouter.delete('/:id/comments/:commentID', validateObjectId, validateCommentID, findPost, remove)

export default commentRouter