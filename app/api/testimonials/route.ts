import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { logActivity } from '@/lib/activity';

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

function sanitize(str: string) {
    if (typeof str !== 'string') return '';
    return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { name, role, text, image, rating } = body;

        // Malicious input validation & Sanitization
        const sanitizedName = sanitize(name);
        const sanitizedRole = sanitize(role);
        const sanitizedText = sanitize(text);
        const sanitizedImage = sanitize(image);
        const validatedRating = Math.min(Math.max(Number(rating) || 5, 1), 5); // Ensure 1-5

        if (!sanitizedName || !sanitizedText) {
            return NextResponse.json({ error: "Name and testimonial text are required" }, { status: 400 });
        }

        // Strict field mapping to prevent injection
        const testimonial = await Testimonial.create({
            name: sanitizedName,
            role: sanitizedRole || 'Member',
            text: sanitizedText,
            image: sanitizedImage || '/images/default-user.jpg',
            rating: validatedRating,
            isApproved: false, // Super protection: always unapproved from public route
            order: 0
        });

        // LOG ACTIVITY
        await logActivity("SUBMITTED_TESTIMONIAL", request, { name: sanitizedName, id: testimonial._id });

        return NextResponse.json({ 
            message: "Thank you! Your testimonial has been submitted for approval.", 
            testimonial: {
                _id: testimonial._id,
                name: testimonial.name,
                isApproved: testimonial.isApproved
            } 
        });
    } catch (error: any) {
        console.error("TESTIMONIAL SUBMISSION ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
