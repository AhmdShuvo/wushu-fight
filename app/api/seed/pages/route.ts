import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import PageContent from '../../../../models/PageContent';

const aboutData: Record<string, any> = {
    'history-of-bwuf': {
        title: 'History of BWUF',
        subtitle: 'Our Journey',
        layout: 'content-image',
        content: [
            "The Bangladesh Wushu Federation (BWUF) was established with a singular mission: to cultivate and promote the rich heritage of Wushu across the nation. Over the decades, we have evolved from a small collective of passionate practitioners into a prestigious, nationally recognized sporting institution under the National Sports Council.",
            "Wushu, incorporating both Taolu (forms) and Sanda (sparring), has seen massive growth in Bangladesh. Our early days were focused on standardizing training and translating international rules for local athletes. Today, we boast a robust infrastructure of coaches, referees, and athletes who compete at the highest levels of international sporting events."
        ],
        highlights: [
            { icon: 'fa-globe-asia', title: 'Established', text: 'Recognized by NSC & BOA' },
            { icon: 'fa-medal', title: 'First International Gold', text: 'Achieved in the SAF Games' }
        ],
        image: '/assets/images/bg/bg-11.png'
    },
    'our-mission': {
        title: 'Our Mission',
        subtitle: 'What Drives Us',
        layout: 'cards-overlay',
        content: "Our mission is to develop Wushu athletes of international caliber, promote a healthy and disciplined lifestyle, and integrate the cultural philosophy of martial arts into modern sports development.",
        cards: [
            { icon: 'fa-fist-raised', title: 'Athletic Excellence', text: 'To provide world-class training facilities and coaching to produce champion athletes.' },
            { icon: 'fa-heartbeat', title: 'Health & Well-being', text: 'To promote physical fitness and mental resilience through the regular practice of Wushu.' },
            { icon: 'fa-balance-scale', title: 'Fair Play & Discipline', text: 'To instill the core values of martial arts: respect, honor, and continuous self-improvement.' }
        ]
    },
    'our-vision': {
        title: 'Our Vision',
        subtitle: 'Looking Forward',
        layout: 'content-image',
        content: [
            "To be the premier martial arts federation in South Asia, distinguished by our excellence in athletic performance, robust grassroots development, and international sportsmanship."
        ],
        highlights: [
            { icon: 'fa-eye', title: 'Global Recognition', text: 'Top rankings in Asian and World Championships' },
            { icon: 'fa-school', title: 'Grassroots Integration', text: 'Wushu as part of national physical education' }
        ],
        image: '/assets/images/bg/bg-21.png'
    },
    'other-bwuf-committees': {
        title: 'Other BWUF Committees',
        subtitle: 'Specialized Operations',
        layout: 'list-cards',
        description: 'Our diverse sub-committees handle specialized tasks essential for the holistic growth of Wushu in Bangladesh.',
        items: [
            { title: 'Technical Committee', desc: 'Responsible for updating training syllabuses, standardizing judging rules, and evaluating athlete techniques.' },
            { title: 'Tournament & Event Committee', desc: 'Handles the logistics, scheduling, and execution of all national and regional championships.' }
        ]
    },
    'affiliated-organizations': {
        title: 'Affiliated Organizations',
        subtitle: 'Our Network',
        layout: 'list-cards',
        description: 'We work closely with district sports associations, defense teams, and regional clubs to bring Wushu to every corner of the country.',
        items: [
            { title: 'Bangladesh Army Wushu Team', desc: 'Premier defense team participating in national events.' },
            { title: 'Bangladesh Ansar & VDP', desc: 'Consistent top-performing team in national championships.' }
        ]
    }
};

export async function GET() {
    console.log("Seeding Pages...");
    try {
        await dbConnect();
        console.log("DB Connected for Seeding.");
        for (const slug in aboutData) {
            console.log(`Upserting page: ${slug}`);
            await PageContent.findOneAndUpdate(
                { slug },
                { ...aboutData[slug], slug },
                { upsert: true }
            );
        }
        console.log("Seeding Completed.");
        return NextResponse.json({ message: "Pages seeded successfully" });
    } catch (error: any) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
