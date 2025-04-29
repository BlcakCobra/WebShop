import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
    name: string;
    sex: "Man" | "Woman" | "Other";
    type: string;
    image: string;
    color: string;
    size: string;
    price: number;
    discount: number;
    rating: number;
    views: number;
}

const ProductSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true},
    sex: { type: String, required: true,enum: ["Man", "Woman","Other"], },
    type: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true,match: /^#([0-9A-F]{3}){1,2}$/i},
    size: { type: String, required: true },
    price: { type: Number, required: true,min:0 },
    discount: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    views: { type: Number, default: 0, min: 0}, 
}, { timestamps: true });

ProductSchema.index({ name: "text"});
ProductSchema.index({ sex: 1, type: 1, price: 1 });
const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
