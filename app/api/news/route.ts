import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import News from '@/models/News';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        const news = await News.find().sort({ order: 1 });
        return NextResponse.json({ news });
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
        if (body._id) {
            const item = await News.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json({ message: "Updated successfully", item });
        } else {
            const item = await News.create(body);
            return NextResponse.json({ message: "Created successfully", item });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        await News.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
