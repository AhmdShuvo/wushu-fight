import React from 'react';

export default function Testimonial() {
    return (
        <section className="client-section client-section-two ptb-120 bg-overlay-black bg_img" data-background="/assets/images/bg/bg-7.png" style={{ backgroundImage: "url('/assets/images/bg/bg-7.png')" }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-header-wrapper">
                            <div className="section-header white" data-aos="fade-right" data-aos-duration="1200">
                                <h2 className="section-title">OUR <span>STUDENT'S</span> TESTIMONIAL</h2>
                                <p>Fight Federation has specialized in martial arts since 1986 and has one of the most innovative programs in the nation.</p>
                            </div>
                            <div className="slider-nav-area" data-aos="fade-left" data-aos-duration="1200">
                                <div className="slider-prev">
                                    <i className="fas fa-chevron-left"></i>
                                </div>
                                <div className="slider-next">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="client-area">
                    <div className="row justify-content-center align-items-end mb-30-none">
                        <div className="col-xl-8 col-lg-8 col-md-6 mb-30">
                            <div className="client-slider" data-aos="fade-right" data-aos-duration="1200">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="client-item">
                                            <div className="client-header">
                                                <div className="client-quote">
                                                    <img src="assets/images/client/quote.png" alt="client" />
                                                </div>
                                                <div className="client-thumb">
                                                    <img src="assets/images/client/client-1.png" alt="client" />
                                                </div>
                                            </div>
                                            <div className="client-content">
                                                <p>Fight Federation has specialized in martial arts since 1986 and has one of the most
                                                    Fight Federation has specialized.</p>
                                            </div>
                                            <div className="client-footer">
                                                <div className="client-footer-left">
                                                    <h4 className="title"><a href="#0">Randall Schwartz</a></h4>
                                                    <span className="sub-title">Women's Trainner</span>
                                                </div>
                                                <div className="client-footer-right">
                                                    <span className="ratings">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star active"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="client-item">
                                            <div className="client-header">
                                                <div className="client-quote">
                                                    <img src="assets/images/client/quote.png" alt="client" />
                                                </div>
                                                <div className="client-thumb">
                                                    <img src="assets/images/client/client-2.png" alt="client" />
                                                </div>
                                            </div>
                                            <div className="client-content">
                                                <p>Fight Federation has specialized in martial arts since 1986 and has one of the most
                                                    Fight Federation has specialized.</p>
                                            </div>
                                            <div className="client-footer">
                                                <div className="client-footer-left">
                                                    <h4 className="title"><a href="#0">Andru Smith</a></h4>
                                                    <span className="sub-title">Wushu Trainer</span>
                                                </div>
                                                <div className="client-footer-right">
                                                    <span className="ratings">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star active"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="client-right-thumb" data-aos="fade-left" data-aos-duration="1200">
                                <img src="assets/images/client/client-big-2.png" alt="client" />
                                <div className="client-thumb-overlay">
                                    <h4 className="title">MASTER UPPER CUT</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
