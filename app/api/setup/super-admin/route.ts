import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User, { UserRole } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, password, setupKey } = await request.json();

        // Basic security check to prevent public creation
        // The user can specify a SETUP_KEY in .env or we can just check if super admin exists
        if (setupKey !== process.env.NEXTAUTH_SECRET) {
            return NextResponse.json({ error: "Unauthorized setup key" }, { status: 401 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const superAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN
        });

        return NextResponse.json({
            message: "Super Admin created successfully",
            user: { name: superAdmin.name, email: superAdmin.email, role: superAdmin.role }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
