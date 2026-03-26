'use client';

import React, { useState, useEffect } from 'react';

export default function Gallery() {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => setImages(data.images || []));
    }, []);

    if (images.length === 0) return null;

    return (
        <section className="gallery-section py-5 overflow-hidden" id="gallery" style={{ background: '#080808' }}>
            <div className="container-fluid px-lg-5 py-5">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-7 text-center">
                        <div className="reveal-text">
                            <span
                                className="text-danger fw-black text-uppercase tracking-widest mb-2 d-block"
                                data-aos="fade-down"
                                data-aos-delay="100"
                            >
                                / Artifacts of Power
                            </span>
                            <h2
                                className="display-3 fw-bold text-white mb-0"
                                data-aos="zoom-out"
                                data-aos-delay="300"
                                style={{ letterSpacing: '-2px' }}
                            >
                                THE GALLERY
                            </h2>
                        </div>
                        <div
                            className="bg-danger mx-auto mt-4"
                            style={{ width: '40px', height: '2px' }}
                            data-aos="width-expand"
                        ></div>
                    </div>
                </div>

                {/* Using global class 'complex-grid' defined in globals.css */}
                <div className="complex-grid">
                    {images.map((item, index) => {
                        // Define complex grid positions for a 12-column system
                        const patternIndex = index % 8;
                        let gridClass = "";

                        switch (patternIndex) {
                            case 0: gridClass = "grid-area-1"; break; // Big square
                            case 1: gridClass = "grid-area-2"; break; // Vertical rectangle
                            case 2: gridClass = "grid-area-3"; break; // Horizontal rectangle
                            case 3: gridClass = "grid-area-4"; break; // Small square
                            case 4: gridClass = "grid-area-5"; break; // Small square
                            case 5: gridClass = "grid-area-6"; break; // Big rectangle
                            case 6: gridClass = "grid-area-7"; break; // Horizontal
                            case 7: gridClass = "grid-area-8"; break; // Vertical
                        }

                        const aosDelay = (index % 4) * 100;

                        return (
                            <div
                                key={item._id}
                                className={`gallery-item-container ${gridClass}`}
                                data-aos="fade-up"
                                data-aos-delay={aosDelay}
                            >
                                <div className="gallery-inner group">
                                    <div className="image-wrapper">
                                        <img
                                            src={`/assets/images/gallery/${item.imageUrl}`}
                                            alt={item.title}
                                            className="main-image"
                                        />
                                        <div className="vignette"></div>
                                        <div className="noise"></div>
                                    </div>

                                    <div className="info-box">
                                        <div className="info-content">
                                            <div className="cat-badge">{item.category}</div>
                                            <h4 className="title-text">{item.title}</h4>
                                        </div>
                                        <div className="corner-accent"></div>
                                    </div>

                                    <div className="border-top-right"></div>
                                    <div className="border-bottom-left"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Styles removed from here and moved to global.css to ensure robustness */}
        </section>
    );
}
