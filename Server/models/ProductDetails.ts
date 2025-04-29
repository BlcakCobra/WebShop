import mongoose, { Schema, Document } from "mongoose";

interface IProductDetails extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    description: string;
    images: string[];
    reviews: { user: mongoose.Schema.Types.ObjectId; rating: number; comment: string }[];
    specifications: { [key: string]: string | number };
    subjectSizes: string[];
    subjectColors: string[];
    stock: number;
    relatedProducts: mongoose.Schema.Types.ObjectId[];
    videoReview?: string;
    availableForPreorder: boolean;
}

export const ProductDetailsSchema: Schema<IProductDetails> = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true ,unique:true},
    description: { type: String, required: true },
    images: { type: [String], required: true },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String
    }],
    specifications: { type: Map, of: Schema.Types.Mixed },
    subjectSizes: { type: [String], required: true },
    subjectColors: { type: [String], required: true },
    stock: { type: Number, required: true, default: 0 },
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    videoReview: { type: String },
    availableForPreorder: { type: Boolean, default: false }
});

const ProductDetails = mongoose.model<IProductDetails>("ProductDetails", ProductDetailsSchema);
export default ProductDetails;
