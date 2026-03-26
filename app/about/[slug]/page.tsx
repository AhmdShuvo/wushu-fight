import React from 'react';
import InnerBanner from '@/app/components/InnerBanner';
import Image from 'next/image';

const aboutData: Record<string, any> = {
    'history': {
        title: 'History of BWUF',
        subtitle: 'Our Journey',
        layout: 'content-image',
        content: [
            "The Bangladesh Wushu Federation (BWUF) was established with a singular mission: to cultivate and promote the rich heritage of Wushu across the nation. Over the decades, we have evolved from a small collective of passionate practitioners into a prestigious, nationally recognized sporting institution under the National Sports Council.",
            "Wushu, incorporating both Taolu (forms) and Sanda (sparring), has seen massive growth in Bangladesh. Our early days were focused on standardizing training and translating international rules for local athletes. Today, we boast a robust infrastructure of coaches, referees, and athletes who compete at the highest levels of international sporting events.",
            "Our history is defined by perseverance. From organizing the first National Wushu Championship to bringing home international gold medals at the South Asian Games, the BWUF continues to write new chapters of success."
        ],
        highlights: [
            { icon: 'fa-globe-asia', title: 'Established', text: 'Recognized by NSC & BOA' },
            { icon: 'fa-medal', title: 'First International Gold', text: 'Achieved in the SAF Games' },
            { icon: 'fa-users', title: 'National Scale', text: 'Over thousands of active practitioners' }
        ],
        image: '/assets/images/bg/bg-11.png'
    },
    'mission': {
        title: 'Our Mission',
        subtitle: 'What Drives Us',
        layout: 'cards-overlay',
        content: "Our mission is to develop Wushu athletes of international caliber, promote a healthy and disciplined lifestyle, and integrate the cultural philosophy of martial arts into modern sports development. We aim to make Wushu accessible to every interested individual in Bangladesh.",
        cards: [
            { icon: 'fa-fist-raised', title: 'Athletic Excellence', text: 'To provide world-class training facilities and coaching to produce champion athletes.' },
            { icon: 'fa-heartbeat', title: 'Health & Well-being', text: 'To promote physical fitness and mental resilience through the regular practice of Wushu.' },
            { icon: 'fa-balance-scale', title: 'Fair Play & Discipline', text: 'To instill the core values of martial arts: respect, honor, and continuous self-improvement.' }
        ]
    },
    'vision': {
        title: 'Our Vision',
        subtitle: 'Looking Forward',
        layout: 'content-image',
        content: [
            "To be the premier martial arts federation in South Asia, distinguished by our excellence in athletic performance, robust grassroots development, and international sportsmanship.",
            "We envision a future where Wushu is a mainstream sport in Bangladesh, practiced in schools, colleges, and communities—fostering a generation of physically strong and mentally balanced citizens who contribute positively to society.",
            "By 2030, our goal is to consistently rank among the top Wushu nations globally, hosting international tier-1 championships on home soil."
        ],
        highlights: [
            { icon: 'fa-eye', title: 'Global Recognition', text: 'Top rankings in Asian and World Championships' },
            { icon: 'fa-school', title: 'Grassroots Integration', text: 'Wushu as part of national physical education' },
            { icon: 'fa-trophy', title: 'Hosting Excellence', text: 'Standardized arenas for international events' }
        ],
        image: '/assets/images/bg/bg-21.png'
    },
    'founding-members': {
        title: 'Founding Members',
        subtitle: 'The Pioneers',
        layout: 'team-grid',
        description: 'The visionary individuals who laid the foundation for the Bangladesh Wushu Federation. Their dedication transformed a shared passion into a national movement.',
        team: [
            { name: 'Founder Name 1', role: 'Chief Founder', desc: 'Instrumental in drafting the initial federation constitution and securing NSC recognition.' },
            { name: 'Founder Name 2', role: 'Co-Founder & Technical Lead', desc: 'Introduced standard international Taolu training methodologies to the country.' },
            { name: 'Founder Name 3', role: 'Co-Founder & Administrator', desc: 'Established the first district-level Wushu associations to ensure nationwide reach.' }
        ]
    },
    'executive-committee': {
        title: 'Current Executive Committee',
        subtitle: 'The Leadership',
        layout: 'team-grid',
        description: 'Meet the highly dedicated individuals guiding the federation towards new heights. Our executive committee oversees all administrative, financial, and sporting operations.',
        team: [
            { name: 'Dr. Abdus Sobhan Golap', role: 'President', desc: 'Leading the federation\'s strategic vision and international relations.' },
            { name: 'Md. Dulal Hossain', role: 'General Secretary', desc: 'Managing day-to-day operations and coordinating national events.' },
            { name: 'V.P. Name Here', role: 'Vice President', desc: 'Overseeing financial planning and sponsorships.' },
            { name: 'Secretary Name', role: 'Joint Secretary', desc: 'Assisting in administration and athlete welfare.' },
            { name: 'Treasurer Name', role: 'Treasurer', desc: 'Responsible for federation accounting and fund management.' },
            { name: 'Member Name', role: 'Executive Member', desc: 'Representing regional divisions.' }
        ]
    },
    'other-committees': {
        title: 'Other BWUF Committees',
        subtitle: 'Specialized Operations',
        layout: 'list-cards',
        description: 'Our diverse sub-committees handle specialized tasks essential for the holistic growth of Wushu in Bangladesh.',
        items: [
            { title: 'Technical Committee', desc: 'Responsible for updating training syllabuses, standardizing judging rules, and evaluating athlete techniques.' },
            { title: 'Tournament & Event Committee', desc: 'Handles the logistics, scheduling, and execution of all national and regional championships.' },
            { title: 'Medical & Anti-Doping Committee', desc: 'Ensures the health and safety of athletes, providing medical support and enforcing WADA standards.' },
            { title: 'Media & Public Relations', desc: 'Manages broadcasting, press releases, and digital presence to expand Wushu\'s popularity.' },
            { title: 'Women\'s Sports Committee', desc: 'Dedicated to increasing female participation and providing equal opportunities for women in martial arts.' }
        ]
    },
    'affiliates': {
        title: 'Affiliated Organizations',
        subtitle: 'Our Network',
        layout: 'list-cards',
        description: 'We work closely with district sports associations, defense teams, and regional clubs to bring Wushu to every corner of the country.',
        items: [
            { title: 'Bangladesh Army Wushu Team', desc: 'Premier defense team participating in national events.' },
            { title: 'Bangladesh Ansar & VDP', desc: 'Consistent top-performing team in national championships.' },
            { title: 'BKSP (Bangladesh Krira Shikkha Protishtan)', desc: 'The national sports institute nurturing young Wushu talents.' },
            { title: 'Dhaka District Wushu Association', desc: 'Leading regional governing body for the capital.' },
            { title: 'Chattogram Divisional Wushu Association', desc: 'Promoting martial arts in the southern region of Bangladesh.' },
            { title: 'Sylhet Wushu Club', desc: 'A major contributor to grassroots athlete development.' }
        ]
    }
};

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = aboutData[slug];

    if (!data) {
        return (
            <>
                <InnerBanner title="Not Found" subtitle="Error" bgImage="/assets/images/bg/bg-12.png" activePage="404" />
                <div className="ptb-120 text-center"><h1>Page Not Found</h1></div>
            </>
        );
    }

    return (
        <>
            <InnerBanner title={data.title} subtitle={data.subtitle} bgImage="/assets/images/bg/bg-12.png" activePage={data.title} />

            {/* Content & Image Layout */}
            {data.layout === 'content-image' && (
                <section className="about-section ptb-120" style={{ backgroundColor: '#fff' }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-5 mb-lg-0 pr-lg-5" data-aos="fade-right" data-aos-duration="1200">
                                <div className="section-header mb-4">
                                    <h2 className="section-title text-dark mb-4" style={{ fontSize: '40px' }}>{data.title}</h2>
                                    {data.content.map((paragraph: string, i: number) => (
                                        <p key={i} className="mb-4 text-muted" style={{ fontSize: '16px', lineHeight: '1.8' }}>{paragraph}</p>
                                    ))}
                                </div>

                                {data.highlights && (
                                    <div className="row mt-5">
                                        {data.highlights.map((item: any, i: number) => (
                                            <div className="col-sm-6 mb-4" key={i}>
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-box mr-3" style={{ width: '50px', height: '50px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                                                        <i className={`fas ${item.icon}`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-1 text-dark" style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.title}</h5>
                                                        <p className="mb-0 text-muted" style={{ fontSize: '13px' }}>{item.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6" data-aos="fade-left" data-aos-duration="1200">
                                <div className="about-image position-relative" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                                    <img src={data.image} alt={data.title} className="w-100 img-fluid" style={{ minHeight: '500px', objectFit: 'cover' }} />
                                    <div className="position-absolute" style={{ top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(220,53,69,0.2) 0%, rgba(0,0,0,0) 100%)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Cards Overlay Layout */}
            {data.layout === 'cards-overlay' && (
                <section className="mission-section ptb-120 bg_img position-relative" style={{ backgroundImage: "url('/assets/images/bg/bg-22.png')" }}>
                    <div className="position-absolute" style={{ top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)' }}></div>
                    <div className="container position-relative z-index-1">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center mb-60">
                                <h2 className="text-white mb-4" style={{ fontSize: '46px', fontWeight: 800 }}>{data.title}</h2>
                                <p className="text-white-50" style={{ fontSize: '18px', lineHeight: '2' }}>{data.content}</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {data.cards.map((card: any, i: number) => (
                                <div className="col-lg-4 col-md-6 mb-4" key={i} data-aos="fade-up" data-aos-duration="1200" data-aos-delay={i * 100}>
                                    <div className="card mission-card-hover h-100 border-0 text-center" style={{ backgroundColor: '#111', padding: '40px 30px', borderRadius: '10px', transition: 'transform 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                        <style>{`
                                            .mission-card-hover:hover { transform: translateY(-10px) !important; }
                                        `}</style>
                                        <i className={`fas ${card.icon} fa-4x mb-4`} style={{ color: '#dc3545' }}></i>
                                        <h4 className="text-white mb-3">{card.title}</h4>
                                        <p className="text-white-50 mb-0">{card.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Team Grid Layout */}
            {data.layout === 'team-grid' && (
                <section className="team-section ptb-120" style={{ backgroundColor: '#f9f9f9' }}>
                    <div className="container">
                        <div className="row justify-content-center mb-60">
                            <div className="col-lg-8 text-center">
                                <h2 className="section-title text-dark">{data.title}</h2>
                                <p className="text-muted mt-3">{data.description}</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {data.team.map((member: any, i: number) => (
                                <div className="col-lg-4 col-md-6 mb-30" key={i} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={i * 100}>
                                    <div className="team-item bg-white p-5 text-center h-100 shadow-sm" style={{ borderRadius: '15px', borderBottom: '4px solid #dc3545' }}>
                                        <div className="member-thumb mb-4 mx-auto" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' }}>
                                            <img src={`/assets/images/trainer/trainer-${(i % 3) + 1}.png`} alt={member.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                        </div>
                                        <h4 className="text-dark mb-1">{member.name}</h4>
                                        <span className="text-danger d-block mb-3 font-weight-bold">{member.role}</span>
                                        <p className="text-muted small">{member.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* List Cards Layout */}
            {data.layout === 'list-cards' && (
                <section className="list-section ptb-120" style={{ backgroundColor: '#000' }}>
                    <div className="container">
                        <div className="row justify-content-center mb-60">
                            <div className="col-lg-8 text-center">
                                <h2 className="text-white">{data.title}</h2>
                                <p className="text-white-50 mt-3">{data.description}</p>
                            </div>
                        </div>
                        <div className="row">
                            {data.items.map((item: any, i: number) => (
                                <div className="col-lg-6 mb-30" key={i} data-aos="fade-up" data-aos-duration="1000">
                                    <div className="d-flex bg-dark p-4 h-100" style={{ borderRadius: '10px', borderLeft: '4px solid #dc3545' }}>
                                        <div className="mr-4 mt-2">
                                            <i className="fas fa-check-circle" style={{ color: '#dc3545', fontSize: '24px' }}></i>
                                        </div>
                                        <div>
                                            <h4 className="text-white mb-2">{item.title}</h4>
                                            <p className="text-white-50 mb-0">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
