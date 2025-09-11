import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document{
    user: mongoose.Types.ObjectId;
    items: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    total: number;
    status: 'pending'| 'paid' | 'shipped' | 'delivered' | 'cancelled';
    paymentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            product: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
        },
    ],
    total: {type: Number, required: true},
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped' , 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentId: String,
},
{timestamps: true}
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);