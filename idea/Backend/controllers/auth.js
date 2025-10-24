import { signJWT } from "../helpers/jwt.js"
import { sendOtpEmail } from "../helpers/mailer/emailService.js"
import { generateOTP } from "../helpers/mailer/generateOTP.js"

import { Otp } from "../models/Otp.js"
import User from "../models/User.js"


export async function login(req, res, next) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Inserisci email e password' })
        }

        const user = await User.findOne({ email }).select('+password')
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Email o password errati' })
        }

        // verifica numero massimo OTP per giorno
        const maxOtpPerDay = 10
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const otpCount = await Otp.countDocuments({
            email,
            createdAt: { $gte: twentyFourHoursAgo }
        })

        if (otpCount >= maxOtpPerDay) {
            return res.status(429).json({
                message: 'Hai raggiunto il numero massimo di OTP richiedibili nelle ultime 24 ore. Riprova più tardi.'
            })
        }

        // genera OTP
        const otp = generateOTP()
        const otpDoc = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })
        await otpDoc.save()

        try {
            await sendOtpEmail(email, otp)
        } catch (err) {
            console.error(err)
        }

        // restituisci solo ID OTP temporaneo
        res.json({ message: "OTP inviato alla tua email", otpId: otpDoc._id })

    } catch (err) {
        console.error(err)
        next(err)
    }
}


//FUNZIONE VERIFICA OTP DOPO LOGIN
export async function verifyOTP(req, res, next) {
    try {
        const { otpId, otp } = req.body

        const otpDoc = await Otp.findById(otpId)
        if (!otpDoc || otpDoc.expiresAt < new Date() || otpDoc.otp !== otp) {
            return res.status(400).json({ message: 'OTP scaduto o non valido' })
        }

        const user = await User.findOne({ email: otpDoc.email })
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' })
        }

        const jwt = await signJWT({ id: user._id })

        await otpDoc.deleteOne()  // elimina OTP usato

        return res.status(200).json({ message: 'Login completato', jwt })

    } catch (err) {
        console.error(err)
        next(err)
    }
}

//REGISTRAZIONE
//manda otp dopo verifica email
export async function sendOtp(req, res, next) {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: 'Inserisci l\'email' })
        }

        const otp = generateOTP()

        const otpDoc = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })
        await otpDoc.save()

        try {
            await sendOtpEmail(email, otp)
        } catch (err) {
            console.error(err)
        }

        res.json({ message: "OTP inviato alla tua email" });

    } catch (error) {
        next(err)
    }
}


//Registrazione
export async function register(req, res, next) {
    try {
        let { name, surname, dateOfBirth, bio, email, avatar, password ,otp } = req.body

        const otpDoc = await Otp.findOne({ email, otp })
        if (!otpDoc || otpDoc.expiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP scaduto o non valido' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email già presente" });
        }

        const newUser = new User({ name, surname, dateOfBirth, bio, email, avatar, password })

        const findEmail = await User.findOne({ email })
        if (findEmail) {
            return res.status(409).json({ message: 'Email già presente' })
        }

        const savedUser = await newUser.save()

        await otpDoc.deleteOne();

        const jwt = await signJWT({ id: savedUser._id })

        return res.status(201).json({ message: 'Registrazione avvenuta con successo', jwt })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email già presente (errore DB)' });
        }
        next(err)
    }
}