import { Request, Response } from "express";
import logger from "../log/logger";
import Product from "../models/products";

export const updateProductController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 
    const updatedData = req.body; 
    
    try {
      const product = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
      if (!product) {
        logger.warn(`Product with ID ${id} not found.`);
        res.status(404).json({ message: "Product not found" });
        return;
      }
      logger.info(`Product with ID ${id} successfully updated.`);
      res.status(200).json(product);
    } catch (error: any) {
      logger.error(`Error updating product: ${error.message}`);
      res.status(500).json({ message: "Server error" });
    }
  };
  