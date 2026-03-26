import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User, { UserRole } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    await dbConnect();

    try {
        const email = "admin@example.com";
        const password = "adminpassword123";

        // Check if super admin already exists
        const existingUser = await User.findOne({ role: UserRole.SUPER_ADMIN });
        if (existingUser) {
            return NextResponse.json({
                message: "Super Admin already exists",
                email: existingUser.email
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const superAdmin = await User.create({
            name: "Super Admin",
            email: email,
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN
        });

        return NextResponse.json({
            message: "Super Admin seeded successfully",
            credentials: {
                email: email,
                password: password,
                role: UserRole.SUPER_ADMIN
            },
            note: "PLEASE CHANGE YOUR PASSWORD IMMEDIATELY AFTER LOGGING IN"
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
