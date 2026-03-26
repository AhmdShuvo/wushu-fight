'use client';

import React, { useState, useEffect } from 'react';

export default function Calendar() {
    const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/calendar')
            .then(res => res.json())
            .then(data => {
                if (data.events) {
                    setCalendarEvents(data.events);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch calendar events:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="ptb-80 text-center">
                <div className="container">
                    <div className="spinner-border text-danger"></div>
                    <p className="mt-3 text-white">Loading schedule...</p>
                </div>
            </div>
        );
    }

    if (calendarEvents.length === 0) {
        return null; // Or show a default message
    }

    return (
        <section id="calendar" className="calendar-section ptb-120" style={{ 
            background: 'linear-gradient(135deg, #1a0507 0%, #0d0d0d 100%)',
            borderTop: '1px solid #3d0e12',
            borderBottom: '1px solid #3d0e12' 
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 text-center">
                        <div className="section-header" data-aos="fade-up" data-aos-duration="1200">
                            <h2 className="section-title"><span>YEARLY</span> <span style={{ color: '#ff4d4d' }}>CALENDAR</span></h2>
                            <p className="text-white-50">Stay updated with our annual schedule of events, training camps, and championships across Bangladesh.</p>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-4" data-aos="fade-up" data-aos-duration="1800">
                    <div className="col-xl-12">
                        <div className="table-responsive shadow-lg" style={{ borderRadius: '15px' }}>
                            <table className="table table-bordered table-dark custom-table m-0">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '20px', fontWeight: 800 }}>MONTH</th>
                                        <th style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '20px', fontWeight: 800 }}>EVENT NAME</th>
                                        <th style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '20px', fontWeight: 800 }}>LOCATION</th>
                                        <th style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '20px', fontWeight: 800 }}>DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calendarEvents.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '15px 20px', color: '#eee', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold' }}>{item.month}</td>
                                            <td style={{ padding: '15px 20px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600 }}>{item.event}</td>
                                            <td style={{ padding: '15px 20px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                <i className="fas fa-map-marker-alt text-danger me-2"></i> {item.location}
                                            </td>
                                            <td style={{ padding: '15px 20px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                <i className="fas fa-calendar-alt text-danger me-2"></i> {item.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .custom-table { border-radius: 12px; overflow: hidden; border: none; background-color: rgba(20, 20, 20, 0.4); }
                .custom-table tbody tr { transition: all 0.3s; }
                .custom-table tbody tr:hover { background-color: rgba(220, 53, 69, 0.1) !important; transform: scale(1.005); }
                .custom-table tbody td { border-right: 1px solid rgba(255,255,255,0.05); border-left: none; }
                .custom-table tbody td:last-child { border-right: none; }
                @media (max-width: 767px) {
                    .section-title { font-size: 32px; }
                }
            `}</style>
        </section>
    );
}
