import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: [
      {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);