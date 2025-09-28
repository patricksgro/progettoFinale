import User from "../models/User.js"




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

//questa deve essere messa come register route
export async function createUser(req, res, next) {
    try {
        let { name, surname, dateOfBirth, bio, email, password } = req.body

        const newUser = new User({ name, surname, dateOfBirth, bio, email, password })

        const savedUser = await newUser.save()
        return res.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
}

export async function getUser(req, res, next) {
    try {
        const { id } = req.params

        const user = await User.findById(id).populate('posts')
        if(!user) {
            return res.status(404).json({message: 'Autore non trovato'})
        }

        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export async function editUser(req, res, next) {
    try {
        const { id } = req.params
        let { name, surname, dateOfBirth, bio, email, password } = req.body

        const updateUser = await User.findByIdAndUpdate(id, {
            name, surname, dateOfBirth, bio, email, password
        }, { new: true })

        if(!updateUser) {
            return res.status(404).json({message: 'Autore non trovato'})
        }

        return res.status(200).json(updateUser)

    } catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const { id } = req.params

        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser) {
            return res.status(404).json({message: 'Autore non trovato'})
        }
        return res.status(200).json(deleteUser)
    } catch (err) {
        next(err)
    }
}



