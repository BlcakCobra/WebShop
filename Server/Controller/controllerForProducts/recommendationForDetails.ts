import { Request, Response } from "express";
import logger from "../../log/logger";
import Product from "../../models/products";

const extractKeywords = (name: string): string[] => {
  return name
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2); 
};

export const recommendationForDetails = async (req: Request, res: Response) => {
  const { productId } = req.query;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      logger.warn("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    const keywords = extractKeywords(product.name);

    const minPrice = product.price * 0.8;
    const maxPrice = product.price * 1.2;

    const similarProducts = await Product.find({
      _id: { $ne: product._id }, 
      type: product.type,
      sex: product.sex,
      price: { $gte: minPrice, $lte: maxPrice },
      $or: keywords.map(word => ({
        name: { $regex: word, $options: "i" }, 
      })),
    })
      .sort({ rating: -1, views: -1 }) 
      .limit(10); 

    res.status(200).json(similarProducts);
  } catch (error) {
    logger.error("Error recommending products", error);
    res.status(500).json({ message: "Server error" });
  }
};
