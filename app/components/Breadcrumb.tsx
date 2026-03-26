import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
    title: string;
    subtitle?: string; // Optional: "US" in "ABOUT US" could be separate if we want specific coloring, but title usually handles it.
    currentPage: string;
    bgImage?: string;
}

export default function Breadcrumb({ title, currentPage, bgImage = "bg-12.png" }: BreadcrumbProps) {
    // Handling the split styling "ABOUT US" -> "ABOUT <span>US</span>" if passed as plain string might be tricky without parsing.
    // simpler to pass title as ReactNode or just handle specific cases, but for now let's assume simple text or simple split.
    // In the template: <h1>ABOUT <span>US</span></h1>. 
    // I'll assume the title prop contains the full text. If specific span needed, we can improve.
    // Actually, looking at `about.html`: `<h1>ABOUT <span>US</span></h1>`.
    // Let's allow passing a react node or simple string.

    return (
        <>
            <section className="banner-section banner-section-two inner-banner-section bg-overlay-red bg_img" data-background={`/assets/images/bg/${bgImage}`} style={{ backgroundImage: `url('/assets/images/bg/${bgImage}')` }}>
                <div className="section-logo-text">
                    <span className="title">Wushu</span>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-end mb-30-none">
                        <div className="col-xl-12 col-lg-12 text-center mb-30">
                            <div className="banner-content" data-aos="fade-up" data-aos-duration="1800">
                                <h1 className="title" dangerouslySetInnerHTML={{ __html: title }}></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="breadcrumb-area">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
                    </ol>
                </nav>
            </div>
        </>
    );
}
