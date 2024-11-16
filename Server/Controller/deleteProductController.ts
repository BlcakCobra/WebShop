import { Request, Response } from "express";
import logger from "../log/logger";
import Product from "../models/products";
import User from "../models/user";

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        res.status(204).send();
    } catch (error: any) {
        logger.error(`Server error during product delete: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
