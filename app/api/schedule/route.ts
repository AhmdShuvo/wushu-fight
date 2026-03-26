import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Schedule from '@/models/Schedule';

export async function GET() {
    await dbConnect();
    try {
        const schedule = await Schedule.find().sort({ order: 1 });
        return NextResponse.json({ schedule });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        if (body._id) {
            const item = await Schedule.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json({ message: "Updated successfully", item });
        } else {
            const item = await Schedule.create(body);
            return NextResponse.json({ message: "Created successfully", item });
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
        await Schedule.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
