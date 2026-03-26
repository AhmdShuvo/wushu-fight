import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feature from '@/models/Feature';

export async function GET() {
    await dbConnect();

    const initialFeatures = [
        { num: '01', title: 'EXPERT MASTERS', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-6.png', order: 1 },
        { num: '02', title: 'TRADITIONAL VALUES', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-7.png', order: 2 },
        { num: '03', title: 'MODERN FACILITIES', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-62.png', order: 3 },
        { num: '04', title: 'DIVERSE PROGRAMS', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-63.png', order: 4 },
    ];

    try {
        await Feature.deleteMany({});
        await Feature.insertMany(initialFeatures);
        return NextResponse.json({ message: "Features seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding features", error: error.message }, { status: 500 });
    }
}
