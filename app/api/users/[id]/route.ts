import { requireAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}: {params: {id:string}}){
    try {
        await connectToDatabase()
        const session = await requireAuth()
        if(session.user.id !== params.id){
            return NextResponse.json(
                {error: "Forbidden"},
                {status: 401}
            )
        }
        const user = User.findById(params.id).select("password")
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}


export async function PUT(req: NextRequest,{params}: {params: {id:string}}){
    try {
        await connectToDatabase()
        const session = await requireAuth()
        if(session.user.id !== params.id){
            return NextResponse.json(
                {error: "Forbidden"},
                {status: 401}
            )
        }
        const body = await req.json()
        const updated = await User.findByIdAndUpdate(params.id, body,{new:true}).select("password")
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}

export async function DELETE(req: NextRequest,{params}: {params: {id:string}}){
    try {
        await connectToDatabase()
        const session = await requireAuth()
        if(session.user.id !== params.id){
            return NextResponse.json(
                {error: "Forbidden"},
                {status: 401}
            )
        }
       await User.findByIdAndDelete(params.id)
        return NextResponse.json({message: "User deleted successfully"})
    } catch (error) {
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}
