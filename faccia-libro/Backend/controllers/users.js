import User from "../models/User.js"


export async function getMe(req, res, next) {
    try {
        const user = await User.findById(req.user._id).populate('posts')
        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}


export async function getAll(req, res, next) {
    try {
        const { search } = req.query
        let filter = {}
        if (search) {
            filter = { name: { $regex: search, $options: 'i' } }
        }
        const user = await User.find(filter).populate('posts')

        //da inserire la paginazione

        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export async function getUser(req, res, next) {
    try {
        const { id } = req.params

        const user = await User.findById(id).populate('posts')
        if (!user) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }

        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export async function editUser(req, res, next) {
    try {
        //l'id lo prendo direttamente da req.user che me lo passa il middlware authVerify
        const id = req.user._id
        let { name, surname, dateOfBirth, bio, email, password } = req.body


        const updateUser = await User.findByIdAndUpdate(id, {
            name, surname, dateOfBirth, bio, email, password
        }, { new: true })

        if (!updateUser) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }

        return res.status(200).json(updateUser)

    } catch (err) {
        next(err)
    }
}

export async function updateAvatar(req, res, next) {
    try {
        const filePath = req.file.path
        const id = req.user.id

        const updateAvatar = await User.findByIdAndUpdate(id, { avatar: filePath }, { new: true })
        if (!updateAvatar) {
            return res.status(404).json({ message: 'Utente non trovato' })
        }

        res.status(200).json(updateAvatar)

    } catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = req.user._id

        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }
        return res.status(200).json(deletedUser)
    } catch (err) {
        next(err)
    }
}



