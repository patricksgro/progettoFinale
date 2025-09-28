
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
        let {cover, description, readTime, author } = req.body
        
        const newPost = new Post({
            cover, description, readTime, author
        })

        const postSaved = await newPost.save()
        return res.status(201).json(postSaved) 
    } catch (err) {
        next(err)
    }
}

export async function editPost(req, res, next) {
    try {
        const {id} = req.params
        let {cover, description, readTime} = req.body

        const editedPost = await Post.findByIdAndUpdate(id, {
            cover, description, readTime
        }, {new: true})

        res.status(200).json(editedPost)
    } catch (err) {
        next(err)
    }
}

export async function deletePost(req, res, next) {
    try {
        const {id} = req.params

        const deletedUser = await Post.findByIdAndDelete(id)

        res.status(200).json(deletedUser)
    } catch (err) {
        next(err)
    }
}