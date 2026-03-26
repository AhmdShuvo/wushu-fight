import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CalendarEvent from '@/models/CalendarEvent';
import { adminProtectedRoute } from '@/lib/auth';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { id } = await params;
    await dbConnect();
    try {
        const deleted = await CalendarEvent.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
        const updated = await CalendarEvent.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Updated successfully", event: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
