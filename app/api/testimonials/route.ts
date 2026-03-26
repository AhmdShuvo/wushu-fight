import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function GET() {
    await dbConnect();
    try {
        const testimonials = await Testimonial.find().sort({ order: 1 });
        return NextResponse.json({ testimonials });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        if (body._id) {
            const item = await Testimonial.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json({ message: "Updated successfully", item });
        } else {
            const item = await Testimonial.create(body);
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
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
