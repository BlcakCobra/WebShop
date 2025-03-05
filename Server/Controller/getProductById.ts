import { Request, Response } from "express";
import Product from "../models/products";
import logger from "../log/logger";

export const getProductById = async (req: Request, res: Response): Promise<void>  => {
    const { id } = req.params;

    if (!id) {
        logger.error("Product ID not provided");
        res.status(400).json({ message: "Product ID is required" });
        return 
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            logger.warn(`Product with ID ${id} not found`);
          res.status(404).json({ message: "Product not found" });
          return 
        }

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Error fetching product: ${error.message}`);
            res.status(500).json({ message: "Internal server error" });
        } else {
            logger.error("Unknown error fetching product");
            res.status(500).json({ message: "Unknown error" });
        }
    }
};
