import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
    sex: string;
    type: string;
    image: string;
    color: string;
    description: string;
    size: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;
    discount: number;
    rating: number;
    views:number
}

 const ProductSchema: Schema<IProduct> = new Schema({
    sex: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
