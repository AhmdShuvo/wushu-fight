import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CTA from '@/models/CTA';

export async function GET() {
    await dbConnect();

    const initialCTA = {
        title: "JOIN THE LEGACY",
        subTitle: "#UNLEASH YOUR POWER",
        description: "Whether you aim to compete, learn self-defense, or simply improve your health, Wushu Fighting Federation is your destination.",
        buttonText: "Start Training",
        buttonLink: "#contact",
        bgImage: "bg-3.png",
    };

    try {
        await CTA.deleteMany({});
        await CTA.create(initialCTA);
        return NextResponse.json({ message: "CTA seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding CTA", error: error.message }, { status: 500 });
    }
}
