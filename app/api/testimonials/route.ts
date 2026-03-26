import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function GET(request: Request) {
    await dbConnect();
    try {
        // Return only approved testimonials for the frontend
        const testimonials = await Testimonial.find({ isApproved: true }).sort({ order: 1 });
        return NextResponse.json({ testimonials });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        // New submissions from users are unapproved by default
        const testimonial = await Testimonial.create({
            ...body,
            isApproved: false // Ensure public posts are not automatically live
        });
        return NextResponse.json({ message: "Thank you! Your testimonial has been submitted for approval.", testimonial });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
