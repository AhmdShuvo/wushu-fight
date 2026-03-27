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
    const [calendarEvents, setCalendarEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (slug === 'national-sports' || slug === 'international-sports' || slug === 'other-activities') {
            setLoading(true);
            const typeMap: Record<string, string> = {
                'national-sports': 'national',
                'international-sports': 'international',
                'other-activities': 'other'
            };
            const type = typeMap[slug];
            fetch(`/api/tournament-events?type=${type}`)
                .then(res => res.json())
                .then(data => {
                    if (data.events) setDynamicEvents(data.events);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else if (slug === 'yearly-calendar') {
            setLoading(true);
            fetch('/api/calendar')
                .then(res => res.json())
                .then(data => {
                    if (data.events) setCalendarEvents(data.events);
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



    return (
        <div style={{ background: 'linear-gradient(180deg, #0a0e14 0%, #151a21 100%)', minHeight: '100vh' }}>
            <InnerBanner 
                title={pageData.title} 
                subtitle={pageData.subtitle} 
                activePage={pageData.activePage} 
                bgImage="/assets/images/bg/bg-12.png" 
            />
            
            <section className="event-detail-section ptb-120">

                <div className="container">
                    {(slug === 'national-sports' || slug === 'international-sports' || slug === 'other-activities') ? (
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
                                            <h3 className="title-h mb-2" style={{ color: '#fff' }}>{event.title}</h3>
                                            <p className="small text-white mb-4" style={{ letterSpacing: '0.5px' }}>
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
                    ) : slug === 'yearly-calendar' ? (
                        loading ? (
                            <div className="text-center py-5"><div className="spinner-border" style={{ color: '#3ee80f' }}></div></div>
                        ) : (
                            <div className="table-responsive mt-4">
                                <table className="table table-bordered table-dark custom-table">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: '#3ee80f', color: '#000', padding: '15px' }}>Month</th>
                                            <th style={{ backgroundColor: '#3ee80f', color: '#000', padding: '15px' }}>Event Name</th>
                                            <th style={{ backgroundColor: '#3ee80f', color: '#000', padding: '15px' }}>Location</th>
                                            <th style={{ backgroundColor: '#3ee80f', color: '#000', padding: '15px' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calendarEvents.length > 0 ? (
                                            calendarEvents.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>{item.month}</td>
                                                    <td style={{ padding: '15px', color: '#fff' }}>{item.event}</td>
                                                    <td style={{ padding: '15px', color: '#fff' }}>{item.location}</td>
                                                    <td style={{ padding: '15px', color: '#fff' }}>{item.date}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={4} className="text-center py-4 text-white-50">No calendar events found.</td></tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        )
                    ) : (
                        <div className="section-content text-start" style={{ color: '#fff' }}>
                            {pageData.content}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
