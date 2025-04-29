import { Request, Response } from "express";
import logger from "../../log/logger";
import Product from "../../models/products";

export const filterSearchedProducts = async (req: Request, res: Response) => {
  try {
    const { searchQuery } = req.query;
    const {
      sort,
      priceFrom,
      priceTo,
      type,
      sex,
      discount,
      rating,
    } = req.query;

    const filters: any = {};

    if (searchQuery && typeof searchQuery === 'string') {
      filters.name = { $regex: searchQuery, $options: "i" };
    }

    if (priceFrom || priceTo) {
      filters.price = {};
      if (priceFrom) filters.price.$gte = Number(priceFrom);
      if (priceTo) filters.price.$lte = Number(priceTo);
    }

    if (type) {
      filters.type = type;
    }

    if (sex) {
      filters.sex = sex;
    }

    if (rating) {
      filters.rating = Number(rating);
    }

    if (discount === 'true') {
      filters.discount = { $gt: 0 };
    }

    let sortOption: any = {};

    if (sort === "newest") {
      sortOption.createdAt = -1;
    } else if (sort === "oldest") {
      sortOption.createdAt = 1;
    } else if (sort === "price_asc") {
      sortOption.price = 1;
    } else if (sort === "price_desc") {
      sortOption.price = -1;
    } else if (sort === "rating_desc") {
      sortOption.rating = -1;
    }

    const products = await Product.find(filters).sort(sortOption);

    res.json(products);
  } catch (error) {
    logger.error("Error filtering products", error);
    res.status(500).json({ message: "Server error" });
  }
};
