import connectDB from "@/lib/db";
import userModel from "@/models/user.model";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET_KEY!


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
})


const createResetEmailTemplate = (resetLink: string, userName: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #666 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎬 LoopCast</h1>
                <h2>Password Reset Request</h2>
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>You requested to reset your password for your LoopCast account. Click the button below to reset your password:</p>
                <div style="text-align: center;">
                    <a href="${resetLink}" class="button">Reset Password</a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 4px;">${resetLink}</p>
                <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
                <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
                <p>Best regards,<br>The LoopCast Team</p>
            </div>
            <div class="footer">
                <p>© 2024 LoopCast. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `
}


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const existing = await userModel.findOne({ email });
        if (!existing) {
            return NextResponse.json({ 
                success: true, 
                message: "If an account with this email exists, a password reset link has been sent." 
            }, { status: 200 });
        }

        const resetToken = jwt.sign(
            { 
                userId: existing._id,
                email: existing.email,
                type: "password-reset"
            }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
        );

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        try {
            await transporter.sendMail({
                from: `"LoopCast" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Reset Your LoopCast Password",
                html: createResetEmailTemplate(resetLink, existing.name || 'there')
            });

            console.log(`Password reset email sent to: ${email}`);
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }

        return NextResponse.json({ 
            success: true, 
            message: "If an account with this email exists, a password reset link has been sent.",
            ...(process.env.NODE_ENV === 'development' && { 
                debug: {
                    resetToken,
                    resetLink,
                    emailSent: true
                }
            })
        }, { status: 200 });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}