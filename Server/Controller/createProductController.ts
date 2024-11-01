import { Request, Response } from "express";
import logger from "../log/logger";
import Product from "../models/products";
import { productValidationSchema } from "../validation/productValidations";

export const createProductController = async (req: Request, res: Response) => {
    const { sex, type, image, color, description, size, price, stock, category, createdAt, discount, rating } = req.body;
    const product = new Product({ sex, type, image, color, description, size, price, stock, category, createdAt, discount, rating });
    
    try {
        const { error } = productValidationSchema.validate(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`);
            res.status(400).json({ message: error.details[0].message });
            return;
        } 
        await product.save();
        res.status(201).json(product);
    } catch (error: any) {
        logger.error(`Server error during product creation: ${error.message}`); 
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
