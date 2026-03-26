import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/models/Member';

const initialMembers = [
    // Founding Members
    {
        name: 'Founder Name 1',
        role: 'Chief Founder',
        desc: 'Instrumental in drafting the initial federation constitution and securing NSC recognition.',
        category: 'founding',
        image: '/assets/images/trainer/trainer-1.png',
        order: 1
    },
    {
        name: 'Founder Name 2',
        role: 'Co-Founder & Technical Lead',
        desc: 'Introduced standard international Taolu training methodologies to the country.',
        category: 'founding',
        image: '/assets/images/trainer/trainer-2.png',
        order: 2
    },
    {
        name: 'Founder Name 3',
        role: 'Co-Founder & Administrator',
        desc: 'Established the first district-level Wushu associations to ensure nationwide reach.',
        category: 'founding',
        image: '/assets/images/trainer/trainer-3.png',
        order: 3
    },
    // Executive Committee
    {
        name: 'Dr. Abdus Sobhan Golap',
        role: 'President',
        desc: 'Leading the federation\'s strategic vision and international relations.',
        category: 'executive',
        image: '/assets/images/trainer/trainer-1.png',
        order: 1
    },
    {
        name: 'Md. Dulal Hossain',
        role: 'General Secretary',
        desc: 'Managing day-to-day operations and coordinating national events.',
        category: 'executive',
        image: '/assets/images/trainer/trainer-2.png',
        order: 2
    },
    {
        name: 'V.P. Name Here',
        role: 'Vice President',
        desc: 'Overseeing financial planning and sponsorships.',
        category: 'executive',
        image: '/assets/images/trainer/trainer-3.png',
        order: 3
    },
    {
        name: 'Secretary Name',
        role: 'Joint Secretary',
        desc: 'Assisting in administration and athlete welfare.',
        category: 'executive',
        image: '/assets/images/trainer/trainer-1.png',
        order: 4
    },
    {
        name: 'Treasurer Name',
        role: 'Treasurer',
        desc: 'Responsible for federation accounting and fund management.',
        category: 'executive',
        image: '/assets/images/trainer/trainer-2.png',
        order: 5
    },
    {
        name: 'Member Name',
        role: 'Executive Member',
        desc: 'Representing regional divisions across Bangladesh.',
        category: 'executive',
        image: '/assets/images/trainer/trainer-3.png',
        order: 6
    }
];

export async function GET() {
    await dbConnect();
    try {
        await Member.deleteMany({});
        await Member.insertMany(initialMembers);
        return NextResponse.json({ message: "Members seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
