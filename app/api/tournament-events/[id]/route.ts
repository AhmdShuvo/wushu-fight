import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TournamentEvent from '@/models/TournamentEvent';
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
        const deleted = await TournamentEvent.findByIdAndDelete(id);
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
        const updated = await TournamentEvent.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Updated successfully", event: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await dbConnect();
    try {
        const event = await TournamentEvent.findById(id);
        if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ event });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
