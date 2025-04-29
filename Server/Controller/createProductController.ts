import { NextFunction, Request, Response } from "express";
import logger from "../log/logger";
import Product from "../models/products";
import { productValidationSchema } from "../validation/productValidations";
import mongoose from "mongoose";

export const createProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, sex, type, image, color, size, price, discount, rating, views } = req.body;

    try {
        const { error } = productValidationSchema.validate(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`);
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const product = new Product({ name, sex, type, image, color, size, price, discount, rating, views });

        const savedProduct = await product.save();

        const { _id, ...rest } = savedProduct.toObject();
        res.status(201).json({ id: _id, ...rest });

        logger.info(`Product "${name}" created successfully`);
    } catch (error: unknown) {
        if (error instanceof mongoose.Error && "code" in error && error.code === 11000) {
            logger.warn(`Duplicate product name detected in DB: ${name}`);
            res.status(400).json({ message: "Продукт с таким именем уже существует" });
            return;
        }

        if (error instanceof Error) {
            logger.error(`Server error during product creation: ${error.message}`);
            res.status(500).json({ message: "Server error" });
        } else {
            logger.error("Unknown server error during product creation");
            res.status(500).json({ message: "Unknown server error" });
        }
    }
};
