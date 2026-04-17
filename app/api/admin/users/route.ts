import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { adminProtectedRoute } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        const body = await request.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Don't return password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return NextResponse.json({ user: userResponse }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
