import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Schedule from '@/models/Schedule';

export async function GET() {
    await dbConnect();

    const emptySlot = { text: '', subText: '', isBlank: true, isActive: false };
    const initialSchedule = [
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
        await Schedule.deleteMany({});
        await Schedule.insertMany(initialSchedule);
        return NextResponse.json({ message: "Schedule seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error seeding schedule", error: error.message }, { status: 500 });
    }
}
