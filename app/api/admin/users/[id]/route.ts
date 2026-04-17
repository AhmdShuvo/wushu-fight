import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { adminProtectedRoute, getAuthSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { id } = await params;
    await dbConnect();

    try {
        const body = await request.json();
        const { name, email, password, role } = body;

        const session = await getAuthSession();
        const currentUser = await User.findById(session?.user?.id);

        // Security check: Only SUPER_ADMIN can demote another SUPER_ADMIN or change their own role if they are the only one (better handled in logic)
        // For now, standard Admin can edit users, but we should be careful.

        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: updatedUser });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { id } = await params;
    await dbConnect();

    try {
        const session = await getAuthSession();
        if (session?.user?.id === id) {
            return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
