'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TrainingSlider({ styles }: { styles: any[] }) {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            speed={1000}
            navigation={{
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            }}
            breakpoints={{
                992: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                576: { slidesPerView: 1 },
            }}
            className="training-slider"
        >
            {styles.map((style, index) => (
                <SwiperSlide key={index}>
                    <div className="training-item text-center" style={{ backgroundColor: 'transparent' }}>
                        {style.bgImage && (
                            <>
                                <Image
                                    src={style.bgImage}
                                    alt="background"
                                    fill
                                    style={{ objectFit: 'cover', zIndex: 0 }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={index < 3}
                                />
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.85)', zIndex: 0 }}></div>
                            </>
                        )}
                        <div className="training-icon position-relative" style={{ width: '80px', height: '80px', margin: '0 auto', zIndex: 1 }}>
                            {style.icon && (
                                <Image
                                    src={style.icon}
                                    alt={style.title || "icon"}
                                    width={80}
                                    height={80}
                                    style={{ objectFit: 'contain' }}
                                    sizes="80px"
                                    priority={index < 3}
                                />
                            )}
                        </div>
                        <div className="training-content position-relative" style={{ zIndex: 1 }}>
                            <h3 className="title"><Link href="#training">{style.title?.toUpperCase()}</Link></h3>
                            <p>{style.description}</p>
                        </div>
                        <div className="training-overlay bg-overlay-base" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 2 }}>
                            {style.bgImage && (
                                <Image
                                    src={style.bgImage}
                                    alt="background-hover"
                                    fill
                                    style={{ objectFit: 'cover', zIndex: -1 }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            )}
                            <div className="training-overlay-content p-4" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 className="title"><Link href="/training-details">{style.title?.toUpperCase()} TRAINING</Link></h3>
                                <div className="mt-4 d-flex justify-content-center">
                                    <Link href="/training-details" className="btn--base active">Training Details <i className="fas fa-arrow-right ml-2"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
