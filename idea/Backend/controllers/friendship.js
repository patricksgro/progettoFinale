import mongoose from "mongoose";
import { Friendship } from "../models/Friendship.js"
import User from "../models/User.js";


export async function sendFriendRequest(req, res, next) {
    try {
        //lo prendiamo dal body perche dal frontend abbiamo accesso ai dati ossia id di chi riceve la richiesta e quindi lo estraggo da li
        const { recipientId } = req.body
        //questo lo prendiamo dal famoso middleware in cui creiamo req.user per cui è quello che abbiamo dal token
        const requesterId = req.user.id

        if (!mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ message: 'Id non valido' });
        }

        const user = await User.findById(recipientId)
        if (!user) {
            return res.status(404).json({ message: 'Utente ricevente non trovato' })
        }

        if (recipientId == requesterId) {
            return res.status(400).json({ message: "Non puoi mandare una richiesta di amicizia a te stesso" });
        }

        //verifichiamo che non ci sia gia una relazione
        const relation = await Friendship.findOne({
            $or: [
                { requester: requesterId, recipient: recipientId },
                { requester: recipientId, recipient: requesterId }
            ]
        })

        if (relation) {
            if (relation.status === 'declined') {
                relation.status = 'pending'
                relation.requester = requesterId
                relation.recipient = recipientId
                await relation.save();
                return res.status(200).json({ message: 'Nuova richiesta di amicizia inviata' })
            }
            return res.status(400).json({ message: 'Richiesta già esistente o amicizia già attiva' })
        }

        //creiamo la nuova amicizia
        const friends = new Friendship({ requester: requesterId, recipient: recipientId })
        await friends.save()

        res.status(200).json({ message: 'Richiesta di amicizia inviata' })
    } catch (err) {
        next(err)
    }
}


export async function acceptFriendRequest(req, res, next) {
    try {
        const { requesterId } = req.params

        if (!mongoose.Types.ObjectId.isValid(requesterId)) {
            return res.status(400).json({ message: 'Id non valido' });
        }

        const user = await User.findById(requesterId)
        if (!user) {
            return res.status(404).json({ message: 'Utente richiedente amicizia non trovato' })
        }

        const recipientId = req.user.id

        //verifichiamo che esista la richiesta inviata, verifichiamo nella collection
        const friends = await Friendship.findOne({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending'
        });

        if (!friends) {
            return res.status(404).json({ message: "Richiesta non trovata" });
        }

        friends.status = 'accepted'
        await friends.save()

        res.status(200).json({ message: 'Richiesta di amicizia accettata' })
    } catch (err) {
        next(err)
    }
}


export async function declineFriendRequest(req, res, next) {
    try {
        const { requesterId } = req.params

        if (!mongoose.Types.ObjectId.isValid(requesterId)) {
            return res.status(400).json({ message: 'Id non valido' });
        }

        const user = await User.findById(requesterId)
        if (!user) {
            return res.status(404).json({ message: 'Utente richiedente amicizia non trovato' })
        }

        const recipientId = req.user.id

        //verifichiamo che esista la richiesta inviata, verifichiamo nella collection
        const friends = await Friendship.findOne({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending'
        });

        if (!friends) {
            return res.status(404).json({ message: "Richiesta non trovata" });
        }

        friends.status = 'declined'
        await friends.save()

        res.status(200).json({ message: 'Richiesta di amicizia rifiutata' })
    } catch (err) {
        next(err)
    }
}


export async function cancelFriendRequest(req, res, next) {
    try {

        const { recipientId } = req.params

        if (!mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ message: 'Id non valido' });
        }

        const requesterId = req.user.id

        const friends = await Friendship.findOne({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending'
        });

        if (!friends) {
            return res.status(404).json({ message: "Richiesta non trovata" });
        }

        await friends.deleteOne()
        res.status(200).json({ message: 'Richiesta di amicizia annullata' })

    } catch (err) {
        next(err)
    }
}


export async function removeFriend(req, res, next) {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Id non valido' });
        }

        const requesterId = req.user.id

        const friends = await Friendship.findOne({
            $or: [
                { requester: requesterId, recipient: id },
                { requester: id, recipient: requesterId }
            ],
            status: 'accepted'
        });

        if (!friends) {
            return res.status(404).json({ message: "Amicizia non trovata" });
        }

        await friends.deleteOne()
        res.status(200).json({ message: 'Amicizia cancellata' })

    } catch (err) {
        next(err)
    }
}

export async function getPendingRequests(req, res, next) {
    try {

        const userId = req.user.id

        const friends = await Friendship.findOne({
            recipient: userId,
            status: "pending"
        }).populate("requester", "name surname avatar")

        res.status(200).json(friends)

    } catch (err) {
        next(err)
    }
}


export async function getFriends(req, res, next) {
    try {

        const id = req.params.id

        //cerchiamo relazioni accepted in cui utente abbia accettato richiesta o abbiano accettato la sua richiesta, popoliamo con nome e email che serviranno nel frontend
        const friends = await Friendship.find({
            $or: [
                { requester: id, status: "accepted" },
                { recipient: id, status: "accepted" }
            ]
        }).populate("requester recipient", "name surname avatar");

        res.json(friends);
    } catch (err) {
        next(err);
    }
}