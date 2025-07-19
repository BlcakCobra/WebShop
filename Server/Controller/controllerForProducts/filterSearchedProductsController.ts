import { Request, Response } from "express";
import logger from "../../log/logger";
import Product from "../../models/products";
import { ServerSearchFilterParams } from "../../types/SearchQuerysType";

interface FilterQuery {
  [key: string]: any;
}

export const filterSearchedProducts = async (req: Request, res: Response) => {
  try {
    
  const {
      page = "1",
      limit = "10",
      sort,
      priceFrom,
      priceTo,
      type,
      sex,
      discount,
      rating,
    }: ServerSearchFilterParams = req.query;


    const pageNum = Math.max(parseInt(page as string, 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit as string, 10), 1), 50);

    const filters: FilterQuery = {};

if (
  (typeof priceFrom === "string" && !isNaN(+priceFrom) && +priceFrom > 0) ||
  (typeof priceTo === "string" && !isNaN(+priceTo) && +priceTo > 0)
) {
  filters.price = {};
  if (typeof priceFrom === "string" && !isNaN(+priceFrom) && +priceFrom > 0) {
    filters.price.$gte = +priceFrom;
  }
  if (typeof priceTo === "string" && !isNaN(+priceTo) && +priceTo > 0) {
    filters.price.$lte = +priceTo;
  }
}


    if (type && typeof type === "string" && type.trim() !== "") {
      filters.type = new RegExp(`^${type.trim()}$`, "i");
    }

    if (sex && typeof sex === "string" && sex.trim() !== "") {
      filters.sex = new RegExp(`^${sex.trim()}$`, "i");
    }

    if (rating && !isNaN(+rating)) {
      filters.rating = +rating;
    }

    if (discount === "true") {
      filters.discount = { $gt: 0 };
    }

    const sortOption: FilterQuery = {};
    switch (sort) {
      case "newest":
        sortOption.createdAt = -1;
        break;
      case "oldest":
        sortOption.createdAt = 1;
        break;
      case "price_asc":
        sortOption.price = 1;
        break;
      case "price_desc":
        sortOption.price = -1;
        break;
      case "rating_desc":
        sortOption.rating = -1;
        break;
    }


    const total = await Product.countDocuments(filters);

    const products = await Product.find(filters)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.status(200).json({
      products,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalItems: total,
    });
  } catch (error) {
    logger.error("Error filtering products", error);
    res.status(500).json({ message: "Server error" });
  }
};
