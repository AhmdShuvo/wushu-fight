import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ticker from '@/models/Ticker';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const ticker = await Ticker.findOne().sort({ createdAt: -1 });
        return NextResponse.json({ ticker });
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
        
        // Use findOneAndUpdate to keep only one record or upsert.
        // We target by an arbitrary ID or just the first found.
        const ticker = await Ticker.findOneAndUpdate(
            {}, 
            body, 
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        return NextResponse.json({ message: "Ticker updated successfully", ticker });
    } catch (error: any) {
        console.error("TICKER POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
