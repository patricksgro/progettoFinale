import Joi from "joi";

export const CreateCommentSchema = Joi.object({
    text: Joi.string()
        .required()
        .empty('')
        .messages({
            "string.base": "Il commento deve essere una stringa",
            "string.empty": "Il commento non può essere vuoto",
            "any.required": "Il commento è obbligatorio"
        })
})

export const UpdateCommentSchema = Joi.object({
    text: CreateCommentSchema.extract("text"),
})