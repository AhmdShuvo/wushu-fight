import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import PageContent from '../../../../models/PageContent';
import { adminProtectedRoute } from '../../../../lib/auth';

// Admin PATCH
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { slug } = await params;
    await dbConnect();
    try {
        const body = await request.json();
        const updated = await PageContent.findOneAndUpdate({ slug }, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Page not found" }, { status: 404 });
        return NextResponse.json({ message: "Page updated successfully", page: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// Admin DELETE
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { slug } = await params;
    await dbConnect();
    try {
        const deleted = await PageContent.findOneAndDelete({ slug });
        if (!deleted) return NextResponse.json({ error: "Page not found" }, { status: 404 });
        return NextResponse.json({ message: "Page deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
