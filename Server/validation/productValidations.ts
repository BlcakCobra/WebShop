import Joi from "joi";

const clothingTypes =[
  "t-shirts", "blouses", "shirts", "hoodies", "sweatshirts", "tank tops",
  "jeans", "shorts", "trousers", "pants", "skirts", "leggings",
  "casual dresses", "cocktail dresses", "maxi dresses", "mini dresses", "formal gowns",
  "coats", "jackets", "blazers", "parkas", "vests",
  "bras", "panties", "boxers", "briefs", "lingerie",
  "sneakers", "boots", "sandals", "heels", "flats",
  "hats", "scarves", "belts", "gloves", "bags",
  "sports bras", "yoga pants", "tracksuits", "athletic shorts",
  "pajamas", "nightgowns", "robes",
  "bikinis", "swimsuits", "swim trunks"
]

export const productValidationSchema = Joi.object({
  name:Joi.string().required(),
  sex: Joi.string().valid("Man", "Woman", "Other").required(),
  type: Joi.string().valid(...clothingTypes).required(),
  image: Joi.string().uri().required(),
  color: Joi.string().pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).required(),
  size: Joi.string().required().valid("S", "M", "L", "XL", "XXL"),
  price: Joi.number().min(0).required(),
  discount: Joi.number().min(0).max(100).allow(""),
  rating: Joi.number().min(0).max(5).default(0),
  views: Joi.number().min(0).default(0),
});