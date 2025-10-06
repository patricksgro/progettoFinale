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

        const findEmail = await User.findOne({ email }).select('+password')
        if (!findEmail || !(await findEmail.comparePassword(password))) {
            return res.status(400).json({ message: 'Email o password errati' });
        }


        //OTP
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

    } catch (err) {
        // next(err)
        console.error(err)
    }

}

//FUNZIONE VERIFICA OTP DOPO LOGIN
export async function verifyOTP(req, res, next) {
    try {

        const { email, otp } = req.body

        const otpDoc = await Otp.findOne({ email, otp })
        if (!otpDoc || otpDoc.expiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP scaduto o non valido' })
        }

        //OTP corretto generi otp
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Email non valida' })
        }
        const jwt = await signJWT({ id: user._id })

        await otpDoc.deleteOne()

        return res.status(200).json({ message: 'Login completato', jwt })

    } catch (err) {
        console.error(err)
        // next(err)
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
        let { name, surname, dateOfBirth, bio, email, password, otp } = req.body

        const otpDoc = await Otp.findOne({ email, otp })
        if (!otpDoc || otpDoc.expiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP scaduto o non valido' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email già presente" });
        }

        const newUser = new User({ name, surname, dateOfBirth, bio, email, password })

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