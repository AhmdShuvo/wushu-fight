import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TournamentEvent from '@/models/TournamentEvent';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    try {
        const query = type ? { type } : {};
        const events = await TournamentEvent.find(query).sort({ order: 1 });
        return NextResponse.json({ events });
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
        if (body._id === "") delete body._id;
        const event = await TournamentEvent.create(body);
        return NextResponse.json({ message: "Created successfully", event });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
