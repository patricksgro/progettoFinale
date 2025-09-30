import { signJWT } from "../helpers/jwt.js"
import User from "../models/User.js"


export async function login(req, res, next) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Inserisci email e password' })
        }

        const findEmail = await User.findOne({ email }).select('+password')

        console.log(findEmail)
        if (findEmail) {
            if (await findEmail.comparePassword(password)) {
                const jwt = await signJWT({
                    id: findEmail._id
                })
                return res.status(200).json({ message: 'token gerenato', jwt })
            }
        }

        return res.status(400).json({ message: 'email o password errati' })
    } catch (err) {
        next(err)
    }

}