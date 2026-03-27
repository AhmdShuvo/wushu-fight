import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HomeGrid from '@/models/HomeGrid';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const grid = await HomeGrid.findOne();
        console.log("HOME_GRID_API_GET_SUBTITLE:", grid?.history?.subtitle);
        return NextResponse.json({ grid });
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
        console.log("HOME_GRID_API_POST_SUBTITLE:", body?.history?.subtitle);
        
        const grid = await HomeGrid.findOneAndUpdate(
            {}, 
            body, 
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        return NextResponse.json({ message: "Home grid content updated successfully", grid });
    } catch (error: any) {
        console.error("HOME GRID POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
