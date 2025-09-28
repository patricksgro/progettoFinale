import sanitizeHtml from "sanitize-html"

export const sanitizeRequest = (req, res, next) => {

    const sanitize = (value) => {
        if (typeof value === 'string') {
            return sanitizeHtml(value.trim())
        }
        return value
    }

    if (req.body) {
        Object.keys(req.body).forEach((key) => {
            req.body[key] = sanitize(req.body[key])
        })
    }

    if (req.query) {
        Object.keys(req.query).forEach((key) => {
            req.query[key] = sanitize(req.query[key])
        })
    }

    next()

}