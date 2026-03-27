'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Banner() {
    const [bannersData, setBannersData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch banner data on client side
    useEffect(() => {
        fetch('/api/banner')
            .then(res => res.json())
            .then(data => {
                if (data.banners) {
                    setBannersData(data.banners);
                }
            })
            .catch(err => console.error('Could not load banner', err))
            .finally(() => setIsLoading(false));
    }, []);

    // Initialize Swiper after data is loaded
    useEffect(() => {
        if (!isLoading && bannersData.length > 0) {
            const initBannerSwiper = () => {
                // @ts-ignore
                if (typeof window !== 'undefined' && (window as any).Swiper) {
                    // @ts-ignore
                    new (window as any).Swiper('.banner-slider', {
                        effect: 'slide',
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 1,
                        loop: true,
                        navigation: {
                            nextEl: '.slider-next',
                            prevEl: '.slider-prev',
                        },
                        autoplay: {
                            speeds: 3000,
                            delay: 4000,
                        },
                        speed: 1000,
                    });

                } else {
                    setTimeout(initBannerSwiper, 100);
                }
            };
            setTimeout(initBannerSwiper, 100);
        }
    }, [isLoading, bannersData]);

    // Render consistent markup both on server and client
    return (
        <section
            id="home"
            className="banner"
            style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#080808',
                overflow: 'hidden',
                padding: '0',
                height: '100vh',
            }}
        >
            <div className="slider-prev" style={{ width: '50px', height: '50px', fontSize: '18px' }}><i className="fas fa-chevron-left"></i></div>
            <div className="slider-next" style={{ width: '50px', height: '50px', fontSize: '18px' }}><i className="fas fa-chevron-right"></i></div>
            <div className="banner-slider h-100">
                <div className="swiper-wrapper h-100">
                    {bannersData.map((banner, index) => (
                        <div className="swiper-slide h-100" key={index}>
                            <div
                                className="banner-section banner-section-two h-100"
                                style={{ position: 'relative', overflow: 'hidden' }}
                            >

                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 2,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
                                        }}
                                    />
                                    {banner.backgroundImage && (
                                        <Image
                                            src={banner.backgroundImage}
                                            alt="banner-bg"
                                            fill
                                            style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.7)' }}
                                            priority={index === 0}
                                        />
                                    )}
                                </div>
                                <div className="container-fluid h-100">
                                    <div className="row justify-content-center align-items-center h-100">
                                        <div className="col-xl-12 col-lg-12 text-center px-4 py-3">
                                            <div className="banner-content" data-aos="fade-up" data-aos-duration="1200">
                                                <div className="mb-3">
                                                    <span className="sub-title" style={{ fontSize: '16px', letterSpacing: '4px', color: '#3ee80f', fontWeight: 'bold' }}>{banner.subTitle}</span>
                                                </div>
                                                <h1 className="title text-white" style={{ fontSize: '56px', marginBottom: '15px', fontWeight: 900, textTransform: 'uppercase', lineHeight: '1.1' }}>{banner.title}</h1>
                                                <h3 className="inner-title text-white-50" style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 600 }}>{banner.innerTitle}</h3>
                                                <p className="text-white-50" style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px', lineHeight: '1.6' }}>{banner.description}</p>
                                                <div className="banner-btn" style={{ gap: '15px', justifyContent: 'center', display: 'flex' }}>
                                                    <Link
                                                        href={banner.buttonLink || '/apply'}
                                                        className="btn--base"
                                                        style={{ padding: '12px 30px', fontSize: '16px', fontWeight: 700 }}
                                                    >
                                                        {banner.buttonText || 'Apply Now'}
                                                    </Link>
                                                    <Link
                                                        href="/training"
                                                        className="btn--base active"
                                                        style={{ padding: '12px 30px', fontSize: '16px', fontWeight: 700 }}
                                                    >
                                                        Training Classes
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
