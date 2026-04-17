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
            <p className="mt-3" style={{ fontSize: '15px', color: 'inherit', lineHeight: '1.8', textAlign: 'justify' }}>
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

    console.log("RENDERING HOME GRID WITH BG:", gridData.sectionBackground || '/assets/images/bg/bg-1.png');

    return (
        <section className="home-content-section pt-120 pb-120 bg_img dynamic-bg" style={{ 
            backgroundAttachment: 'fixed',
            position: 'relative'
        }}>
            {/* Background Image managed via CSS below */}
            <div className="section-overlay" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.7)', 
                zIndex: 0 
            }}></div>

            <div className="container-fluid" style={{ padding: '0 5%', position: 'relative', zIndex: 1 }}>
                <div className="row g-4 gy-4">
                    {/* Part 1: Messages area (4 Units) */}
                    <div className="col-xl-4 col-lg-5">
                        <div className="d-flex flex-column gap-4">
                            {/* President */}
                            <div className="content-card p-5 position-relative overflow-hidden" 
                                 style={{ 
                                     backgroundColor: 'rgba(20, 20, 20, 0.75)', 
                                     backdropFilter: 'blur(15px)',
                                     border: '1px solid rgba(255, 255, 255, 0.1)',
                                     borderLeft: '8px solid #3ee80f',
                                     color: '#fff'
                                 }}>
                                <div className="d-flex align-items-center mb-4 gap-4">
                                    <div style={{ position: 'relative', width: '100px', height: '100px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)', flexShrink: 0, boxShadow: '0 8px 15px rgba(0,0,0,0.3)', marginRight: '25px' }}>
                                        {gridData.president.image ? (
                                            <Image src={gridData.president.image} alt="President of Bangladesh Wushu Federation" fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className="bg-dark w-100 h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="title mb-1" style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{gridData.president.title}</h4>
                                        <span className="text--acc small font-weight-bold letter-spacing-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>Leadership Message</span>
                                    </div>
                                </div>
                                <div className="text-white" style={{ lineHeight: '1.7' }}>
                                    <ReadMoreText text={gridData.president.content} limit={40} />
                                </div>
                            </div>

                            {/* Secretary */}
                            <div className="content-card p-5 position-relative overflow-hidden" 
                                 style={{ 
                                     backgroundColor: 'rgba(20, 20, 20, 0.75)', 
                                     backdropFilter: 'blur(15px)',
                                     border: '1px solid rgba(255, 255, 255, 0.1)',
                                     borderLeft: '8px solid #333',
                                     color: '#fff'
                                 }}>
                                <div className="d-flex align-items-center mb-4 gap-4">
                                    <div style={{ position: 'relative', width: '100px', height: '100px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)', flexShrink: 0, boxShadow: '0 8px 15px rgba(0,0,0,0.3)', marginRight: '25px' }}>
                                        {gridData.secretary.image ? (
                                            <Image src={gridData.secretary.image} alt="Secretary General of Bangladesh Wushu Federation" fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className="bg-dark w-100 h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="title mb-1" style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{gridData.secretary.title}</h4>
                                        <span className="text-white-50 small font-weight-bold letter-spacing-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>Executive Directive</span>
                                    </div>
                                </div>
                                <div className="text-white" style={{ lineHeight: '1.7' }}>
                                    <ReadMoreText text={gridData.secretary.content} limit={40} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Part 2: Information Area (8 Units) */}
                    <div className="col-xl-8 col-lg-7">
                        <div className="d-flex flex-column gap-4">
                            {/* History (Styled like About Page design) */}
                            <div className="history-section p-5 shadow-lg position-relative" 
                                 style={{ 
                                     overflow: 'hidden', 
                                     backgroundColor: 'rgba(255, 255, 255, 0.04)', 
                                     backdropFilter: 'blur(10px)',
                                     border: '1px solid rgba(255,255,255,0.08)'
                                 }}>
                                <div className="row align-items-center g-4">
                                    <div className="col-md-5">
                                        <div className="history-image-frame position-relative" style={{ height: '350px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
                                            <Image src={gridData.history.image || '/assets/images/bg/bg-11.png'} alt="History of Wushu in Bangladesh - BWUF" fill style={{ objectFit: 'cover' }} />
                                            <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 100%)' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="section-header mb-0">
                                            <h4 className="text--acc mb-2 font-weight-bold" style={{ fontSize: '14px', letterSpacing: '4px' }}>{gridData.history.subtitle || 'ESTABLISHED 1986'}</h4>
                                            <h2 className="text-white mb-4 h1 font-weight-bold">{gridData.history.title}</h2>
                                            <div className="text-white" style={{ lineHeight: '1.8' }}>
                                                <ReadMoreText text={gridData.history.content} limit={120} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About BWUF */}
                            <div className="about-grid-card p-5 position-relative overflow-hidden" 
                                 style={{ 
                                     backgroundColor: 'rgba(62, 232, 15, 0.08)', 
                                     backdropFilter: 'blur(5px)',
                                     border: '1px solid rgba(62, 232, 15, 0.3)',
                                     boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                 }}>
                                <div className="row g-4 align-items-center">
                                    <div className="col-lg-7">
                                        <h4 className="text--acc mb-2 font-weight-bold" style={{ fontSize: '14px', letterSpacing: '4px' }}>{gridData.about.subtitle || 'OUR STORY'}</h4>
                                        <h2 className="text-white mb-4 h1 font-weight-bold">{gridData.about.title}</h2>
                                        <div className="text-white" style={{ lineHeight: '1.8' }}>
                                            <ReadMoreText text={gridData.about.content} limit={100} />
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="about-stats-container position-relative" style={{ height: '300px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
                                            <Image src={gridData.about.image || '/assets/images/bg/bg-12.png'} alt="About Bangladesh Wushu Federation - Wushubd" fill style={{ objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .dynamic-bg {
                    background-image: url("${gridData.sectionBackground || '/assets/images/bg/bg-1.png'}") !important;
                }
                .content-card, .history-section, .about-grid-card { 
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); 
                    border-radius: 4px;
                    margin: 10px 0;
                }
                .content-card:hover, .history-section:hover, .about-grid-card:hover { 
                    transform: translateY(-8px); 
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6) !important;
                    border-color: rgba(62, 232, 15, 0.4) !important;
                }
                .overflow-hidden { overflow: hidden; }
                .letter-spacing-1 { letter-spacing: 1px; }
                .text--acc { color: #3ee80f !important; }
            `}</style>
        </section>
    );
}

