

export async function getAll(req, res, next) {
    try {
        res.status(200).json(req.post.comments)
    } catch (err) {
        next(err)
    }
}


export async function createComment(req, res, next) {
    try {
        const {text} = req.body

        const newComment = {text, author: req.user._id}
        req.post.comments.push(newComment)

        await req.post.save()

        res.status(201).json(req.post.comments[req.post.comments.length - 1])
    } catch (err) {
        next(err)
    }
}

export async function edit(req, res, next) {
    try {
        //id validateObjectID per post
        //findpost per trovare post
        //sanitize per body
        //check validateRequest(parametro schema update)
        const {commentID} = req.params
        const {text} = req.body
        const comment = req.post.comments.find(comment => comment._id == commentID)
        if(!comment) {
            return res.status(404).json({message: 'Commento non trovato'})
        }

        if(!comment.author.equals(req.user._id)) {
            return res.status(403).json({message: 'Non puoi modificare i commenti degli altri utenti'})
        }

        //commmento ci da un oggetto, lo modifichiamo quindi con text destrutturato dal body
        comment.text = text

        await req.post.save()

        return res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}


export async function remove(req, res, next) {
    try {
        const {commentID} = req.params

        //req.post perche nel middleware lo definiamo noi req.post preso dall'oggetto post stesso di cui facciamo la ricerca
        const comment = req.post.comments.find(comment => comment._id == commentID)
        if(!comment) {
            return res.status(404).json({message: 'Commento non trovato'})
        }

        if(!comment.author.equals(req.user._id)) {
            return res.status(403).json({message: 'Non puoi eliminare i commenti degli altri utenti'})
        }

       req.post.comments = req.post.comments.filter(comment => comment._id != commentID)

       await req.post.save()

       //commento eliminato
       res.status(200).json(comment)
    } catch(err) {
        next()
    }
}