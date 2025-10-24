import express from "express"
import {  deleteUser, editUser, getAll, getMe, getUser, updateAvatar } from "../controllers/users.js"
import { validateObjectId } from "../middlewares/common/validateObjectId.js"
import { validateRequest } from "../middlewares/common/validateRequest.js"
import { createUserSchema, updateUserSchema } from "../validations/User.validation.js"
import { validateEmail } from "../middlewares/common/validateEmail.js"
import { sanitizeRequest } from "../middlewares/common/sanitizeRequest.js"
import { validateSearch } from "../middlewares/common/validateSearch.js"
import uploadCloudinary from "../middlewares/common/uploadCloudinary.js"

const userRouter = express.Router()

userRouter.get('/me', getMe)

userRouter.get('/', validateSearch('search'), getAll)

userRouter.get('/:id', validateObjectId, getUser)

userRouter.put('/:id', validateObjectId, validateEmail, sanitizeRequest, validateRequest(updateUserSchema), editUser)

userRouter.patch('/updateAvatar', uploadCloudinary.single('avatar',), updateAvatar)

userRouter.delete('/:id', validateObjectId, deleteUser)

export default userRouter