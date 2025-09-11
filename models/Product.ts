import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document{
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: mongoose.Types.ObjectId;
    brand?: string;
    ratings:{user: mongoose.Types.ObjectId; rating: number; comment: String}[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:Number, required: true},
    stock: {type:Number, default: 0},
    images: [String],
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    brand: String,
    ratings: [
        {
            user: {type: Schema.Types.ObjectId, ref: 'User'},
            rating: {type: Number, min: 1, max: 5},
            comment: String,
        },
    ],
},
{timestamps: true}
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);