import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}: {params: {id: string}}){
    try {
        await connectToDatabase()
        const body = req.json()
        const updated = await Category.findByIdAndUpdate(params.id, body, {new: true});
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}

export async function Delete(req: NextRequest, {params}: {params: {id: string}}){
    try {
        await connectToDatabase()
        await Category.findByIdAndDelete(params.id)
        return NextResponse.json({message: "Deleted successfully"})
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}