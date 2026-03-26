import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import News from '@/models/News';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    await dbConnect();
    const { slug } = await params;
    let item;
    try {
        if (slug.match(/^[0-9a-fA-F]{24}$/)) {
            item = await News.findById(slug);
        }
        if (!item) {
            item = await News.findOne({ slug });
        }

        if (!item) {
            return NextResponse.json({ error: "News item not found" }, { status: 404 });
        }
        return NextResponse.json({ news: item });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
