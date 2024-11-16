import { Request, Response } from 'express';
import Product from '../models/products';
import logger from '../log/logger';

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error: any) {
        logger.error(`Server error during fetching products: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
