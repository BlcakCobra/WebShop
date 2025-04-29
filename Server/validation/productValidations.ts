import Joi from "joi";

const clothingTypes = [
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
];

export const productValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  sex: Joi.string().trim().valid("Man", "Woman", "Other").required(),
  type: Joi.string().trim().valid(...clothingTypes).required(),
  image: Joi.string().trim().uri().required(),
  color: Joi.string().pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).required(),
  size: Joi.string().trim().valid("S", "M", "L", "XL", "XXL").required(),
  price: Joi.number().min(0).max(10000000).required(),
  discount: Joi.number().min(0).max(100).empty("").default(0),
  rating: Joi.number().min(0).max(5).default(0),
  views: Joi.number().min(0).default(0),
});
