import { Request, Response } from "express";
import logger from "../log/logger";
import ProductDetails from "../models/ProductDetails";
import { productDetailsValidationSchema } from "../validation/productDetailsValidations";
import mongoose from "mongoose";

export const createProductDetailsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description, subjectSizes, subjectColors, stock, videoReview, availableForPreorder, productId } = req.body;
        const files = req.files as Express.Multer.File[];

        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({ message: "Неверный формат productId" });
            logger.warn("Product ID not valid");
            return;
        }

        const existingDetails = await ProductDetails.findOne({ productId });
        if (existingDetails) {
            res.status(400).json({ message: "Детали для этого продукта уже существуют" });
            logger.warn("Details already created");
            return;
        }

        const imageUrls = files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);

        const { error } = productDetailsValidationSchema.validate({
            ...req.body,
            images: imageUrls
        }, { abortEarly: false });

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
            description,
            images: imageUrls,
            subjectSizes,
            subjectColors,
            stock,
            videoReview,
            availableForPreorder
        });

        const savedProductDetails = await newProductDetails.save();

        res.status(201).json({
            id: savedProductDetails._id,
            ...savedProductDetails.toObject()
        });

        logger.info(`Product "${productId}" created successfully`);
    } catch (error: unknown) {
        logger.error(error instanceof Error ? error.message : "Unknown server error");
        res.status(500).json({ message: "Internal server error" });
    }
};
