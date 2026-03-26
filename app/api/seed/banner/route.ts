import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';
import About from '@/models/About';
import Style from '@/models/Style';
import Trainer from '@/models/Trainer';
import News from '@/models/News';
import Testimonial from '@/models/Testimonial';
import CTA from '@/models/CTA';
import Feature from '@/models/Feature';
import Schedule from '@/models/Schedule';
import Gallery from '@/models/Gallery';

export async function GET() {
    await dbConnect();

    const currentBanners = [
        {
            subTitle: "#1 Wushu Federation IN BANGLADESH",
            title: "BE A WORRIOR IN LIFE",
            innerTitle: "MIND.BODY & SPIRIT IMPROVED",
            description: "BANGLADESH WUSHU FEDERATION",
            backgroundImage: "/assets/images/bg/bg-22.png",
            bannerThumb: "none",
            widgetText: "none",
            widgetTextCount: "none",
            buttonText: "Apply Now",
            buttonLink: "#contact",
            order: 1
        },
        {
            subTitle: "#2 SANDA COMBAT SPECIALISTS",
            title: "STRIKE WITH PRECISION",
            innerTitle: "LEARN FROM THE BEST",
            description: "JOIN OUR EXPERT INSTRUCTORS TODAY",
            backgroundImage: "/assets/images/bg/bg-5.png",
            bannerThumb: "none",
            widgetText: "none",
            widgetTextCount: "none",
            buttonText: "Our Classes",
            buttonLink: "#classes",
            order: 2
        },
        {
            subTitle: "#3 TRADITIONAL KUNG FU",
            title: "MASTER ANCIENT FORMS",
            innerTitle: "FLEXIBILITY & DISCIPLINE",
            description: "EMBARK ON A JOURNEY OF DISCIPLINE AND STRENGTH",
            backgroundImage: "/assets/images/bg/bg-12.png",
            bannerThumb: "none",
            widgetText: "none",
            widgetTextCount: "none",
            buttonText: "Discover More",
            buttonLink: "#about",
            order: 3
        }
    ];

    const currentAbout = {
        title: "ABOUT",
        spanTitle: "Wushu",
        description: "Our Wushu Fighting Federation has been cultivating martial arts excellence since 1986. We offer a holistic approach to Wushu, blending traditional forms with modern self-defense applications.",
        bgImage: "/assets/images/bg/bg-1.png",
        logoText: "Wushu",
        mainImage: "/assets/images/about.png",
        signatureImage: "/assets/images/signature.png",
        instructorTitle: "DIRECTOR / INSTRUCTOR",
        videoLink: "https://www.youtube.com/embed/YDErI8Lphho?autoplay=1",
        items: [
            {
                icon: "/assets/images/icon/icon-1.png",
                title: "TRADITIONAL FORMS",
                description: "Experience the beauty and power of traditional Wushu forms (Taolu). Master the intricate movements and develop grace, flexibility, and focus."
            },
            {
                icon: "/assets/images/icon/icon-2.png",
                title: "COMBAT APPLICATIONS",
                description: "Learn practical self-defense and Sanda (Chinese Kickushu). We focus on real-world applications of Wushu techniques for your safety and confidence."
            }
        ]
    };

    const currentStyles = [
        {
            title: "SANDA COMBAT",
            description: "Master the ancient techniques and internal power cultivation of Sanda Combat.",
            icon: "/assets/images/icon/icon-3.png",
            bgImage: "/assets/images/training/training-1.png",
            order: 1
        },
        {
            title: "SHAOLIN STYLES",
            description: "Master the ancient techniques and internal power cultivation of Shaolin Styles.",
            icon: "/assets/images/icon/icon-4.png",
            bgImage: "/assets/images/training/training-1.png",
            order: 2
        },
        {
            title: "TAOLU FORMS",
            description: "Master the ancient techniques and internal power cultivation of Taolu Forms.",
            icon: "/assets/images/icon/icon-5.png",
            bgImage: "/assets/images/training/training-1.png",
            order: 3
        }
    ];

    const currentTrainers = [
        { name: "Master Li", role: "Head Wushu Master", image: "trainer-1.png", order: 1 },
        { name: "Coach Zhang", role: "Sanda Champion", image: "trainer-2.png", order: 2 },
        { name: "Instructor Chen", role: "Tai Chi Expert", image: "trainer-3.png", order: 3 },
        { name: "Master Wang", role: "Shaolin Monk", image: "trainer-4.png", order: 4 },
    ];

    const currentNews = [
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

    const currentTestimonials = [
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

    const currentCTA = {
        title: "JOIN THE LEGACY",
        subTitle: "#UNLEASH YOUR POWER",
        description: "Whether you aim to compete, learn self-defense, or simply improve your health, Wushu Fighting Federation is your destination.",
        buttonText: "Start Training",
        buttonLink: "#contact",
        bgImage: "bg-3.png",
    };

    const currentFeatures = [
        { num: '01', title: 'EXPERT MASTERS', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-6.png', order: 1 },
        { num: '02', title: 'TRADITIONAL VALUES', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-7.png', order: 2 },
        { num: '03', title: 'MODERN FACILITIES', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-62.png', order: 3 },
        { num: '04', title: 'DIVERSE PROGRAMS', description: 'Experience world-class training with a focus on holistic development.', icon: 'icon-63.png', order: 4 },
    ];

    const initialGallery = [
        { title: "Shaolin Forms", category: "Training", imageUrl: "gallery-big-1.png", order: 1 },
        { title: "Sanda Combat", category: "Combat", imageUrl: "gallery-big-2.png", order: 2 },
        { title: "Meditation Session", category: "Zen", imageUrl: "gallery-big-3.png", order: 3 },
        { title: "Weapon Master", category: "Training", imageUrl: "gallery-big-4.png", order: 4 },
        { title: "Group Training", category: "Community", imageUrl: "gallery-big-5.png", order: 5 },
        { title: "Tournament Day", category: "Events", imageUrl: "gallery-big-6.png", order: 6 },
    ];

    const emptySlot = { text: '', subText: '', isBlank: true, isActive: false };
    const currentSchedule = [
        {
            day: 'Saturday',
            col10am: { text: 'Taolu Basics', subText: '10 am - 11 am', isBlank: false, isActive: false },
            col12pm: { text: 'Tai Chi', subText: '12 pm - 1 pm', isBlank: false, isActive: false },
            col02pm: emptySlot,
            col05pm: { text: 'Sanda Sparring', subText: '05 pm - 06 pm', isBlank: false, isActive: false },
            col07pm: { text: 'Meditation', subText: '07 pm - 08 pm', isBlank: false, isActive: false },
            order: 1
        },
        {
            day: 'Sunday',
            col10am: emptySlot,
            col12pm: { text: 'Shaolin Kung Fu', subText: '12 pm - 1 pm', isBlank: false, isActive: false },
            col02pm: { text: 'Weaponry', subText: '02 pm - 03 pm', isBlank: false, isActive: false },
            col05pm: emptySlot,
            col07pm: { text: 'Flexibility', subText: '07 pm - 08 pm', isBlank: false, isActive: false },
            order: 2
        },
        {
            day: 'Monday',
            col10am: { text: 'Conditioning', subText: '10 am - 11 am', isBlank: false, isActive: false },
            col12pm: emptySlot,
            col02pm: { text: 'Sanda Drills', subText: '02 pm - 03 pm', isBlank: false, isActive: false },
            col05pm: { text: 'Forms Review', subText: '05 pm - 06 pm', isBlank: false, isActive: false },
            col07pm: emptySlot,
            order: 3
        },
        {
            day: 'Tuesday',
            col10am: emptySlot,
            col12pm: { text: 'Private Session', subText: '12 pm - 1 pm', isBlank: false, isActive: true },
            col02pm: emptySlot,
            col05pm: { text: 'Advanced Forms', subText: '05 pm - 06 pm', isBlank: false, isActive: false },
            col07pm: emptySlot,
            order: 4
        },
        {
            day: 'Wednesday',
            col10am: { text: 'Qi Gong', subText: '10 am - 11 am', isBlank: false, isActive: false },
            col12pm: { text: 'Self Defense', subText: '12 pm - 1 pm', isBlank: false, isActive: false },
            col02pm: { text: 'Kids Wushu', subText: '02 pm - 03 pm', isBlank: false, isActive: false },
            col05pm: emptySlot,
            col07pm: { text: 'Open Mat', subText: '07 pm - 08 pm', isBlank: false, isActive: false },
            order: 5
        },
        {
            day: 'Thursday',
            col10am: { text: 'Power Training', subText: '10 am - 11 am', isBlank: false, isActive: false },
            col12pm: emptySlot,
            col02pm: { text: 'Partner Drills', subText: '02 pm - 03 pm', isBlank: false, isActive: false },
            col05pm: emptySlot,
            col07pm: { text: 'Sparring Night', subText: '07 pm - 09 pm', isBlank: false, isActive: false },
            order: 6
        },
        {
            day: 'Friday',
            col10am: emptySlot,
            col12pm: { text: 'Demonstration', subText: '12 pm - 1 pm', isBlank: false, isActive: false },
            col02pm: emptySlot,
            col05pm: { text: 'Review', subText: '05 pm - 06 pm', isBlank: false, isActive: false },
            col07pm: emptySlot,
            order: 7
        }
    ];

    try {
        await Banner.deleteMany({});
        await Banner.insertMany(currentBanners);

        await About.deleteMany({});
        await About.create(currentAbout);

        await Style.deleteMany({});
        await Style.insertMany(currentStyles);

        await Trainer.deleteMany({});
        await Trainer.insertMany(currentTrainers);

        await News.deleteMany({});
        await News.insertMany(currentNews);

        await Testimonial.deleteMany({});
        await Testimonial.insertMany(currentTestimonials);

        await CTA.deleteMany({});
        await CTA.create(currentCTA);

        await Feature.deleteMany({});
        await Feature.insertMany(currentFeatures);

        await Schedule.deleteMany({});
        await Schedule.insertMany(currentSchedule);

        await Gallery.deleteMany({});
        await Gallery.insertMany(initialGallery);

        return NextResponse.json({ message: "Database seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding database", error: error.message }, { status: 500 });
    }
}
