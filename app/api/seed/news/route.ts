import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import News from '@/models/News';
import { superAdminProtectedRoute } from '@/lib/auth';

export async function GET() {
    const authError = await superAdminProtectedRoute();
    if (authError) return authError;

    await dbConnect();

    const initialNews = [
        {
            title: "THE PHILOSOPHY OF WUSHU TRAINING",
            slug: "philosophy-of-wushu-training",
            date: "Feb 10, 2024",
            author: "Master Li",
            category: "Philosophy",
            img: "blog-1.png",
            content: "The philosophy of Wushu training goes beyond physical combat. It is a journey of self-discovery, discipline, and mental fortitude. In this post, we explore the ancient roots of Wushu and how it applies to modern life. Master Li shares his insights on why balance is the most important element of any martial art.",
            order: 1
        },
        {
            title: "SANDA VS TRADITIONAL KUNG FU",
            slug: "sanda-vs-traditional-kung-fu",
            date: "Feb 10, 2024",
            author: "Coach Zhang",
            category: "Combat",
            img: "blog-2.png",
            content: "Sanda, also known as Chinese kickushu, is the modern combat application of traditional Wushu. While traditional Kung Fu focuses on forms and historical techniques, Sanda is built for the ring. Coach Zhang discusses the key differences and how they complement each other in a holistic training program.",
            order: 2
        },
        {
            title: "BENEFITS OF TAI CHI FOR HEALTH",
            slug: "benefits-of-tai-chi-for-health",
            date: "Feb 10, 2024",
            author: "Dr. Chen",
            category: "Health",
            img: "blog-3.png",
            content: "Tai Chi is often described as 'meditation in motion.' Dr. Chen explains how this slow, graceful practice can improve cardiovascular health, reduce stress, and increase longevity. Whether you are a young athlete or a senior, Tai Chi offers benefits that are scientifically proven to enhance well-being.",
            order: 3
        },
    ];

    try {
        await News.deleteMany({});
        await News.insertMany(initialNews);
        return NextResponse.json({ message: "News seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding news", error: error.message }, { status: 500 });
    }
}
