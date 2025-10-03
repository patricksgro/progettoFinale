import express from 'express'
import { login, register, verifyOTP } from '../controllers/auth.js'
import { validateEmail } from '../middlewares/common/validateEmail.js'
import { sanitizeRequest } from '../middlewares/common/sanitizeRequest.js'
import { validateRequest } from '../middlewares/common/validateRequest.js'
import { createUserSchema } from '../validations/User.validation.js'

const authRouter = express.Router()

authRouter.post('/login', sanitizeRequest, login)

authRouter.post('/verify-otp', verifyOTP)

authRouter.post('/register', validateEmail, sanitizeRequest, validateRequest(createUserSchema), register)

export default authRouter