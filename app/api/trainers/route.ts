import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trainer from '@/models/Trainer';

export async function GET() {
    await dbConnect();
    try {
        const trainers = await Trainer.find().sort({ order: 1 });
        return NextResponse.json({ trainers });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        if (body._id) {
            const trainer = await Trainer.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json({ message: "Updated successfully", trainer });
        } else {
            const trainer = await Trainer.create(body);
            return NextResponse.json({ message: "Created successfully", trainer });
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
        await Trainer.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
