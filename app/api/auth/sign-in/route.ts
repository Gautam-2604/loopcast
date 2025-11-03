import connectDB from "@/lib/db";
import bcrypt from "bcrypt"
import userModel from "@/models/user.model";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET_KEY!


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const existing = await userModel.findOne({ email });
        if (!existing) {
            return NextResponse.json({ error: "Please sign up first" }, { status: 401 });
        }
        
        const checkPassword = await bcrypt.compare(password, existing.passwordHash);
        if (!checkPassword) {
            return NextResponse.json({ error: "Wrong Password" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: existing._id,
                email: existing.email 
            }, 
            JWT_SECRET, 
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({ 
            success: true, 
            message: "Sign in successful",
            user: {
                id: existing._id,
                email: existing.email,
                name: existing.name
            }
        }, { status: 200 });

        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        return response;
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}