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
                    style={{ background: 'none', border: 'none', color: '#dc3545', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
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
        fetch('/api/home-grid')
            .then(res => res.json())
            .then(data => {
                if (data.grid) {
                    setGridData(data.grid);
                }
            });
    }, []);

    if (!gridData) {
        return (
            <div className="ptb-80 text-center">
                <div className="container">
                    <div className="spinner-border text-danger"></div>
                    <p className="mt-3">Loading content...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="home-content-section ptb-80" style={{ backgroundColor: '#fff' }}>
            <div className="container-fluid" style={{ padding: '0 5%' }}>
                <div className="row g-4 justify-content-center">
                    {/* President */}
                    <div className="col-lg-3 col-md-6 mb-30">
                        <div className="content-card h-100 p-4 border rounded shadow-sm text-center">
                            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #f8f9fa', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                                {gridData.president.image ? (
                                    <Image src={gridData.president.image} alt="President" fill style={{ objectFit: 'cover' }} />
                                ) : (
                                    <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
                                )}
                            </div>
                            <h4 className="title mb-3 pb-3" style={{ borderBottom: '2px solid #dc3545', fontSize: '18px', fontWeight: 700 }}>
                                {gridData.president.title}
                            </h4>
                            <ReadMoreText text={gridData.president.content} />
                        </div>
                    </div>

                    {/* History */}
                    <div className="col-lg-3 col-md-6 mb-30">
                        <div className="content-card h-100 p-4 border rounded shadow-sm">
                            <h4 className="title text-center mb-4 pb-3" style={{ borderBottom: '2px solid #dc3545', fontSize: '18px', fontWeight: 700 }}>
                                {gridData.history.title}
                            </h4>
                            <ReadMoreText text={gridData.history.content} />
                        </div>
                    </div>

                    {/* About */}
                    <div className="col-lg-3 col-md-6 mb-30">
                        <div className="content-card h-100 p-4 border rounded shadow-sm">
                            <h4 className="title text-center mb-4 pb-3" style={{ borderBottom: '2px solid #dc3545', fontSize: '18px', fontWeight: 700 }}>
                                {gridData.about.title}
                            </h4>
                            <ReadMoreText text={gridData.about.content} />
                        </div>
                    </div>

                    {/* Secretary */}
                    <div className="col-lg-3 col-md-6 mb-30">
                        <div className="content-card h-100 p-4 border rounded shadow-sm text-center">
                            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #f8f9fa', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                                {gridData.secretary.image ? (
                                    <Image src={gridData.secretary.image} alt="General Secretary" fill style={{ objectFit: 'cover' }} />
                                ) : (
                                    <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
                                )}
                            </div>
                            <h4 className="title mb-3 pb-3" style={{ borderBottom: '2px solid #dc3545', fontSize: '18px', fontWeight: 700 }}>
                                {gridData.secretary.title}
                            </h4>
                            <ReadMoreText text={gridData.secretary.content} />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .content-card { transition: all 0.3s ease; background: #fff; }
                .content-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
            `}</style>
        </section>
    );
}

