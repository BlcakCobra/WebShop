import { Request, Response } from "express";
import logger from "../log/logger";
import ProductDetails from "../models/ProductDetails";
import { productDetailsValidationSchema } from "../validation/productDetailsValidations";
import mongoose from "mongoose";

export const createProductDetailsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description, images, reviews, specifications, subjectSizes, subjectColors, stock, relatedProducts, videoReview, availableForPreorder } = req.body;
        const { productId } = req.params; 

        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({ message: "Неверный формат productId" });
            return;
        }

        const existingDetails = await ProductDetails.findOne({ productId });
        if (existingDetails) {
            res.status(400).json({ message: "Детали для этого продукта уже существуют" });
            return;
        }

        const { error } = productDetailsValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join("."),
                message: detail.message
            }));
            logger.warn(`Validation errors: ${JSON.stringify(errors)}`);
            res.status(400).json({ message: "Validation failed", errors });
            return;
        }

        const newProductDetails = new ProductDetails({
            productId, 
            description, images, reviews, specifications, subjectSizes, subjectColors, stock, relatedProducts, videoReview, availableForPreorder
        });

        const savedProductDetails = await newProductDetails.save();

        res.status(201).json({
            id: savedProductDetails._id,
            ...savedProductDetails.toObject()
        });

        logger.info("Product details created successfully");
    } catch (error: unknown) {
        logger.error(error instanceof Error ? error.message : "Unknown server error");
        res.status(500).json({ message: "Internal server error" });
    }
};
