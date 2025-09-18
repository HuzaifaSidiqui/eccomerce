import { requireAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET({params}: {params: {id: string}}){
    try {
        await connectToDatabase()
        const product = await Product.findById(params.id)
        if(!product){
            return NextResponse.json(
                {message: "No product found"},
                {status: 401}
            )
        }
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
                {error: error},
                {status: 500}
            )
    }
}

export async function PUT(req: NextRequest ,{params}: {params: {id: string}}){
    try {
        await connectToDatabase()
        
        const product = await Product.findById(params.id)
        if(!product){
            return NextResponse.json(
                {message: "No product found"},
                {status: 401}
            )
        }

        const body = await req.json();
        Object.assign(product, body)
        await product.save()
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
                {error: error},
                {status: 500}
            )
    }
}

export async function DELETE(req: NextRequest ,{params}: {params: {id: string}}){
    try {
        await connectToDatabase()
        
        const product = await Product.findById(params.id)
        if(!product){
            return NextResponse.json(
                {message: "No product found"},
                {status: 401}
            )
        }

        await product.deleteOne()
        return NextResponse.json({message: "Product deleted successfully"})
    } catch (error) {
        return NextResponse.json(
                {error: error},
                {status: 500}
            )
    }
}