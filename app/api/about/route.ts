import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import About from '@/models/About';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const about = await About.findOne();
        return NextResponse.json({ about });
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
        const about = await About.findOneAndUpdate({}, body, { new: true, upsert: true });
        return NextResponse.json({ message: "Updated successfully", about });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
