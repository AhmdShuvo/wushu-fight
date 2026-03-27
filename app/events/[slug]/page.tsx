'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import InnerBanner from '../../components/InnerBanner';

const eventContent = {
    'yearly-calendar': {
        title: 'YEARLY',
        subtitle: 'CALENDAR',
        activePage: 'Yearly Calendar',
        content: (
            <div className="table-responsive mt-4">
                <table className="table table-bordered table-dark custom-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>January</td><td>New Year Training Camp</td><td>Dhaka</td><td>Jan 05-15</td></tr>
                        <tr><td>March</td><td>National Youth Wushu</td><td>Chittagong</td><td>Mar 20-25</td></tr>
                        <tr><td>June</td><td>Summer Wushu Workshop</td><td>Sylhet</td><td>Jun 10-15</td></tr>
                        <tr><td>September</td><td>National Wushu Championship</td><td>Dhaka</td><td>Sep 15-20</td></tr>
                        <tr><td>December</td><td>Winter Festival</td><td>Rajshahi</td><td>Dec 10-15</td></tr>
                    </tbody>
                </table>
                <style jsx>{`
                    .custom-table { border-radius: 10px; overflow: hidden; border: none; }
                    .custom-table thead th { background-color: #3ee80f; color: black; border: none; text-transform: uppercase; }
                    .custom-table tbody td { vertical-align: middle; color: #ccc; }
                `}</style>
            </div>
        )
    },
    'national-sports': {
        title: 'UPCOMING',
        subtitle: 'NATIONAL EVENTS',
        activePage: 'National Sports Events',
        content: (
            <div className="row mt-4">
                {[1, 2, 3].map((item) => (
                    <div className="col-lg-4 col-md-6 mb-30" key={item}>
                        <div className="event-card p-4 border rounded bg-dark shadow-sm h-100">
                            <span className="badge bg--secondary mb-2" style={{ color: '#000' }}>National</span>
                            <h4 className="title text-white mb-3" style={{ fontSize: '18px' }}>National Junior Wushu Championship {2024 + item}</h4>
                            <p className="text-muted" style={{ fontSize: '14px' }}>The biggest national event for young Wushu athletes from across the country.</p>
                            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary">
                                <span className="text-white"><i className="fas fa-calendar-alt me-2" style={{ color: '#3ee80f' }}></i> Oct 2024</span>
                                <span className="text-white"><i className="fas fa-map-marker-alt me-2" style={{ color: '#3ee80f' }}></i> Dhaka</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    },
    'international-sports': {
        title: 'UPCOMING',
        subtitle: 'INTERNATIONAL EVENTS',
        activePage: 'International Sports Events',
        content: (
            <div className="row mt-4">
                {[1, 2].map((item) => (
                    <div className="col-lg-6 col-md-6 mb-30" key={item}>
                        <div className="event-card p-4 border rounded bg-dark shadow-sm h-100 border-start border-5" style={{ borderColor: '#3ee80f' }}>
                            <span className="badge bg-primary mb-2">International</span>
                            <h4 className="title text-white mb-3">15th World Wushu Championships</h4>
                            <p className="text-muted">Participating in the global arena to showcase Bangladeshi talent in Wushu.</p>
                            <ul className="list-unstyled text-white mt-3">
                                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#3ee80f' }}></i> Organized by IWUF</li>
                                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#3ee80f' }}></i> Qualified Athletes only</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        )
    },
    'other-activities': {
        title: 'OTHER',
        subtitle: 'ACTIVITIES',
        activePage: 'Other Activities',
        content: (
            <div className="mt-4">
                <div className="activity-list">
                    <div className="activity-item p-4 mb-3 border rounded bg-dark d-flex align-items-center shadow-sm">
                        <div className="icon-box me-4" style={{ backgroundColor: '#3ee80f', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-users text-dark fa-lg" style={{ margin: '0 auto' }}></i>
                        </div>
                        <div>
                            <h5 className="text-white mb-1">Community Outreach Program</h5>
                            <p className="text-muted mb-0">Bringing Wushu to rural areas across Bangladesh.</p>
                        </div>
                    </div>
                    <div className="activity-item p-4 mb-3 border rounded bg-dark d-flex align-items-center shadow-sm">
                        <div className="icon-box me-4" style={{ backgroundColor: '#28a745', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-medal text-white fa-lg" style={{ margin: '0 auto' }}></i>
                        </div>
                        <div>
                            <h5 className="text-white mb-1">Athlete Welfare Fund</h5>
                            <p className="text-muted mb-0">Supporting our athletes in their professional development.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default function EventDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [dynamicEvents, setDynamicEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (slug === 'national-sports' || slug === 'international-sports') {
            setLoading(true);
            const type = slug === 'national-sports' ? 'national' : 'international';
            fetch(`/api/tournament-events?type=${type}`)
                .then(res => res.json())
                .then(data => {
                    if (data.events) setDynamicEvents(data.events);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [slug]);

    const pageData = eventContent[slug as keyof typeof eventContent];

    if (!pageData) {
        return (
            <div className="ptb-120 text-center">
                <h2 className="text-white">Page Not Found</h2>
            </div>
        );
    }

    const renderBentoGrid = () => {
        if (loading) return <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>;
        if (dynamicEvents.length === 0) return <div className="text-center py-5 text-white-50">No events found in this category.</div>;

        return (
            <div className="bento-grid mt-4">
                <style jsx>{`
                    .bento-grid {
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        gap: 20px;
                        grid-auto-rows: minmax(300px, auto);
                    }
                    .bento-item {
                        position: relative;
                        overflow: hidden;
                        border-radius: 15px;
                        background: #111;
                        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                        border: 1px solid rgba(255,255,255,0.05);
                    }
                    .bento-item:hover {
                        transform: scale(1.02);
                        z-index: 10;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                        border-color: #3ee80f;
                    }
                    .bento-item.large { grid-column: span 8; grid-row: span 2; }
                    .bento-item.medium { grid-column: span 6; grid-row: span 1; }
                    .bento-item.small { grid-column: span 4; grid-row: span 1; }
                    
                    @media (max-width: 1200px) {
                        .bento-item.large, .bento-item.medium, .bento-item.small { grid-column: span 6; }
                    }
                    @media (max-width: 768px) {
                        .bento-item.large, .bento-item.medium, .bento-item.small { grid-column: span 12; }
                        .bento-grid { grid-auto-rows: 400px; }
                    }

                    .bento-content {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        padding: 30px;
                        background: linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
                        color: white;
                    }
                    .bento-badge {
                        background: #3ee80f;
                        color: #000;
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-size: 11px;
                        margin-bottom: 10px;
                        display: inline-block;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        font-weight: bold;
                    }
                    .attachment-icons {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        display: flex;
                        gap: 10px;
                    }
                    .attachment-icon {
                        background: rgba(0,0,0,0.5);
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        backdrop-filter: blur(5px);
                        color: white;
                        font-size: 14px;
                    }
                `}</style>

                {dynamicEvents.map((event) => (
                    <div key={event._id} className={`bento-item shadow-lg ${event.gridSize || 'medium'}`}>
                        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="attachment-icons">
                            {event.videoUrl && <div className="attachment-icon" title="Video Available"><i className="fas fa-play"></i></div>}
                            {event.pdfUrl && <div className="attachment-icon" title="PDF Available"><i className="fas fa-file-pdf" style={{ color: '#3ee80f' }}></i></div>}
                        </div>
                        <div className="bento-content">
                            <span className="bento-badge">{event.type}</span>
                            <h3 className="h4 mb-2">{event.title}</h3>
                            <p className="small text-white-50 mb-3">{event.location} | {event.date}</p>
                            <Link href={`/events/details/${event._id}`} className="btn--base" style={{ padding: '8px 20px', fontSize: '13px' }}>View Details <i className="fas fa-arrow-right ml-2"></i></Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{ background: 'linear-gradient(180deg, #0a0e14 0%, #151a21 100%)', minHeight: '100vh' }}>
            <InnerBanner 
                title={pageData.title} 
                subtitle={pageData.subtitle} 
                activePage={pageData.activePage} 
                bgImage="/assets/images/bg/bg-12.png" 
            />
            
            <section className="event-detail-section ptb-120">
                <style jsx>{`
                    .bento-grid {
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        gap: 25px;
                        grid-auto-rows: minmax(320px, auto);
                    }
                    .bento-item {
                        position: relative;
                        overflow: hidden;
                        border-radius: 20px;
                        background: #1a222c;
                        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                        border: 1px solid rgba(255,255,255,0.08);
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    }
                    .bento-item:hover {
                        transform: translateY(-10px) scale(1.01);
                        z-index: 10;
                        box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                        border-color: #3ee80f;
                    }
                    .bento-item:hover .bento-overlay {
                        background: rgba(0,0,0,0.4);
                    }
                    .bento-item.large { grid-column: span 8; grid-row: span 2; }
                    .bento-item.medium { grid-column: span 6; grid-row: span 1; }
                    .bento-item.small { grid-column: span 4; grid-row: span 1; }
                    
                    @media (max-width: 1200px) {
                        .bento-item.large, .bento-item.medium, .bento-item.small { grid-column: span 6; }
                    }
                    @media (max-width: 768px) {
                        .bento-item.large, .bento-item.medium, .bento-item.small { grid-column: span 12; }
                        .bento-grid { grid-auto-rows: 450px; }
                    }

                    .bento-img-container {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }
                    
                    .bento-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.2);
                        transition: all 0.3s ease;
                    }

                    .bento-content {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        padding: 35px;
                        background: linear-gradient(0deg, rgba(8, 12, 18, 0.98) 0%, rgba(8, 12, 18, 0.8) 60%, transparent 100%);
                        color: white;
                        backdrop-filter: blur(8px);
                    }
                    .bento-badge {
                        background: linear-gradient(90deg, #3ee80f, #7af260);
                        color: #000;
                        padding: 6px 18px;
                        border-radius: 30px;
                        font-size: 10px;
                        margin-bottom: 12px;
                        display: inline-block;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        font-weight: 800;
                        box-shadow: 0 4px 15px rgba(62, 232, 15, 0.4);
                    }
                    .title-h { font-size: 24px; font-weight: 800; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
                    .attachment-icons {
                        position: absolute;
                        top: 25px;
                        right: 25px;
                        display: flex;
                        gap: 12px;
                        z-index: 5;
                    }
                    .attachment-icon {
                        background: rgba(15, 23, 42, 0.7);
                        width: 44px;
                        height: 44px;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        backdrop-filter: blur(10px);
                        color: white;
                        font-size: 16px;
                        border: 1px solid rgba(255,255,255,0.1);
                        transition: all 0.3s;
                    }
                    .attachment-icon:hover {
                        background: #3ee80f;
                        color: #000;
                        transform: scale(1.1);
                    }
                `}</style>
                <div className="container">
                    {(slug === 'national-sports' || slug === 'international-sports') ? (
                         loading ? (
                            <div className="text-center py-5"><div className="spinner-border" style={{ color: '#3ee80f' }}></div></div>
                        ) : dynamicEvents.length === 0 ? (
                            <div className="text-center py-5 text-white-50">No events found in this category.</div>
                        ) : (
                            <div className="bento-grid mt-4">
                                {dynamicEvents.map((event) => (
                                    <div key={event._id} className={`bento-item ${event.gridSize || 'medium'}`}>
                                        <div className="bento-img-container">
                                            <img src={event.image || '/assets/images/bg/bg-12.png'} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div className="bento-overlay"></div>
                                        </div>
                                        <div className="attachment-icons">
                                            {event.videoUrl && <div className="attachment-icon" title="Video Available"><i className="fas fa-play"></i></div>}
                                            {event.pdfUrl && <div className="attachment-icon" title="PDF Available"><i className="fas fa-file-pdf"></i></div>}
                                        </div>
                                        <div className="bento-content">
                                            <span className="bento-badge">{event.type}</span>
                                            <h3 className="title-h mb-2">{event.title}</h3>
                                            <p className="small text-white-70 mb-4" style={{ letterSpacing: '0.5px' }}>
                                                <i className="fas fa-map-marker-alt me-2" style={{ color: '#3ee80f' }}></i> {event.location} 
                                                <span className="mx-2">|</span> 
                                                <i className="fas fa-calendar-alt me-2" style={{ color: '#3ee80f' }}></i> {event.date}
                                            </p>
                                            <Link href={`/events/details/${event._id}`} className="btn--base btn-sm px-4">
                                                EXPLORE EVENT <i className="fas fa-chevron-right ml-2" style={{ fontSize: '10px' }}></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="section-content text-start" style={{ color: '#eee' }}>
                            {pageData.content}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
