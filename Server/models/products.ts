import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
    name:string;
    sex: string;
    type: string;
    image: string;
    color: string;
    size: string;
    price: number;
    // stock: number;
    // createdAt: Date;
    discount: number;
    rating: number;
    views:number
}
 const ProductSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    sex: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    // stock: { type: Number, required: true, default: 0 },
    // createdAt: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    views: { type: Number, default: 0, min: 0}, 
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;