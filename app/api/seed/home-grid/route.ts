import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HomeGrid from '@/models/HomeGrid';

export async function GET() {
    await dbConnect();
    try {
        const defaultData = {
            president: {
                title: 'Message from the President',
                content: 'The Bangladesh Wushu Federation is dedicated to the promotion and development of Wushu as a premier sport in the country. Our objective is to produce athletes of international standard while fostering a culture of discipline and physical excellence.',
                image: '/assets/images/president.png'
            },
            secretary: {
                title: 'Message from General Secretary',
                content: 'We are committed to providing our athletes with the best training facilities and international exposure. Wushu is not just a sport; it is a way of life that builds character and national pride.',
                image: '/assets/images/secretary.png'
            },
            history: {
                title: 'History of Wushu in Bangladesh',
                content: 'Wushu in Bangladesh began as a small movement of martial arts enthusiasts in the late 1980s. Since then, it has grown into a nationally recognized sport with medals at the South Asian Games and participation in World Championships. Our journey is defined by the hard work of pioneers who believed in the power of martial arts.',
                image: '/assets/images/bg/bg-11.png'
            },
            about: {
                title: 'About the Federation',
                content: 'Bangladesh Wushu Federation (BWUF) is the sole governing body for Wushu in the People\'s Republic of Bangladesh. Affiliated with the International Wushu Federation (IWUF) and the Olympic Council of Asia, we oversee the development of both Taolu and Sanda across all districts.',
                image: '/assets/images/bg/bg-12.png'
            }
        };

        const grid = await HomeGrid.findOneAndUpdate(
            {}, 
            defaultData, 
            { upsert: true, new: true }
        );

        return NextResponse.json({ message: "Home grid seeded successfully", grid });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
