import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category') || 'all';
    const skip = (page - 1) * limit;

    try {
        const query = category !== 'all' ? { category } : {};
        const [items, total] = await Promise.all([
            Gallery.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Gallery.countDocuments(query)
        ]);

        return NextResponse.json({
            items,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
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
        // Handle bulk upload (array of items) or single item
        if (Array.isArray(body)) {
            const items = await Gallery.insertMany(body);
            return NextResponse.json({ message: "Gallery items added", items });
        } else {
            const item = await Gallery.create(body);
            return NextResponse.json({ message: "Gallery item added", item });
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
        if (!id) throw new Error("ID required");
        await Gallery.findByIdAndDelete(id);
        return NextResponse.json({ message: "Item deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
