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
            <section className="banner-section banner-section-two inner-banner-section bg-overlay-red bg_img" data-background={bgImage} style={{ backgroundImage: `url('${bgImage}')` }}>
                <div className="section-logo-text">
                    <span className="title">Wushu</span>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-end mb-30-none">
                        <div className="col-xl-12 col-lg-12 text-center mb-30">
                            <div className="banner-content" data-aos="fade-up" data-aos-duration="1800">
                                <h1 className="title">{title} <span>{subtitle}</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="breadcrumb-area">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{activePage}</li>
                    </ol>
                </nav>
            </div>
        </>
    );
}
