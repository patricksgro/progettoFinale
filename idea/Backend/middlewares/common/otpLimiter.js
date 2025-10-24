import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 3, 
    message: "Limite richieste OTP raggiunto, riprova più tardi"
})