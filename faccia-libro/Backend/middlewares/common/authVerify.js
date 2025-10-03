import { verifyJWT } from "../../helpers/jwt.js"
import User from "../../models/User.js"


export async function authVerify(req, res, next) {
    const headerAuth = req.headers.authorization || ''

    const token = headerAuth.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({message: 'Errore di autorizzazione'})
    }

    try {
        const payload = verifyJWT(token)
        const user = await User.findById(payload.id)
        if (!user) {
            return res.status(401).json({message: 'Utente non valido'})
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ message: 'token scaduto o non valido' })
        console.log(err)
    }
}