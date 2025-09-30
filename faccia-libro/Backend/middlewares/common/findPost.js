import Post from "../../models/Post.js"


export async function findPost(req, res, next) {
    try {
        const {id} = req.params

        const post = await Post.findById(id).populate('comments.author')
        if(!post) {
            return res.status(404).json({message: 'Post non trovato'})
        }
        req.post = post
        next()
    } catch(err) {
        next(err)
    }
}