import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function GET() {
    await dbConnect();

    const initialTestimonials = [
        {
            name: "Sarah Jenkins",
            role: "Wushu Student",
            text: "Wushu Federation has completely changed my perspective on fitness and discipline. The masters are incredibly knowledgeable and supportive.",
            image: "client-1.png",
            rating: 5,
            order: 1
        },
        {
            name: "Mike Ross",
            role: "Sanda Practitioner",
            text: "Learning Sanda here has balance and strength I never knew I had. Highly recommend this Federation to everyone.",
            image: "client-2.png",
            rating: 5,
            order: 2
        },
    ];

    try {
        await Testimonial.deleteMany({});
        await Testimonial.insertMany(initialTestimonials);
        return NextResponse.json({ message: "Testimonials seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding testimonials", error: error.message }, { status: 500 });
    }
}
