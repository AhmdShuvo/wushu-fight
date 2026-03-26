import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CTA from '@/models/CTA';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const cta = await CTA.findOne();
        return NextResponse.json({ cta });
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
        const cta = await CTA.findOneAndUpdate({}, body, { new: true, upsert: true });
        return NextResponse.json({ message: "Updated successfully", cta });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
