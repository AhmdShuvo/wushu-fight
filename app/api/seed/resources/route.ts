import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Resource from '../../../../models/Resource';

const resourcesData: any[] = [
    {
        slug: 'iwuf-constitution',
        title: 'IWUF Constitution',
        subtitle: 'Global Charter',
        category: 'Key Documents',
        layout: 'document-list',
        description: 'Access the official constitution of the International Wushu Federation (IWUF) which defines the global statutes and ethics for member nations.',
        documents: [
            { name: 'IWUF Constitution 2024 Edition', type: 'PDF', size: '2.4 MB', date: 'Jan 15, 2024', icon: 'fa-file-pdf' },
            { name: 'IWUF Ethics Code', type: 'PDF', size: '1.1 MB', date: 'Mar 02, 2023', icon: 'fa-file-pdf' },
            { name: 'IWUF Anti-Doping Rules', type: 'DOCX', size: '4.5 MB', date: 'Dec 10, 2025', icon: 'fa-file-word' }
        ]
    },
    {
        slug: 'iwuf-rules',
        title: 'IWUF Rules & Regulations',
        subtitle: 'Competition Standards',
        category: 'Key Documents',
        layout: 'document-list',
        description: 'Standard operating rules for Taolu and Sanda competitions as set forth by the global IWUF technical committee.',
        documents: [
            { name: 'Traditional Wushu Judging Rules', type: 'PDF', size: '5.2 MB', date: 'Oct 20, 2025', icon: 'fa-file-pdf' },
            { name: 'Sanda Competition Rules (Updated)', type: 'PDF', size: '3.8 MB', date: 'Nov 05, 2025', icon: 'fa-file-pdf' },
            { name: 'Taolu Degree System Manual', type: 'PDF', size: '8.1 MB', date: 'Feb 12, 2026', icon: 'fa-file-pdf' }
        ]
    },
    {
        slug: 'bwuf-constitution',
        title: 'BWUF Constitution',
        subtitle: 'National Charter',
        category: 'Key Documents',
        layout: 'document-list',
        description: 'The guiding principles and structural rules governing the Bangladesh Wushu Federation internally.',
        documents: [
            { name: 'BWUF Core Constitution (Bengali)', type: 'PDF', size: '3.1 MB', date: 'Jun 10, 2020', icon: 'fa-file-pdf' },
            { name: 'BWUF Core Constitution (English)', type: 'PDF', size: '3.0 MB', date: 'Jun 10, 2020', icon: 'fa-file-pdf' }
        ]
    },
    {
        slug: 'bwuf-rules',
        title: 'BWUF Rules & Regulations',
        subtitle: 'Domestic Guidelines',
        category: 'Key Documents',
        layout: 'document-list',
        description: 'Local competition rules, athlete eligibility protocols, and operational guidelines for BWUF national activities.',
        documents: [
            { name: 'National Coach Eligibility Criteria', type: 'PDF', size: '1.2 MB', date: 'Jan 05, 2026', icon: 'fa-file-pdf' },
            { name: 'Club Affiliation Form', type: 'DOCX', size: '0.5 MB', date: 'Jan 05, 2026', icon: 'fa-file-word' },
            { name: 'National Athlete Code of Conduct', type: 'PDF', size: '1.8 MB', date: 'Mar 15, 2025', icon: 'fa-file-pdf' }
        ]
    },
    {
        slug: 'training-documents',
        title: 'Training Documents',
        subtitle: 'Syllabus & Guides',
        category: 'Training Materials',
        layout: 'document-list',
        description: 'Access official syllabus outlines, grading requirements, and technical manuals for coaches and athletes across all divisions.',
        documents: [
            { name: 'Beginner Taolu Syllabus (Changquan)', type: 'PDF', size: '4.4 MB', date: 'Aug 22, 2025', icon: 'fa-file-pdf' },
            { name: 'Intermediate Sanda Tactics', type: 'PPTX', size: '12.5 MB', date: 'Sep 30, 2025', icon: 'fa-file-powerpoint' },
            { name: 'Taijiquan 24 Forms Diagram', type: 'PDF', size: '6.7 MB', date: 'Jan 11, 2026', icon: 'fa-file-pdf' }
        ]
    },
    {
        slug: 'reference-books',
        title: 'Reference Books',
        subtitle: 'Literature & Biomechanics',
        category: 'Training Materials',
        layout: 'document-list',
        description: 'Recommended reading materials to enhance theoretical martial arts knowledge, history, and biomechanical understanding.',
        documents: [
            { name: 'The Fundamentals of Wushu', type: 'EPUB', size: '15.2 MB', date: 'Library', icon: 'fa-book' },
            { name: 'Biomechanics of Sanda Striking', type: 'PDF', size: '8.4 MB', date: 'Library', icon: 'fa-book-open' },
            { name: 'Wushu Dictionary (Eng-Chi-Ben)', type: 'PDF', size: '22.0 MB', date: 'Library', icon: 'fa-language' }
        ]
    },
    {
        slug: 'training-videos',
        title: 'Training Videos',
        subtitle: 'Visual Learning',
        category: 'Training Materials',
        layout: 'video-grid',
        description: 'High-quality instructional videos demonstrating Taolu routines, Sanda combat combinations, and Taiji flows.',
        videos: [
            { thumbnail: '/assets/images/gallery/gallery-2.png', title: 'Nanquan Standard Routine Seminar', duration: '45:20', author: 'Technical Committee' },
            { thumbnail: '/assets/images/gallery/gallery-3.png', title: 'Advanced Sanda Takedowns', duration: '22:15', author: 'National Coach' },
            { thumbnail: '/assets/images/gallery/gallery-1.png', title: 'Taijijian (Sword) Form Analysis', duration: '34:50', author: 'IWUF Expert' }
        ]
    },
    {
        slug: 'other-documentaries',
        title: 'Documentaries',
        subtitle: 'Wushu in Media',
        category: 'Training Materials',
        layout: 'video-grid',
        description: 'Historical documentaries regarding the origin of Wushu and major world sporting event recaps featuring Bangladesh.',
        videos: [
            { thumbnail: '/assets/images/gallery/gallery-4.png', title: 'Journey to the Asian Games 2022', duration: '1:12:00', author: 'BWUF Media' },
            { thumbnail: '/assets/images/gallery/gallery-5.png', title: 'The Roots of Traditional Kung Fu', duration: '55:30', author: 'History Channel' }
        ]
    },
    {
        slug: 'national-competitions',
        title: 'National Competitions Data',
        subtitle: 'Historical Stats',
        category: 'Statistics',
        layout: 'data-stats',
        description: 'A comprehensive look at performance records, medal tallies, and participation growth from past National Championships.',
        stats: [
            { label: 'Total Athletes (2025)', value: '1,450+', icon: 'fa-users' },
            { label: 'Gold Medals Awarded', value: '128', icon: 'fa-medal' },
            { label: 'Participating Districts', value: '64/64', icon: 'fa-map' },
            { label: 'Record High Score', value: '9.85', icon: 'fa-star' }
        ],
        recentWinners: [
            { year: '2025', championName: 'Bangladesh Ansar', category: 'Overall Champion' },
            { year: '2024', championName: 'Bangladesh Army', category: 'Overall Champion' },
            { year: '2023', championName: 'BKSP', category: 'Overall Champion' }
        ]
    },
    {
        slug: 'international-competitions',
        title: 'International Competitions Data',
        subtitle: 'Historical Stats',
        category: 'Statistics',
        layout: 'data-stats',
        description: 'Detailed performance logs and medal history of BWUF athletes representing the nation in international arenas.',
        stats: [
            { label: 'SAF Games Golds', value: '12', icon: 'fa-trophy' },
            { label: 'World Champ Medals', value: '4', icon: 'fa-globe' },
            { label: 'International Referees', value: '5', icon: 'fa-gavel' },
            { label: 'Overall Int. Medals', value: '45+', icon: 'fa-award' }
        ],
        recentWinners: [
            { year: '2023', championName: 'M. Rahman (Sanda 56kg)', category: 'Bronze - World Champ' },
            { year: '2019', championName: 'S. Islam (Taolu)', category: 'Gold - SAF Games' },
            { year: '2016', championName: 'National Team', category: '3 Golds - SAF Games' }
        ]
    },
    {
        slug: 'regional-competitions',
        title: 'Regional Competitions Data',
        subtitle: 'Historical Stats',
        category: 'Statistics',
        layout: 'data-stats',
        description: 'Track records and growth metrics from regional, school, and divisional Wushu tournaments pushing grassroots development.',
        stats: [
            { label: 'Active Clubs', value: '85+', icon: 'fa-school' },
            { label: 'Youth Participants', value: '5,000+', icon: 'fa-child' },
            { label: 'Divisional Tournaments', value: '24/Year', icon: 'fa-calendar-check' },
            { label: 'Certified Black Belts', value: '1,200+', icon: 'fa-user-graduate' }
        ],
        recentWinners: [
            { year: '2026', championName: 'Dhaka Division', category: 'Inter-Divisional Champions' },
            { year: '2025', championName: 'Sylhet Division', category: 'Youth Cup Winners' },
            { year: '2025', championName: 'Rajshahi Division', category: 'Regional Sanda League' }
        ]
    }
];

import { adminProtectedRoute } from '../../../../lib/auth';

export async function GET() {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        await Resource.deleteMany({});
        await Resource.insertMany(resourcesData);
        return NextResponse.json({ message: 'Resources seeded successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
