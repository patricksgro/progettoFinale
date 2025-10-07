import Joi from "joi";


export const createPostSchema = Joi.object({
    cover: Joi.string()
        .uri()
        .trim()
        .required()
        .pattern(/\.(jpg|jpeg|png|gif|webp|svg|mp4|avi|mov|mkv|webm)$/i)
        .messages({
            "string.uri": "La cover deve essere un URL valido",
            "string.pattern.base": "La cover deve avere un'estensione immagine o video valida",
            "string.trim": "La cover non può contenere spazi all\'inizio o alla fine",
            "any.required": "La cover è obbligatoria"
        }),
    description: Joi.string()
        .trim()
        .required()
        .messages({
            "string.base": "La descrizione deve essere una stringa",
            "string.empty": "La descrizione è obbligatoria",
            "any.required": "La descrizione è obbligatoria",
            "string.trim": "La descrizione non può contenere spazi all\'inizio o alla fine",
        }),
    readTime: Joi.object({
        value: Joi.number()
            .min(1)
            .required()
            .messages({
                "number.base": "Il valore di lettura stimata deve essere un numero",
                "number.min": "Il valore di lettura stimata deve essere almeno 1",
                "any.required": "Il valore di lettura stimata è obbligatorio"
            }),
        unit: Joi.string()
            .valid("min", "hour")
            .trim()
            .required()
            .messages({
                "any.only": "L'unità di readTime deve essere una tra: min, hour",
                "string.base": "L'unità di readTime deve essere una stringa",
                "any.required": "L'unità di readTime è obbligatoria",
                "string.trim": "L'unità di readTime non può contenere spazi all\'inizio o alla fine"
            })
    }).required()
        .messages({
            "string.empty": "Il campo readTime è obbligatorio",
            "any.required": "Il campo readTime è obbligatorio"
        }),
    author: Joi.string()
})


export const updatePostSchema = Joi.object({
    description: createPostSchema.extract("description").optional(),
    readTime: createPostSchema.extract("readTime").optional(),
    cover: createPostSchema.extract("cover").optional()
})