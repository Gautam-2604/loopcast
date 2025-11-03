import connectDB from "@/lib/db";
import bcrypt from "bcrypt"
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const existing = await userModel.findOne({ email });
        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hash(password, salt)

        const user = await userModel.create({ email, passwordHash: hashedPassword });
        return NextResponse.json(
            { message: "User created", user: { id: user._id, email: user.email } },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}