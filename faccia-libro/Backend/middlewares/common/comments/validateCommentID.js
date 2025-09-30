import mongoose from "mongoose"


export async function validateCommentID(req, res, next) {
    try {
        const {commentID} = req.params

        if(!mongoose.Types.ObjectId.isValid(commentID)) {
            return res.status(400).json('ID commento non valido')
        }
        next()
    } catch (err) {
        next(err)
    }
}