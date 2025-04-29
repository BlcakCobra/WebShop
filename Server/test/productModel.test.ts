import Product from "../models/products";
import connectDB from "../db";
import { closeDB } from "../db";
import mongoose from "mongoose";

describe("Product Model", () => {
  beforeAll(async () => {
    await connectDB();
  });
  beforeEach(async () => {
    await Product.deleteMany({});
  });
  afterAll(async () => {
    await closeDB();
  });

  it("should create a valid product", async () => {
    const product = new Product({
      name: "AIR",
      sex: "Man",
      type: "t-shirts",
      image: "https://example.com/image.jpg",
      color: "#000000",
      size: "M",
      price: 29.99,
      discount: 10,
      rating: 4.5,
      views: 100,
    });
    const savedProduct = await product.save();
    expect(savedProduct._id).toBeDefined();
  });

  it("should not create a product with invalid price", async () => {
    const product = new Product({
      name: "ASD",
      sex: "Man",
      type: "t-shirts",
      image: "https://example.com/image.jpg",
      color: "#000000",
      size: "M",
      price: -5,
      discount: 10,
      rating: 4.5,
      views: 100,
    });
    await expect(product.save()).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it("should not create a product with invalid color format", async () => {
    const product = new Product({
      name: "FASFFAS",
      sex: "Man",
      type: "t-shirts",
      image: "https://example.com/image.jpg",
      color: "invalidColor",
      size: "M",
      price: 29.99,
      discount: 10,
      rating: 4.5,
      views: 100,
    });
    await expect(product.save()).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it("should not create a product with invalid sex value", async () => {
    const product = new Product({
      name: "GASFDAFSAF",
      sex: "Alien",
      type: "t-shirts",
      image: "https://example.com/image.jpg",
      color: "#000000",
      size: "M",
      price: 29.99,
      discount: 10,
      rating: 4.5,
      views: 100,
    });
    await expect(product.save()).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it("should set default values for rating and views", async () => {
    const product = new Product({
      name: "CASFAFSA",
      sex: "Man",
      type: "t-shirts",
      image: "https://example.com/image.jpg",
      color: "#000000",
      size: "M",
      price: 29.99,
      discount: 10,
    });
    const savedProduct = await product.save();
    expect(savedProduct.rating).toBe(0);
    expect(savedProduct.views).toBe(0);
  });

  it("should enforce unique names", async () => {
    const product1 = new Product({ name: "TestProduct", sex: "Man", type: "t-shirts", image: "https://example.com/image.jpg", color: "#000000", size: "M", price: 29.99, discount: 10, rating: 4.5, views: 100 });
    await product1.save();

    const product2 = new Product({ name: "TestProduct", sex: "Man", type: "t-shirts", image: "https://example.com/image.jpg", color: "#000000", size: "M", price: 29.99, discount: 10, rating: 4.5, views: 100 });

    await expect(product2.save()).rejects.toThrowError(/duplicate key error/);

  });
});
