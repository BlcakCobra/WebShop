import Joi from "joi";

export const productDetailsValidationSchema = Joi.object({
    description: Joi.string().required().min(15).max(200).pattern(/^[a-zA-Z0-9 _-]+$/),
    images: Joi.array().items(Joi.string().uri()).required().min(1).max(5), 
    reviews: Joi.array().items(
        Joi.object({
            user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
            rating: Joi.number().min(1).max(5).required(),
            comment: Joi.string().max(500).allow(""),
        })
    ),
    specifications: Joi.object().pattern(
        Joi.string(),
        Joi.alternatives().try(Joi.string(), Joi.number()) 
    ),
    subjectSizes: Joi.array()
        .items(Joi.string().valid("S", "M", "L", "XL", "XXL"))
        .required()
        .min(1),
    subjectColors: Joi.array().items(Joi.string()).required().min(1),
    stock: Joi.number().required().min(0),
    relatedProducts: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    videoReview: Joi.string().uri().optional(),
    availableForPreorder: Joi.boolean().default(false),
});
