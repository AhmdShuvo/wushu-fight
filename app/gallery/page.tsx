'use client';

import React, { useState, useEffect } from 'react';
import InnerBanner from '../components/InnerBanner';

interface GalleryItem {
    _id: string;
    imageUrl: string;
    title: string;
    category: string;
}

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const categories = [
        { name: 'All', filter: 'all' },
        { name: 'Action', filter: 'Action' },
        { name: 'Ceremony', filter: 'Ceremony' },
        { name: 'Training', filter: 'Training' },
        { name: 'Competition', filter: 'Competition' },
        { name: 'Others', filter: 'Others' }
    ];

    const fetchData = (p = 1, cat = category) => {
        setLoading(true);
        fetch(`/api/gallery?page=${p}&category=${cat}&limit=20`)
            .then(res => res.json())
            .then(data => {
                if (data.items) {
                    setItems(data.items);
                    setTotalPages(data.totalPages);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        setPage(1);
        fetchData(1, cat);
    };

    const handlePageChange = (p: number) => {
        setPage(p);
        fetchData(p, category);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    // Bento Grid Span Logic (12-column system)
    const getBentoClass = (index: number) => {
        const pattern = [
            'col-span-8 row-span-2', // 0: Big Featured
            'col-span-4 row-span-1', // 1: Small
            'col-span-4 row-span-1', // 2: Small
            'col-span-6 row-span-2', // 3: Medium Square
            'col-span-6 row-span-1', // 4: Landscape
            'col-span-3 row-span-1', // 5: Thin
            'col-span-3 row-span-1', // 6: Thin
            'col-span-4 row-span-2', // 7: Tall Portrait
            'col-span-8 row-span-1', // 8: Super Wide
        ];
        return pattern[index % pattern.length];
    };

    return (
        <div className="gallery-page-root">
            <InnerBanner title="WATCH OUR" subtitle="LEGACY" bgImage="/assets/images/bg/bg-12.png" activePage="Gallery" />

            <section className="gallery-section ptb-120 bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center mb-60">
                            <div className="section-header" data-aos="fade-up">
                                <h2 className="section-title text-black">BENTO <span>STORAGE</span></h2>
                                <p className="text-secondary">A modular, high-impact collection of Wushu Bangladesh greatness.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation Bar (Glassy White) */}
                    <div className="gallery-nav-bar mb-60 text-center">
                        <div className="bento-pill-group">
                            {categories.map((cat) => (
                                <button 
                                    key={cat.filter} 
                                    onClick={() => handleCategoryChange(cat.filter)}
                                    className={`bento-pill ${category === cat.filter ? 'active' : ''}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                            <div className="text-center py-120">
                                <div className="spinner-border text-acc-green lg"></div>
                                <p className="mt-4 text-dark text-uppercase tracking-max">Packing Bento Boxes...</p>
                            </div>
                        ) : (
                            <div className="bento-grid-master">
                                {items.map((item, index) => (
                                    <div 
                                        key={item._id} 
                                        className={`bento-box-item ${getBentoClass(index)}`}
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        <div className="bento-card">
                                            <img src={item.imageUrl} alt={item.title} className="bento-img" />
                                            <div className="bento-overlay">
                                                <div className="bento-content">
                                                    <div className="bento-tag">{item.category}</div>
                                                    <h4 className="bento-title-text">{item.title || 'Wushu Bangladesh'}</h4>
                                                    <div className="bento-zoom"><i className="fas fa-expand-alt"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Simple Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination-wrapper-bento mt-80">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`bento-page-dot ${page === i + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Premium Lightbox */}
                {selectedImage && (
                    <div className="bento-lightbox-master" onClick={() => setSelectedImage(null)}>
                        <div className="bento-backdrop"></div>
                        <div className="bento-container-inner" onClick={(e) => e.stopPropagation()}>
                            <button className="bento-close" onClick={() => setSelectedImage(null)}>&times;</button>
                            <div className="bento-frame">
                                <img src={selectedImage.imageUrl} alt={selectedImage.title} className="bento-full-img" />
                                <div className="bento-info-box">
                                    <h3>{selectedImage.title}</h3>
                                    <p className="bento-cat-text">{selectedImage.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style jsx global>{`
                    .gallery-page-root { background: #fff; }
                    .text-acc-green { color: #3ee80f !important; }
                    
                    /* BENTO ENGINE */
                    .bento-grid-master {
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        grid-auto-rows: 240px;
                        gap: 15px;
                    }
                    .bento-box-item {
                        position: relative;
                        border-radius: 20px;
                        overflow: hidden;
                        cursor: pointer;
                        background: #fdfdfd;
                        border: 1px solid #f0f0f0;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.02);
                    }
                    
                    /* 12-Column Spans */
                    .col-span-12 { grid-column: span 12; }
                    .col-span-8 { grid-column: span 8; }
                    .col-span-6 { grid-column: span 6; }
                    .col-span-4 { grid-column: span 4; }
                    .col-span-3 { grid-column: span 3; }
                    .row-span-2 { grid-row: span 2; }
                    .row-span-1 { grid-row: span 1; }

                    @media (max-width: 991px) {
                        .bento-grid-master { grid-template-columns: repeat(6, 1fr); grid-auto-rows: 180px; }
                        .col-span-8, .col-span-4, .col-span-6, .col-span-3 { grid-column: span 3; grid-row: span 1; }
                    }
                    @media (max-width: 575px) {
                        .bento-grid-master { grid-template-columns: 1fr; grid-auto-rows: 320px; }
                        .bento-box-item { grid-column: span 1 !important; grid-row: span 1 !important; }
                    }

                    .bento-card { width: 100%; height: 100%; position: relative; transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1); }
                    .bento-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
                    .bento-card:hover .bento-img { transform: scale(1.08) rotate(1deg); }
                    
                    .bento-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
                        display: flex;
                        align-items: flex-end;
                        padding: 30px;
                        opacity: 0;
                        transition: all 0.4s ease;
                    }
                    .bento-card:hover .bento-overlay { opacity: 1; }
                    
                    .bento-content { width: 100%; position: relative; }
                    .bento-tag { color: #3ee80f; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; }
                    .bento-title-text { color: #fff; font-size: 20px; font-weight: 700; font-family: 'Kanit', sans-serif; margin: 0; }
                    .bento-zoom { position: absolute; top: 0; right: 0; color: #fff; font-size: 22px; opacity: 0; transform: translateY(20px); transition: all 0.5s; }
                    .bento-card:hover .bento-zoom { opacity: 1; transform: translateY(0); }

                    /* Bento Navigation */
                    .bento-pill-group {
                        display: inline-flex;
                        padding: 8px;
                        background: #f8f9fa;
                        border: 1px solid #eee;
                        border-radius: 60px;
                        gap: 10px;
                    }
                    .bento-pill {
                       background: transparent; border: none; color: #666;
                       font-weight: 700; font-size: 13px; padding: 10px 28px;
                       border-radius: 50px; text-transform: uppercase; transition: all 0.3s;
                    }
                    .bento-pill.active { background: #3ee80f; color: #fff; box-shadow: 0 4px 15px rgba(62,232,15,0.2); }

                    /* Lightbox - Bento Style */
                    .bento-lightbox-master {
                        position: fixed !important;
                        inset: 0 !important;
                        z-index: 2000000 !important;
                        display: flex;
                        align-items: center; justify-content: center; padding: 20px;
                    }
                    .bento-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.95); backdrop-filter: blur(25px); }
                    .bento-container-inner { position: relative; z-index: 10; max-width: 85vw; animation: bentoPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                    .bento-close { position: absolute; top: -50px; right: 0; color: #fff; font-size: 45px; background: none; border: none; cursor: pointer; }
                    .bento-frame { background: #fff; padding: 12px; border-radius: 25px; box-shadow: 0 40px 100px rgba(0,0,0,0.9); border: 1px solid rgba(255,255,255,0.2); }
                    .bento-full-img { max-width: 100%; max-height: 70vh; border-radius: 18px; display: block; }
                    .bento-info-box { padding: 25px 0 10px; text-align: center; }
                    .bento-info-box h3 { color: #111; font-weight: 800; font-family: 'Kanit', sans-serif; text-transform: uppercase; font-size: 24px; }
                    .bento-cat-text { color: #3ee80f; font-weight: 900; letter-spacing: 2px; font-size: 12px; text-transform: uppercase; margin-top: 5px; }

                    .bento-page-dot {
                       width: 44px; height: 44px; border-radius: 12px;
                       border: 1px solid #eee; background: #fff;
                       color: #333; font-weight: 800; margin: 0 6px;
                       transition: all 0.3s;
                    }
                    .bento-page-dot.active { border-radius: 50%; background: #3ee80f; border-color: #3ee80f; color: #fff; }

                    @keyframes bentoPop { from { opacity: 0; transform: scale(0.8) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                    .tracking-max { letter-spacing: 5px; }

                @keyframes bentoPop { from { opacity: 0; transform: scale(0.8) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                .tracking-max { letter-spacing: 5px; }
            `}</style>
        </div>
    );
}
