import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await connectToDatabase()
        const categories = await Category.find({})
        return NextResponse.json(
            categories,
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        await connectToDatabase()
        const category = new Category(body)
        await category.save()
        return NextResponse.json(
            category,
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}