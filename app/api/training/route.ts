import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Style from '@/models/Style';

export async function GET() {
    await dbConnect();
    try {
        const styles = await Style.find().sort({ order: 1 });
        return NextResponse.json({ styles });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        if (body._id) {
            const style = await Style.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json({ message: "Updated successfully", style });
        } else {
            const style = await Style.create(body);
            return NextResponse.json({ message: "Created successfully", style });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        await Style.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
