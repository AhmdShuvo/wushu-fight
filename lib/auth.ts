import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { UserRole } from "@/models/User";

export async function getAuthSession() {
    return await getServerSession(authOptions);
}

export async function isAdmin() {
    const session = await getAuthSession();
    if (!session || !session.user) return false;
    return session.user.role === UserRole.ADMIN || session.user.role === UserRole.SUPER_ADMIN;
}

export async function isSuperAdmin() {
    const session = await getAuthSession();
    if (!session || !session.user) return false;
    return session.user.role === UserRole.SUPER_ADMIN;
}

export async function adminProtectedRoute() {
    if (!await isAdmin()) {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }
    return null;
}

export async function superAdminProtectedRoute() {
    if (!await isSuperAdmin()) {
        return NextResponse.json({ error: "Forbidden: Super Admin access required" }, { status: 403 });
    }
    return null;
}
