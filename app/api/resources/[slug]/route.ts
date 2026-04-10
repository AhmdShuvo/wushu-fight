import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Resource from '../../../../models/Resource';
import { adminProtectedRoute } from '../../../../lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    await dbConnect();
    const { slug } = await params;

    try {
        const resource = await Resource.findOne({ slug });
        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        return NextResponse.json({ resource });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    const { slug: id } = await params; // Treat param as ID

    try {
        const body = await request.json();
        const resource = await Resource.findByIdAndUpdate(id, body, { new: true });
        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Resource updated successfully', resource });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    const { slug: id } = await params; // Treat param as ID

    try {
        const resource = await Resource.findByIdAndDelete(id);
        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Resource deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
