'use client';

import React from 'react';
import Link from 'next/link';

interface InnerBannerProps {
    title: string;
    subtitle: string; // The span inside h1
    bgImage: string;
    activePage: string;
}

export default function InnerBanner({ title, subtitle, bgImage, activePage }: InnerBannerProps) {
    return (
        <>
            <section className="banner-section banner-section-two inner-banner-section bg_img" data-background={bgImage} style={{ backgroundImage: `url('${bgImage}')`, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(62,232,15,0.4) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }}></div>
                <div className="section-logo-text" style={{ zIndex: 2 }}>
                    <span className="title">Wushu</span>
                </div>
                <div className="container-fluid" style={{ position: 'relative', zIndex: 3 }}>
                    <div className="row justify-content-center align-items-end mb-30-none">
                        <div className="col-xl-12 col-lg-12 text-center mb-30">
                            <div className="banner-content" data-aos="fade-up" data-aos-duration="1800">
                                <h1 className="title" style={{ color: '#fff' }}>{title} <span style={{ color: '#3ee80f' }}>{subtitle}</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="breadcrumb-area" style={{ backgroundColor: '#000', borderBottom: '1px solid #111' }}>
                <nav aria-label="breadcrumb" className="container">
                    <ol className="breadcrumb mb-0" style={{ backgroundColor: 'transparent', padding: '15px 0' }}>
                        <li className="breadcrumb-item"><Link href="/" style={{ color: '#aaa' }}>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" style={{ color: '#3ee80f', fontWeight: 'bold' }}>{activePage}</li>
                    </ol>
                </nav>
            </div>
            <style>{`
                .breadcrumb-item + .breadcrumb-item::before { color: #444; }
            `}</style>
        </>
    );
}
