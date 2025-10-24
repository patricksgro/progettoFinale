export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).json({
                status: 'error',
                message: 'validazione fallita',
                errors: error.details.map((detail) => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            })
        }
        next()
    }
}