import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        // Return all testimonials for moderation
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        return NextResponse.json({ testimonials });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
