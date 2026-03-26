import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CalendarEvent from '@/models/CalendarEvent';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const events = await CalendarEvent.find().sort({ order: 1 });
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
        
        // Ensure ID is handled correctly
        if (body._id === "") {
            delete body._id;
        }

        const event = await CalendarEvent.create(body);
        return NextResponse.json({ message: "Created successfully", event });
    } catch (error: any) {
        console.error("CALENDAR POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
