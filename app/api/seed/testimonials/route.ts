import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

const initialTestimonials = [
    {
        name: "Randall Schwartz",
        role: "Women's Trainer",
        text: "The Bangladesh Wushu Federation has provided an incredible platform for female athletes. The discipline and support here are world-class, making it the best place for martial arts in the country.",
        image: "/assets/images/client/client-1.png",
        rating: 5,
        order: 1,
        isApproved: true
    },
    {
        name: "Andru Smith",
        role: "Wushu Trainer",
        text: "I have been training here for over a decade. The transition from a local club to a national federation has been inspiring. We produce champions who not only excel in technique but also in character.",
        image: "/assets/images/client/client-2.png",
        rating: 5,
        order: 2,
        isApproved: true
    },
    {
        name: "Kamal Hossain",
        role: "Athlete",
        text: "BWUF is the pride of Bangladesh. The facilities and the coaching staff are dedicated to pushing our limits. Winning gold for the country was only possible because of the foundation laid by this federation.",
        image: "/assets/images/client/client-1.png",
        rating: 4,
        order: 3,
        isApproved: true
    }
];

export async function GET() {
    await dbConnect();
    try {
        await Testimonial.deleteMany({});
        await Testimonial.insertMany(initialTestimonials);
        return NextResponse.json({ message: "Testimonials seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
