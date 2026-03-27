import React from 'react';
import InnerBanner from '@/app/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';

const resourcesData: Record<string, any> = {
    'iwuf-constitution': {
        title: 'IWUF Constitution',
        subtitle: 'Global Charter',
        layout: 'document-list',
        description: 'Access the official constitution of the International Wushu Federation (IWUF) which defines the global statutes and ethics for member nations.',
        documents: [
            { name: 'IWUF Constitution 2024 Edition', type: 'PDF', size: '2.4 MB', date: 'Jan 15, 2024', icon: 'fa-file-pdf' },
            { name: 'IWUF Ethics Code', type: 'PDF', size: '1.1 MB', date: 'Mar 02, 2023', icon: 'fa-file-pdf' },
            { name: 'IWUF Anti-Doping Rules', type: 'DOCX', size: '4.5 MB', date: 'Dec 10, 2025', icon: 'fa-file-word' }
        ]
    },
    'iwuf-rules': {
        title: 'IWUF Rules & Regulations',
        subtitle: 'Competition Standards',
        layout: 'document-list',
        description: 'Standard operating rules for Taolu and Sanda competitions as set forth by the global IWUF technical committee.',
        documents: [
            { name: 'Traditional Wushu Judging Rules', type: 'PDF', size: '5.2 MB', date: 'Oct 20, 2025', icon: 'fa-file-pdf' },
            { name: 'Sanda Competition Rules (Updated)', type: 'PDF', size: '3.8 MB', date: 'Nov 05, 2025', icon: 'fa-file-pdf' },
            { name: 'Taolu Degree System Manual', type: 'PDF', size: '8.1 MB', date: 'Feb 12, 2026', icon: 'fa-file-pdf' }
        ]
    },
    'bwuf-constitution': {
        title: 'BWUF Constitution',
        subtitle: 'National Charter',
        layout: 'document-list',
        description: 'The guiding principles and structural rules governing the Bangladesh Wushu Federation internally.',
        documents: [
            { name: 'BWUF Core Constitution (Bengali)', type: 'PDF', size: '3.1 MB', date: 'Jun 10, 2020', icon: 'fa-file-pdf' },
            { name: 'BWUF Core Constitution (English)', type: 'PDF', size: '3.0 MB', date: 'Jun 10, 2020', icon: 'fa-file-pdf' }
        ]
    },
    'bwuf-rules': {
        title: 'BWUF Rules & Regulations',
        subtitle: 'Domestic Guidelines',
        layout: 'document-list',
        description: 'Local competition rules, athlete eligibility protocols, and operational guidelines for BWUF national activities.',
        documents: [
            { name: 'National Coach Eligibility Criteria', type: 'PDF', size: '1.2 MB', date: 'Jan 05, 2026', icon: 'fa-file-pdf' },
            { name: 'Club Affiliation Form', type: 'DOCX', size: '0.5 MB', date: 'Jan 05, 2026', icon: 'fa-file-word' },
            { name: 'National Athlete Code of Conduct', type: 'PDF', size: '1.8 MB', date: 'Mar 15, 2025', icon: 'fa-file-pdf' }
        ]
    },
    'training-documents': {
        title: 'Training Documents',
        subtitle: 'Syllabus & Guides',
        layout: 'document-list',
        description: 'Access official syllabus outlines, grading requirements, and technical manuals for coaches and athletes across all divisions.',
        documents: [
            { name: 'Beginner Taolu Syllabus (Changquan)', type: 'PDF', size: '4.4 MB', date: 'Aug 22, 2025', icon: 'fa-file-pdf' },
            { name: 'Intermediate Sanda Tactics', type: 'PPTX', size: '12.5 MB', date: 'Sep 30, 2025', icon: 'fa-file-powerpoint' },
            { name: 'Taijiquan 24 Forms Diagram', type: 'PDF', size: '6.7 MB', date: 'Jan 11, 2026', icon: 'fa-file-pdf' }
        ]
    },
    'reference-books': {
        title: 'Reference Books',
        subtitle: 'Literature & Biomechanics',
        layout: 'document-list',
        description: 'Recommended reading materials to enhance theoretical martial arts knowledge, history, and biomechanical understanding.',
        documents: [
            { name: 'The Fundamentals of Wushu', type: 'EPUB', size: '15.2 MB', date: 'Library', icon: 'fa-book' },
            { name: 'Biomechanics of Sanda Striking', type: 'PDF', size: '8.4 MB', date: 'Library', icon: 'fa-book-open' },
            { name: 'Wushu Dictionary (Eng-Chi-Ben)', type: 'PDF', size: '22.0 MB', date: 'Library', icon: 'fa-language' }
        ]
    },
    'training-videos': {
        title: 'Training Videos',
        subtitle: 'Visual Learning',
        layout: 'video-grid',
        description: 'High-quality instructional videos demonstrating Taolu routines, Sanda combat combinations, and Taiji flows.',
        videos: [
            { thumbnail: '/assets/images/gallery/gallery-2.png', title: 'Nanquan Standard Routine Seminar', duration: '45:20', author: 'Technical Committee' },
            { thumbnail: '/assets/images/gallery/gallery-3.png', title: 'Advanced Sanda Takedowns', duration: '22:15', author: 'National Coach' },
            { thumbnail: '/assets/images/gallery/gallery-1.png', title: 'Taijijian (Sword) Form Analysis', duration: '34:50', author: 'IWUF Expert' }
        ]
    },
    'other-documentaries': {
        title: 'Documentaries',
        subtitle: 'Wushu in Media',
        layout: 'video-grid',
        description: 'Historical documentaries regarding the origin of Wushu and major world sporting event recaps featuring Bangladesh.',
        videos: [
            { thumbnail: '/assets/images/gallery/gallery-4.png', title: 'Journey to the Asian Games 2022', duration: '1:12:00', author: 'BWUF Media' },
            { thumbnail: '/assets/images/gallery/gallery-5.png', title: 'The Roots of Traditional Kung Fu', duration: '55:30', author: 'History Channel' }
        ]
    },
    'national-competitions': {
        title: 'National Competitions Data',
        subtitle: 'Historical Stats',
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
    'international-competitions': {
        title: 'International Competitions Data',
        subtitle: 'Historical Stats',
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
    'regional-competitions': {
        title: 'Regional Competitions Data',
        subtitle: 'Historical Stats',
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
};

export default async function ResourcesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = resourcesData[slug];

    if (!data) {
        return (
            <>
                <InnerBanner title="Not Found" subtitle="Error" bgImage="/assets/images/bg/bg-12.png" activePage="404" />
                <div className="ptb-120 text-center"><h1>Resource Not Found</h1></div>
            </>
        );
    }

    return (
        <>
            <InnerBanner title={data.title} subtitle={data.subtitle} bgImage="/assets/images/bg/bg-12.png" activePage={data.title} />

            <section className="resource-header ptb-80" style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h2 className="text-white mb-3" style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.title}</h2>
                            <p className="text-white-50" style={{ fontSize: '18px' }}>{data.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Document List Layout */}
            {data.layout === 'document-list' && (
                <section className="document-list-section ptb-120" style={{ backgroundColor: '#f4f5f7' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="bg-white p-5 shadow-sm" style={{ borderRadius: '15px' }}>
                                    <h4 className="mb-4 text-dark font-weight-bold" style={{ borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
                                        <i className="fas fa-folder-open text-acc-green mr-2"></i> Available Files
                                    </h4>

                                    <div className="list-group list-group-flush">
                                        {data.documents.map((doc: any, i: number) => (
                                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-4" key={i} style={{ borderBottom: '1px solid #eee' }} data-aos="fade-up" data-aos-duration="800" data-aos-delay={i * 100}>
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-wrapper d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(62, 232, 15, 0.1)', borderRadius: '10px', color: '#3ee80f', fontSize: '24px', marginRight: '20px' }}>
                                                        <i className={`fas ${doc.icon}`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-1 text-dark" style={{ fontWeight: 'bold' }}>{doc.name}</h5>
                                                        <span className="text-muted" style={{ fontSize: '13px' }}>
                                                            <strong className="text-acc-green mr-2">{doc.type}</strong> •
                                                            <i className="far fa-hdd mx-2"></i> {doc.size} •
                                                            <i className="far fa-calendar-alt mx-2"></i> {doc.date}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="btn btn-outline-success" style={{ borderRadius: '30px', padding: '8px 25px', fontWeight: 'bold', borderColor: '#3ee80f', color: '#3ee80f' }}>
                                                    Download <i className="fas fa-download ml-2"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Video Grid Layout */}
            {data.layout === 'video-grid' && (
                <section className="video-grid-section ptb-120" style={{ backgroundColor: '#0a0a0a' }}>
                    <div className="container">
                        <div className="row">
                            {data.videos.map((video: any, i: number) => (
                                <div className="col-lg-4 col-md-6 mb-40" key={i} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={i * 100}>
                                    <div className="video-card position-relative group" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#111', cursor: 'pointer' }}>
                                        <div className="video-thumb position-relative" style={{ height: '220px' }}>
                                            <img src={video.thumbnail} alt={video.title} className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.7, transition: '0.3s' }} />
                                            <div className="play-button position-absolute d-flex justify-content-center align-items-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', backgroundColor: 'rgba(62, 232, 15, 0.9)', color: 'black', borderRadius: '50%', fontSize: '20px', zIndex: 2, transition: '0.3s', boxShadow: '0 0 20px rgba(62, 232, 15, 0.5)' }}>
                                                <i className="fas fa-play" style={{ marginLeft: '4px' }}></i>
                                            </div>
                                            <span className="position-absolute bg-dark text-white px-2 py-1" style={{ bottom: '10px', right: '10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{video.duration}</span>
                                        </div>
                                        <div className="video-info p-4 text-white">
                                            <h5 className="mb-2" style={{ fontWeight: 600, lineHeight: '1.4' }}>{video.title}</h5>
                                            <span className="text-white-50" style={{ fontSize: '13px' }}><i className="fas fa-user-circle mr-2 text-acc-green"></i>{video.author}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Data Stats Layout */}
            {data.layout === 'data-stats' && (
                <section className="data-stats-section ptb-120" style={{ backgroundColor: '#fff' }}>
                    <div className="container">
                        <div className="row mb-60">
                            {data.stats.map((stat: any, i: number) => (
                                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0" key={i} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={i * 100}>
                                    <div className="stat-card text-center p-5 shadow-sm h-100 border-0" style={{ borderRadius: '15px', backgroundColor: '#fdfdfd', borderBottom: '4px solid #3ee80f' }}>
                                        <i className={`fas ${stat.icon} fa-3x mb-4`} style={{ color: '#3ee80f' }}></i>
                                        <h2 className="text-dark font-weight-bold mb-2" style={{ fontSize: '42px' }}>{stat.value}</h2>
                                        <p className="text-muted mb-0 font-weight-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px' }}>{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                    <div className="card-header bg-dark text-white p-4 border-0">
                                        <h4 className="mb-0"><i className="fas fa-history text-acc-green mr-2"></i> Hall of Fame / Recent Champions</h4>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0" style={{ backgroundColor: '#fff' }}>
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th className="py-3 px-4 border-0 text-muted">Year</th>
                                                        <th className="py-3 px-4 border-0 text-muted">Champion / Honoree</th>
                                                        <th className="py-3 px-4 border-0 text-muted text-right">Category / Medal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.recentWinners.map((winner: any, i: number) => (
                                                        <tr key={i}>
                                                            <td className="py-4 px-4 border-bottom-0 font-weight-bold text-dark">{winner.year}</td>
                                                            <td className="py-4 px-4 border-bottom-0">
                                                                <span className="text-acc-green font-weight-bold mr-2"><i className="fas fa-trophy"></i></span> {winner.championName}
                                                            </td>
                                                            <td className="py-4 px-4 border-bottom-0 text-right text-muted">{winner.category}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
