import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { UserRole } from '@/types/roles';
import bcrypt from 'bcryptjs';

export async function GET() {
    await dbConnect();

    try {
        const email = "admin11@example.com";
        const password = "adminpassword123";

        // Check if admin already exists
        const existingUser = await User.findOne({ role: UserRole.ADMIN });
        if (existingUser) {
            return NextResponse.json({
                message: "Admin already exists",
                email: existingUser.email
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const adminUser = await User.create({
            name: "Admin",
            email: email,
            password: hashedPassword,
            role: UserRole.ADMIN
        });

        return NextResponse.json({
            message: "Admin seeded successfully",
            credentials: {
                email: email,
                password: password,
                role: UserRole.ADMIN
            },
            note: "PLEASE CHANGE YOUR PASSWORD IMMEDIATELY AFTER LOGGING IN"
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
