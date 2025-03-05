import mongoose, { Schema, Document } from "mongoose";

interface IProductDetails extends Document {
    productId: mongoose.Schema.Types.ObjectId; 
    description: string; 
    images: string[]; 
    reviews: { user: string; rating: number; comment: string }[]; 
    specifications: { [key: string]: string | number };
}

const ProductDetailsSchema: Schema<IProductDetails> = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    reviews: [{ user: String, rating: { type: Number, min: 1, max: 5 }, comment: String }],
    specifications: { type: Map, of: Schema.Types.Mixed }
});

const ProductDetails = mongoose.model<IProductDetails>("ProductDetails", ProductDetailsSchema);

export default ProductDetails;
