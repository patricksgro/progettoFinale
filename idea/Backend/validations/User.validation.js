import Joi from "joi";


export const createUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(200)
        .trim()
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/)
        .required()
        .messages({
            "string.base": "Il nome deve essere una stringa",
            "string.empty": "Il nome è obbligatorio",
            "any.required": "Il nome è obbligatorio",
            "string.min": "Il nome deve avere almeno 2 caratteri",
            "string.max": "Il nome non può superare i 200 caratteri",
            "string.pattern.base": "Il nome contiene caratteri non validi"
        }),
    surname: Joi.string()
        .min(2)
        .max(200)
        .trim()
        .allow(null)
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/)
        .messages({
            "string.base": "Il cognome deve essere una stringa",
            "string.min": "Il cognome deve avere almeno 2 caratteri",
            "string.max": "Il cognome non può superare i 200 caratteri",
            "string.pattern.base": "Il cognome contiene caratteri non validi"
        }),
    dateOfBirth: Joi.date()
        .less('now')
        .greater('1920-01-01')   // da rivedere il formato, 12 lo prende ancora
        .messages({
            "date.base": "La data di nascita deve essere una data valida",
            "date.less": "La data di nascita non può essere futura",
            "date.greater": "La data di nascita non può essere precedente al 1920",
            "any.required": "La data di nascita è obbligatoria"
        }),
    bio: Joi.string()
        .allow(null)    // permette esplicitamente null
        .optional()     // campo facoltativo, può anche mancare
        .messages({
            "string.base": "La bio deve essere una stringa"
        }),
    avatar: Joi.string()
        .uri()
        .pattern(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
        .messages({
            "string.uri": "L'avatar deve essere un URL valido",
            "string.pattern.base": "L'avatar deve avere un'estensione immagine valida"
        }),
    email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,7}$/)
        .lowercase()
        .messages({
            "string.email": "Email non valida",
            "string.empty": "L'email è obbligatoria",
            "any.required": "L\'email è obbligatoria",
            "string.pattern.base": "L'email deve avere un dominio valido (es. .com, .it, max 7 caratteri)."
        }),
    password: Joi.string()
        .min(8)
        .message({
            "string.min": "La password deve avere almeno 8 caratteri",
        }),
    otp: Joi.string().length(6).required()
})


export const updateUserSchema = Joi.object({
    name: createUserSchema.extract("name").optional(),
    surname: createUserSchema.extract("surname").optional(),
    email: createUserSchema.extract("email").optional(),
    dateOfBirth: createUserSchema.extract("dateOfBirth").optional(),
    avatar: createUserSchema.extract("avatar").optional(),
    bio: createUserSchema.extract("bio").optional()
    //da vedere la password perche puo e deve poter essere modificata
});