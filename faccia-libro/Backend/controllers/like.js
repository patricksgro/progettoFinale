import { Like } from "../models/Likes.js"
import Post from "../models/Post.js"



export async function likePost(req, res, next) {
    try {

        const userId = req.user.id
        const { id } = req.params

        //ci avvaliamo del midlleware creato in precedenza per verificare che l'id sia valido
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        const liked = await Like.findOne({ user: userId, post: id })
        //opzionale perche abbiamo garantito l'unicità da mongoose
        if (liked) {
            return res.status(400).json({ message: 'Like già inserito' })
        }

        const newLike = new Like({ user: userId, post: id })
        await newLike.save()

        res.status(201).json(newLike)

    } catch (err) {
        next(err)
    }
}


export async function unlikePost(req, res, next) {
    try {

        const userId = req.user.id
        const { id } = req.params

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        const liked = await Like.findOneAndDelete({ user: userId, post: id })
        if (!liked) {
            return res.status(404).json({ mesage: 'Like non trovato' })
        }

        res.status(200).json(liked)

    } catch (err) {
        next(err)
    }
}

export async function getLikesPost(req, res, next) {
    try {

        const { id } = req.params

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        const likes = await Like.find({ post: id }).populate('user', 'name')

        res.status(200).json(likes)

    } catch (err) {
        next(err)
    }
}