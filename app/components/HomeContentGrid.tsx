'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function ReadMoreText({ text, limit = 100 }: { text: string; limit?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    if (!text) return null;

    const words = text.split(/\s+/);
    const shouldTruncate = words.length > limit;
    const displayText = isExpanded ? text : words.slice(0, limit).join(' ') + (shouldTruncate ? '...' : '');

    return (
        <>
            <p className="mt-3" style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', textAlign: 'justify' }}>
                {displayText}
            </p>
            {shouldTruncate && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="btn-read-more"
                    style={{ background: 'none', border: 'none', color: '#3ee80f', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
                >
                    {isExpanded ? 'See Less' : 'See More...'}
                </button>
            )}
        </>
    );
}

export default function HomeContentGrid() {
    const [gridData, setGridData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/home-grid', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                console.log("HOME GRID DATA FETCHED:", data.grid);
                if (data.grid) {
                    setGridData(data.grid);
                }
            });
    }, []);

    if (!gridData) {
        return (
            <div className="ptb-80 text-center">
                <div className="container">
                    <div className="spinner-border text--acc"></div>
                    <p className="mt-3">Loading content...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="home-content-section pt-120 pb-120" style={{ backgroundColor: '#fff' }}>
            <div className="container-fluid" style={{ padding: '0 5%' }}>
                <div className="row g-5 gy-5">
                    {/* Part 1: Messages area (4 Units) */}
                    <div className="col-xl-4 col-lg-5">
                        <div className="d-flex flex-column gap-5">
                            {/* President */}
                            <div className="content-card p-5 border shadow-sm bg-white position-relative overflow-hidden" style={{ borderLeft: '10px solid #3ee80f' }}>
                                <div className="d-flex align-items-center mb-4 gap-4">
                                    <div style={{ position: 'relative', width: '100px', height: '100px', overflow: 'hidden', border: '4px solid #f8f9fa', flexShrink: 0, boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}>
                                        {gridData.president.image ? (
                                            <Image src={gridData.president.image} alt="President" fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="title mb-1" style={{ fontSize: '20px', fontWeight: 800, color: '#111' }}>{gridData.president.title}</h4>
                                        {/* <span className="text--acc small font-weight-bold letter-spacing-1">LEADERSHIP MESSAGE</span> */}
                                    </div>
                                </div>
                                <ReadMoreText text={gridData.president.content} limit={40} />
                            </div>

                            {/* Secretary */}
                            <div className="content-card p-5 border shadow-sm bg-white position-relative overflow-hidden" style={{ borderLeft: '10px solid #333' }}>
                                <div className="d-flex align-items-center mb-4 gap-4">
                                    <div style={{ position: 'relative', width: '100px', height: '100px', overflow: 'hidden', border: '4px solid #f8f9fa', flexShrink: 0, boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}>
                                        {gridData.secretary.image ? (
                                            <Image src={gridData.secretary.image} alt="Secretary" fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="title mb-1" style={{ fontSize: '20px', fontWeight: 800, color: '#111' }}>{gridData.secretary.title}</h4>
                                        {/* <span className="text-muted small font-weight-bold letter-spacing-1">EXECUTIVE INSIGHT</span> */}
                                    </div>
                                </div>
                                <ReadMoreText text={gridData.secretary.content} limit={40} />
                            </div>
                        </div>
                    </div>

                    {/* Part 2: Information Area (8 Units) */}
                    <div className="col-xl-8 col-lg-7">
                        <div className="d-flex flex-column gap-5">
                            {/* History (Styled like About Page design) */}
                            <div className="history-section p-5 shadow-lg bg-light h-100" style={{ overflow: 'hidden', border: '1px solid #eee' }}>
                                <div className="row align-items-center g-4">
                                    <div className="col-md-5">
                                        <div className="history-image-frame position-relative" style={{ height: '350px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
                                            <Image src={gridData.history.image || '/assets/images/bg/bg-11.png'} alt="History" fill style={{ objectFit: 'cover' }} />
                                            <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 100%)' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="section-header mb-0">
                                            <h4 className="text--acc mb-2 font-weight-bold" style={{ fontSize: '14px', letterSpacing: '4px' }}>{gridData.history.subtitle || 'ESTABLISHED 1986'}</h4>
                                            <h2 className="text-dark mb-4 h1 font-weight-bold">{gridData.history.title}</h2>
                                            <ReadMoreText text={gridData.history.content} limit={120} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About BWUF */}
                            <div className="about-grid-card p-5 border border-secondary bg-white shadow-sm position-relative overflow-hidden" style={{ borderLeft: '1px solid #eee' }}>
                                <div className="row g-4 align-items-center">
                                    <div className="col-lg-7">
                                        <h4 className="text--acc mb-2 font-weight-bold" style={{ fontSize: '14px', letterSpacing: '4px' }}>{gridData.about.subtitle || 'OUR STORY'}</h4>
                                        <h2 className="text-dark mb-4 h1 font-weight-bold">{gridData.about.title}</h2>
                                        <ReadMoreText text={gridData.about.content} limit={100} />
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="about-stats-container position-relative" style={{ height: '300px', overflow: 'hidden' }}>
                                            <Image src={gridData.about.image || '/assets/images/bg/bg-12.png'} alt="About" fill style={{ objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .content-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .content-card:hover { transform: translateY(-5px); box-shadow: 0 30px 60px rgba(0,0,0,0.12) !important; }
                .overflow-hidden { overflow: hidden; }
                .letter-spacing-1 { letter-spacing: 1px; }
                .text--acc { color: #3ee80f !important; }
            `}</style>
        </section>
    );
}

