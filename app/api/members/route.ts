import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/models/Member';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    try {
        const query = category ? { category } : {};
        const members = await Member.find(query).sort({ order: 1 });
        return NextResponse.json({ members });
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
        const member = await Member.create(body);
        return NextResponse.json({ message: "Created successfully", member });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
