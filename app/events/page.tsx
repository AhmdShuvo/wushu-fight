'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InnerBanner from '../components/InnerBanner';

export default function Events() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tournament-events')
            .then(res => res.json())
            .then(data => {
                if (data.events) setEvents(data.events);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div style={{ background: 'linear-gradient(180deg, #0a0e14 0%, #151a21 100%)', minHeight: '100vh' }}>
            <InnerBanner title="ALL" subtitle="EVENTS" bgImage="/assets/images/bg/bg-12.png" activePage="Events" />
            
            <section className="event-detail-section ptb-120">

                <div className="container">
                    {loading ? (
                        <div className="text-center py-5"><div className="spinner-border" style={{ color: '#3ee80f' }}></div></div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-5 text-white-50">No events found.</div>
                    ) : (
                        <div className="bento-grid mt-4">
                            {events.map((event) => (
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
                                        <span className="bento-badge" style={{ background: event.type === 'national' ? 'linear-gradient(90deg, #3ee80f, #7af260)' : event.type === 'international' ? 'linear-gradient(90deg, #007bff, #00d2ff)' : 'linear-gradient(90deg, #ffc107, #ff9800)' }}>
                                            {event.type}
                                        </span>
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
                    )}
                </div>
            </section>
        </div>
    );
}
