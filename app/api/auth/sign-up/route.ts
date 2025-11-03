import connectDB from "@/lib/db";
import bcrypt from "bcrypt"
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { email, password, name } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const existing = await userModel.findOne({ email });
        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userModel.create({ 
            email, 
            passwordHash: hashedPassword,
            name: name || email.split('@')[0] // Use name or fallback to email prefix
        });
        return NextResponse.json(
            { 
                success: true,
                message: "User created successfully", 
                user: { 
                    id: user._id, 
                    email: user.email, 
                    name: user.name 
                } 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}