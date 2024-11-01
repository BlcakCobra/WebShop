import Joi from "joi";

export const productValidationSchema = Joi.object({
    sex: Joi.string()
        .valid("male", "female", "unisex")
        .required(),

    type: Joi.string()
        .required()
        .min(3)
        .max(50),

    image: Joi.string()
        .uri()
        .required(),

    color: Joi.string()
        .required()
        .min(3)
        .max(30),

    description: Joi.string()
        .required()
        .min(10)
        .max(150),

    size: Joi.string()
        .required()
        .valid("S", "M", "L", "XL", "XXL"),

    price: Joi.number()
        .required()
        .min(0)
        .max(999999),

    stock: Joi.number()
        .required()
        .min(0),

    category: Joi.string()
        .required()
        .min(3)
        .max(50),

    createdAt: Joi.date()
        .default(() => new Date()),

    discount: Joi.number()
        .min(0)
        .max(100),

    rating: Joi.number()
        .min(0)
        .max(5)
        .default(0),
});
