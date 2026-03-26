"use client";
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function MoreMasters() {
    const trainers = [
        { name: "Randall Schwartz", title: "Women's Trainner", img: "trainer-1.png" },
        { name: "David Sherman", title: "Wushu Trainner", img: "trainer-2.png" },
        { name: "Earl Lopez", title: "Wushu Trainner", img: "trainer-3.png" },
        { name: "James Gonzalez", title: "Women's Trainner", img: "trainer-4.png" },
        { name: "Randall Schwartz", title: "Women's Trainner", img: "trainer-1.png" },
    ];

    return (
        <section className="trainer-section trainer-section--style trainer-section--style-two trainer-section--style-three ptb-120">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8 text-center">
                        <div className="section-header">
                            <h2 className="section-title">More Training <span>Masters</span></h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-10-none">
                    <div className="col-xl-12">
                        <div className="trainer-slider-two">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                slidesPerView={3}
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                speed={1000}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    991: {
                                        slidesPerView: 2,
                                    },
                                    767: {
                                        slidesPerView: 2,
                                    },
                                    575: {
                                        slidesPerView: 1,
                                    },
                                }}
                            >
                                {trainers.map((trainer, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="trainer-item">
                                            <div className="trainer-thumb">
                                                <img src={`/assets/images/trainer/${trainer.img}`} alt="trainer" />
                                                <div className="trainer-overlay">
                                                    <div className="share-area">
                                                        <div className="share-icon">
                                                            <i className="fas fa-share-alt"></i>
                                                        </div>
                                                        <ul className="social-list">
                                                            <li><a href="#0"><i className="fab fa-facebook-f"></i></a></li>
                                                            <li><a href="#0"><i className="fab fa-twitter"></i></a></li>
                                                            <li><a href="#0"><i className="fab fa-google-plus-g"></i></a></li>
                                                            <li><a href="#0"><i className="fab fa-instagram"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="trainer-content">
                                                <h3 className="title"><Link href="/master-details">{trainer.name}</Link></h3>
                                                <span className="sub-title">{trainer.title}</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
