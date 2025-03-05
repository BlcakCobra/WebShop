import { NextFunction, Request, Response } from "express";
import logger from "../log/logger";
import Product from "../models/products";
import { productValidationSchema } from "../validation/productValidations";

export const createProductDetailsController = async (req:Request,res:Response) =>{

    const {productId, description, images, reviews, specs} = req.params    

    const existingDetails = await ProductDetails.findOne({ productId });
    if (existingDetails) {
        return res.status(400).json({ message: "Детали для этого продукта уже существуют" });
    }

    const newDetails = new ProductDetails({
        productId,
        defaultProduct,
        description,
        images,
        reviews,
        specs
    });

    await newDetails.save();
    try {
    
    } catch (error) {
        
    }
}