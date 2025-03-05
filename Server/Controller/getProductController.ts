import { Request, Response } from 'express';
import Product from '../models/products';
import logger from '../log/logger';

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()

        res.status(200).json(products);
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(`Server error during fetching products: ${error.message}`);
            res.status(500).json({ message: 'Server error' });
        } else {
            logger.error('Unknown server error during fetching products');
            res.status(500).json({ message: 'Unknown server error' });
        }
    }
};
