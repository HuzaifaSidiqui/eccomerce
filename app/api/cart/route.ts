import { requireAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/models/Cart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const session = await requireAuth();
    const cart = await Cart.findOne({ user: session.user.id }).populate(
      "items.product"
    );
    return NextResponse.json(cart || { items: [] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();
    if (!productId || quantity) {
      return NextResponse.json({ message: "The cart is empty" });
    }
    await connectToDatabase();
    const session = await requireAuth();
    let cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      cart = new Cart({ user: session.user.id, items: [] });
    }
    const existingItems = cart.items.find(
      (i: { product: mongoose.Types.ObjectId }) =>
        i.product.toString() === productId
    );
    if(existingItems){
        existingItems.quantity += quantity
    }else{
        cart.items.push({product: productId, quantity})
    }
    await cart.save()
    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
