import express from "express"
import { createUser, deleteUser, editUser, getAll, getUser } from "../controllers/users.js"
import { validateObjectId } from "../middlewares/common/validateObjectId.js"
import { validateRequest } from "../middlewares/common/validateRequest.js"
import { createUserSchema, updateUserSchema } from "../validations/User.validation.js"
import { validateEmail } from "../middlewares/common/validateEmail.js"
import { sanitizeRequest } from "../middlewares/common/sanitizeRequest.js"
import { validateSearch } from "../middlewares/common/validateSearch.js"

const userRouter = express.Router()


userRouter.get('/', validateSearch('search'), getAll)

userRouter.post('/', validateEmail, sanitizeRequest, validateRequest(createUserSchema), createUser)

userRouter.get('/:id', validateObjectId, getUser)

userRouter.put('/:id', validateObjectId, validateEmail, sanitizeRequest, validateRequest(updateUserSchema), editUser)

userRouter.delete('/:id', validateObjectId, deleteUser)

export default userRouter