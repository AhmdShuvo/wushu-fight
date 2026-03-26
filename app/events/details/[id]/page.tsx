'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import InnerBanner from '@/app/components/InnerBanner';
import Link from 'next/link';

export default function EventDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/tournament-events/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.event) setEvent(data.event);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="ptb-120 text-center"><div className="spinner-border text-danger"></div></div>;
    if (!event) return <div className="ptb-120 text-center text-white"><h2>Event not found</h2></div>;

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
            <InnerBanner 
                title={event.title} 
                subtitle={event.type.toUpperCase()} 
                activePage="Event Details" 
                bgImage={event.image} 
            />

            <section className="event-details ptb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="event-main-content rounded overflow-hidden shadow-lg mb-5" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                <img src={event.image} alt={event.title} className="w-100" style={{ maxHeight: '600px', objectFit: 'cover' }} />
                                <div className="p-5">
                                    <h2 className="text-white mb-4" style={{ fontSize: '36px' }}>{event.title}</h2>
                                    <div className="d-flex flex-wrap gap-4 mb-5 pb-4 border-bottom border-secondary">
                                        <div className="d-flex align-items-center text-white-50">
                                            <i className="fas fa-calendar-alt text-danger me-2 fa-lg"></i>
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="d-flex align-items-center text-white-50">
                                            <i className="fas fa-map-marker-alt text-danger me-2 fa-lg"></i>
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="d-flex align-items-center text-white-50 text-uppercase font-weight-bold">
                                            <i className="fas fa-trophy text-danger me-2 fa-lg"></i>
                                            <span>{event.type} Competition</span>
                                        </div>
                                    </div>
                                    <div className="description text-white-50 mb-5" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                                        {event.description}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="sidebar p-4 rounded shadow-sm sticky-top" style={{ backgroundColor: '#111', border: '1px solid #333', top: '100px' }}>
                                <h4 className="text-white mb-4 pb-2 border-bottom border-danger">Attachments</h4>
                                
                                {event.videoUrl ? (
                                    <div className="attachment-item mb-4 bg-dark p-3 rounded d-flex align-items-center justify-content-between border-start border-danger border-4">
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-play-circle text-danger me-3 fa-2x"></i>
                                            <div>
                                                <h6 className="text-white mb-0">Event Video</h6>
                                                <span className="text-muted small">Watch Highlights</span>
                                            </div>
                                        </div>
                                        <a href={event.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-danger">Watch <i className="fas fa-external-link-alt ms-1"></i></a>
                                    </div>
                                ) : (
                                    <p className="text-muted small">No video available for this event.</p>
                                )}

                                {event.pdfUrl ? (
                                    <div className="attachment-item mb-4 bg-dark p-3 rounded d-flex align-items-center justify-content-between border-start border-primary border-4">
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-file-pdf text-primary me-3 fa-2x"></i>
                                            <div>
                                                <h6 className="text-white mb-0">Documents</h6>
                                                <span className="text-muted small">PDF Resource</span>
                                            </div>
                                        </div>
                                        <a href={event.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">View <i className="fas fa-download ms-1"></i></a>
                                    </div>
                                ) : (
                                    <p className="text-muted small">No PDF documents available.</p>
                                )}

                                <div className="mt-5">
                                    <Link href={`/events/${event.type === 'national' ? 'national-sports' : 'international-sports'}`} className="btn--base w-100 text-center">
                                        Back to All Events <i className="fas fa-arrow-left ms-2 order-first"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
