import User from "../../models/User.js"


export async function validateEmail(req, res, next) {
    try {
        let { email } = req.body

        const findEmail = await User.findOne({ email })
        if (findEmail) {
            return res.status(409).json({ message: 'Email già presente' })
        }
        next()

    } catch (err) {
        console.log(err)
    }
}