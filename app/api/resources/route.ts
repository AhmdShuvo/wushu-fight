import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Resource from '../../../models/Resource';
import { adminProtectedRoute } from '../../../lib/auth';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    try {
        if (slug) {
            const resource = await Resource.findOne({ slug });
            return NextResponse.json({ resource });
        }
        const resources = await Resource.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ resources });
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
        const resource = await Resource.create(body);
        return NextResponse.json({ message: "Resource created successfully", resource });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
