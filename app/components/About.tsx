import React from 'react';
import Link from 'next/link';

export default function About() {
    return (
        <section id="about" className="about-section pt-120 bg-overlay-black bg_img" style={{ backgroundImage: "url('/assets/images/bg/bg-1.png')" }}>
            <div className="section-logo-text">
                <span className="title">Wushu</span>
            </div>
            <div className="container">
                <div className="row justify-content-center mb-30-none">
                    <div className="col-xl-6 col-lg-12 mb-30">
                        <div className="about-thumb">
                            <img src="/assets/images/about.png" alt="about" />
                            <div className="about-thumb-content">
                                <div className="signature-thumb">
                                    <img src="/assets/images/signature.png" alt="signature" />
                                </div>
                                <div className="signature-content">
                                    <span className="title">DIRECTOR / INSTRUCTOR</span>
                                </div>
                            </div>
                            <div className="about-thumb-video">
                                <div className="video-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1"></div>
                                            <div className="waves wave-2"></div>
                                            <div className="waves wave-3"></div>
                                        </div>
                                    </div>
                                    <a className="video-icon" data-rel="lightcase:myCollection" href="https://www.youtube.com/embed/YDErI8Lphho">
                                        <i className="fas fa-play"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-30">
                        <div className="about-content-area">
                            <div className="section-header white">
                                <h2 className="section-title">ABOUT <span>Wushu</span> Federation</h2>
                                <p>BWUF was founded in 2007 as "Bangladesh Wushu Association" and has been declared as "Bangladesh Wushu Federation" by National Sports Council-Bangladesh in 2018. It has an established history of working to promote and develop Wushu in Bangladesh and supporting the IWUF Worldwide.</p>
                            </div>
                            <div className="about-item-area">
                                <div className="about-item mb-30">
                                    <div className="about-icon">
                                        <img src="/assets/images/icon/icon-1.png" alt="icon" />
                                    </div>
                                    <div className="about-content">
                                        <h3 className="title">OUR VISION</h3>
                                        <p>Promote the development of wushu in all over Bangladesh as well as worldwide.  Sport, recreation, health, and art form of wushu is a widely recognised and popular among children, young and old.</p>
                                    </div>
                                </div>
                                <div className="about-item mb-30">
                                    <div className="about-icon">
                                        <img src="/assets/images/icon/icon-2.png" alt="icon" />
                                    </div>
                                    <div className="about-content">
                                        <h3 className="title">OUR MISSION</h3>
                                        <p>Our mission is to Increase wushu spirit and values and promote awareness, interest, participation and success at all levels,therefore enriching the health and well-being of all Bangladeshi's.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="about-btn">
                                <Link href="/about" className="btn--base">Read More <i className="fas fa-arrow-right ml-2"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
