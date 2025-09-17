import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "email and password are required" },
        { status: 400 }
      );
    }
    await connectToDatabase();

    const existingUser = await User.findOne(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    }

    User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
