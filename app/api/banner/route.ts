import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const banners = await Banner.find().sort({ order: 1 });
        return NextResponse.json({ banners });
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

        // Remove empty _id from frontend formData so MongoDB generates a fresh valid ObjectId natively.
        // Otherwise, passing `_id: ''` crashes BSON's parser.
        if (body._id === "") {
            delete body._id;
        }

        const banner = await Banner.create(body);
        return NextResponse.json({ message: "Created successfully", banner });
    } catch (error: any) {
        console.error("BANNER POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
