import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import { superAdminProtectedRoute } from '@/lib/auth';

export async function GET() {
    const authError = await superAdminProtectedRoute();
    if (authError) return authError;

    await dbConnect();

    const initialGallery = [
        { title: "Shaolin Forms", category: "Training", imageUrl: "gallery-big-1.png", order: 1 },
        { title: "Sanda Combat", category: "Combat", imageUrl: "gallery-big-2.png", order: 2 },
        { title: "Meditation Session", category: "Zen", imageUrl: "gallery-big-3.png", order: 3 },
        { title: "Weapon Master", category: "Training", imageUrl: "gallery-big-4.png", order: 4 },
        { title: "Group Training", category: "Community", imageUrl: "gallery-big-5.png", order: 5 },
        { title: "Tournament Day", category: "Events", imageUrl: "gallery-big-6.png", order: 6 },
    ];

    try {
        await Gallery.deleteMany({});
        await Gallery.insertMany(initialGallery);
        return NextResponse.json({ message: "Gallery seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding gallery", error: error.message }, { status: 500 });
    }
}
