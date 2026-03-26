import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import PageContent from '../../../models/PageContent';
import { adminProtectedRoute } from '../../../lib/auth';

// Public GET
export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    try {
        if (slug) {
            const page = await PageContent.findOne({ slug });
            return NextResponse.json({ page });
        }
        const pages = await PageContent.find({}).sort({ title: 1 });
        return NextResponse.json({ pages });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Admin POST (Create)
export async function POST(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        const body = await request.json();
        const page = await PageContent.create(body);
        return NextResponse.json({ message: "Page created successfully", page });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
