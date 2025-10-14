import express from 'express'
import { login, register, sendOtp, verifyOTP } from '../controllers/auth.js'
import { validateEmail } from '../middlewares/common/validateEmail.js'
import { sanitizeRequest } from '../middlewares/common/sanitizeRequest.js'
import { validateRequest } from '../middlewares/common/validateRequest.js'
import { createUserSchema } from '../validations/User.validation.js'
import passport from 'passport'
import { otpLimiter } from '../middlewares/common/otpLimiter.js'

const authRouter = express.Router()

authRouter.post('/login', sanitizeRequest, login)
authRouter.post('/verify-otp', verifyOTP)

authRouter.post('/send-otp', sendOtp)
authRouter.post('/register', validateEmail, sanitizeRequest, validateRequest(createUserSchema), register)

authRouter.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'] }))

authRouter.get('/callback-google', passport.authenticate('google', { session: false }), (req, res, next) => {
    res.redirect(process.env.FRONTEND_HOST + '/login?jwt=' + req.user.jwt)
})


export default authRouter