import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document{
    user: mongoose.Types.ObjectId;
    items: {
        product: mongoose.Types.ObjectId,
        quantity: number;
    }[];
    updatedAt: Date;
}

const CartSchema = new Schema<ICart>({
    user: {type: Schema.Types.ObjectId, ref: 'User' , required: true},
    items: [
        {
            product: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, required: true},
        },
    ],
},
{timestamps: true}
);

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);