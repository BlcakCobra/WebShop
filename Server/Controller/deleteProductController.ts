import { Request, Response } from "express";
import logger from "../log/logger";
import Product from "../models/products";

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found for delete" });
            return
        }
        res.status(204).send();
        logger.info(`Product ${id} removal was successful`)
    } catch (error: any) {
        logger.error(`Server error during product delete: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
