import { requireAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await connectToDatabase()
        const products = await Product.find({});
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}

export async function POST(req: NextRequest){
    try {
        const {name, description, price,stock} = await req.json()
        if(!name || !description || !price || !stock){
            return NextResponse.json(
                {message: "All fields are required"},
                {status: 400}
            )
        }
        await connectToDatabase()
        const session = await requireAuth()

        const product = await Product.create({
            name,
            description,
            price,
            stock,
        })
        return NextResponse.json(
            product,
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}