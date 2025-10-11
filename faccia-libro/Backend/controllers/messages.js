import { CloudinaryStorage } from "multer-storage-cloudinary"
import { Messages } from "../models/Messages.js"
import User from "../models/User.js"


export async function getUsers(req, res, next) {
    try {
        const loggedUser = req.user.id
        const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select('username avatar')

        res.status(200).json(filteredUsers)
    } catch (err) {
        next(err)
    }
}


export async function getMessagesWithUser(req, res, next) {
    try {
        const { id } = req.params
        //che si aid valido oblectId mongoose
        const userId = req.user.id

        if (!id) {
            return res.status(400).json({ message: "ID destinatario mancante" })
        }

        if (userId === id) {
            return res.status(400).json({ message: 'Non ci sono messaggi da recuperare con te stesso' })
        }

        const messages = await Messages.find({
            $or: [
                { senderId: userId, receiverId: id },
                { senderId: id, receiverId: userId }
            ]
        }).sort({createdAt: 1})

        res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
}


export async function sendMessage(req, res, next) {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user.id

        if (!receiverId) {
            return res.status(400).json({ message: "ID destinatario mancante" })
        }

        if (!text || !image) {
            return res.status(400).json({ message: 'Il messaggio non può essere vuoto' })
        }

        if (receiverId === senderId) {
            return res.status(400).json({ message: "Non puoi inviare messaggi a te stesso" });
        }

        let imgUrl
        if (req.file) {
            imgUrl = req.file.path
        }

        const newMessage = new Messages({
            senderId,
            receiverId,
            text: text.trim() || null,
            image: imgUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (err) {
        next(err)
    }
}


