import { Request, Response } from "express";
import Product from "../models/products";
import logger from "../log/logger";

export const ProductsWithSpecificType = async (req: Request, res: Response): Promise<void> => {
    if (!req.params || !req.params.type) {
        res.status(400).json({ message: "Не указан тип продукта" });
        return;
    }

    const { type } = req.params;

    try {
        const products = await Product.find({ type });

        if (!products.length) {
            res.status(404).json({ message: "Товары не найдены" });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        logger.error(error instanceof Error ? error.message : "Неизвестная ошибка");
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
