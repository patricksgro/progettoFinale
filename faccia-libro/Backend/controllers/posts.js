
import Post from "../models/Post.js"


export async function getAll(req, res, next) {
    try {
        const posts = await Post.find().populate('author')

        res.status(200).json(posts)
    } catch (err) {
        next()
    }
}

export async function createPost(req, res, next) {
    try {
        let { cover, description, readTime } = req.body
        let id = req.user._id

        const newPost = new Post({
            cover, description, readTime, author: id
        })

        const postSaved = await newPost.save()
        return res.status(201).json(postSaved)
    } catch (err) {
        next(err)
    }
}

export async function getPost(req, res, next) {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

export async function editPost(req, res, next) {
    try {
        const { id } = req.params
        let { cover, description, readTime } = req.body

        //RIPARTI DA QUI
        const post = await Post.findById(id)
        console.log(post)
        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'Non puoi modificare i post degli altri utenti' })
        }

        const editedPost = await Post.findByIdAndUpdate(id, {
            cover, description, readTime
        }, { new: true })

        if (!editedPost) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        res.status(200).json(editedPost)
    } catch (err) {
        next(err)
    }
}

export async function deletePost(req, res, next) {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'Non puoi eliminare i post degli altri utenti' })
        }

        const deletePost = await Post.findByIdAndDelete(id)

        if (!deletePost) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        res.status(200).json(deletePost)
    } catch (err) {
        next(err)
    }
}