import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Media from '../../../models/Media';
import { adminProtectedRoute } from '../../../lib/auth';
import { logActivity } from '../../../lib/activity';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        
        let query = {};
        if (type && type !== 'all') {
            query = { type };
        }

        const media = await Media.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ media });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

        await Media.findByIdAndDelete(id);
        
        // LOG ACTIVITY
        await logActivity("DELETED_MEDIA", request, { id });

        return NextResponse.json({ message: "Media deleted" });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
