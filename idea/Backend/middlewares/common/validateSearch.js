import sanitizeHtml from 'sanitize-html';


export const validateSearch = (fieldName, maxLength = 45, regex = /^[a-zA-Z0-9\sàèéìòùÀÈÉÌÒÙ']*$/) => {

    return (req, res, next) => {
        let value = req.query[fieldName]
        value = value ? sanitizeHtml(value) : ''

        if (value.length > maxLength) {
            return res.status(400).json({ message: `${fieldName} non può contenere più di 45 caratteri` })
        }

        if (!regex.test(value)) {
            return res.status(400).json({ message: `${fieldName} contiene caratteri non validi` })
        }

        req.query[fieldName] = value
        next()
    }
}