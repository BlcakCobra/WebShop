import { Request, Response } from "express";
import Product from "../models/products";
import { searchQueryType } from "../types/SearchQuerysType";

export const SearchAnyProductController = async (req: Request, res: Response) => {
    try {
        const { searchQuery, name, sex, type, page = "1", limit = "10" }: searchQueryType = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = Math.min(parseInt(limit, 10), 50); 

        let filter: any = {};

        if (searchQuery) {
            if (searchQuery.length > 2) {
                filter.$text = { $search: searchQuery };
            } else {
                filter.name = new RegExp(searchQuery, "i");
            }
        }

        if (name) filter.name = new RegExp(name, "i");
        if (sex) filter.sex = sex;
        if (type) filter.type = type;

        const products = await Product.find(filter)
            .sort(searchQuery ? { score: { $meta: "textScore" } } : { createdAt: -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .lean();

            const total = await Product.countDocuments(filter);


        res.status(200).json({
            products,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
            totalItems: total,
        });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};
