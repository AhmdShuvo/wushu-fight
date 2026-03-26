import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Trainer from '../components/Trainer';
import Service from '../components/Service';
import Event from '../components/Event';
import Testimonial from '../components/Testimonial';

export default function AboutPage() {
    return (
        <>
            <Breadcrumb title="ABOUT <span>US</span>" currentPage="About Us" bgImage="bg-12.png" />

            {/* About Section */}
            <section className="about-section about-section--style ptb-120">
                <div className="about-element-one my-paroller" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="vertical">
                    <img src="/assets/images/element/element-1.png" alt="element" />
                </div>
                <div className="about-element-two my-paroller" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="vertical">
                    <img src="/assets/images/element/element-2.png" alt="element" />
                </div>
                <div className="container">
                    <div className="row justify-content-center align-items-center mb-30-none">
                        <div className="col-xl-6 col-lg-6 mb-30">
                            <div className="about-thumb">
                                <img src="/assets/images/about-2.png" alt="about" />
                                <div className="about-overlay-content">
                                    <img src="/assets/images/icon/icon-22.png" alt="icon" />
                                    <h4 className="title">NATIONAL <br /> Wushu <br /> AWARD</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-30">
                            <div className="about-content-area">
                                <div className="section-header">
                                    <h2 className="section-title">ABOUT <span>Wushu</span> Federation</h2>
                                    <p>BWUF is the central body for the development and management of the Chinese martial arts "Wushu" in Bangladesh as specified in the International Wushu Federation (IWUF) constitution. </p>
                                    <p>BWUF was founded in 2007 as "Bangladesh Wushu Association" and has been declared as "Bangladesh Wushu Federation" by National Sports Council-Bangladesh in 2018. It has an established history of working to promote and develop Wushu in Bangladesh and supporting the IWUF Worldwide.</p>
                                </div>
                                <ul className="about-list">
                                    <li>Promote the study and safe practice of Chinese Martial Arts Wushu and regulate as far as possible, the ever-growing numbers of clubs and organisations claiming to teach Wushu.</li>
                                    <li>Affiliate to, assist, co-operate with the support national and international organisations having objectives approved by the International Wushu Federation.</li>

                                    <li>Act as an advisory body on all matters appertaining to the practice of the Wushu, through liaison with statutory and voluntary bodies, news media and other relevant parties.</li>

                                </ul>
                                <div className="about-user-area">
                                    <div className="about-user-wrapper">
                                        <div className="about-user-thumb">
                                            <img src="/assets/images/user.png" alt="user" />
                                        </div>
                                        <div className="about-user-content">
                                            <h6 className="title">Hoyen Mata</h6>
                                            <span className="sub-title">Co-Founder</span>
                                        </div>
                                    </div>
                                    <div className="about-signature-wrapper">
                                        <img src="/assets/images/signature-2.png" alt="signature" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-item-area about-item-area-two pt-120">
                        <div className="row justify-content-center mb-30-none">
                            {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                <div className="about-item">
                                    <div className="about-icon">
                                        <img src="/assets/images/icon/icon-23.png" alt="icon" />
                                    </div>
                                    <div className="about-content">
                                        <h4 className="title">FREE FITNESS TRAINING</h4>
                                        <p>We teach martial arts because we want to Unlike other martial arts Federations.</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-30">
                                <div className="about-item">
                                    <div className="about-icon">
                                        <img src="/assets/images/icon/icon-24.png" alt="icon" />
                                    </div>
                                    <div className="about-content">
                                        <h4 className="title">Mission</h4>
                                        <p>Our mission is to Increase wushu spirit and values and promote awareness, interest, participation and success at all levels, therefore enriching the health and well-being of all Bangladeshi's.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-30">
                                <div className="about-item">
                                    <div className="about-icon">
                                        <img src="/assets/images/icon/icon-25.png" alt="icon" />
                                    </div>
                                    <div className="about-content">
                                        <h4 className="title">Vision</h4>
                                        <p>Promote the development of wushu in all over Bangladesh as well as worldwide.  Sport, recreation, health, and art form of wushu is a widely recognised and popular among children, young and old.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="video-section bg-overlay-red bg_img" data-background="/assets/images/bg/bg-13.png" style={{ backgroundImage: "url('/assets/images/bg/bg-13.png')" }}>
                <div className="section-logo-text">
                    <span className="title">SEE OUR VIDEO</span>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12 text-center">
                            <div className="video-area">
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
                </div>
            </section>

            {/* Statistics Section */}
            <section className="statistics-section">
                <div className="container">
                    <div className="statistics-area">
                        <div className="row mt-20-none mb-30-none">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                <div className="statistics-item">
                                    <div className="statistics-content">
                                        <div className="odo-area">
                                            <h3 className="odo-title odometer" data-odometer-final="1025">0</h3>
                                            <h3 className="title">+</h3>
                                        </div>
                                        <p>Complete Training</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                <div className="statistics-item">
                                    <div className="statistics-content">
                                        <div className="odo-area">
                                            <h3 className="odo-title odometer" data-odometer-final="478">0</h3>
                                            <h3 className="title">+</h3>
                                        </div>
                                        <p>License Registration</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                <div className="statistics-item">
                                    <div className="statistics-content">
                                        <div className="odo-area">
                                            <h3 className="odo-title odometer" data-odometer-final="2500">0</h3>
                                            <h3 className="title">+</h3>
                                        </div>
                                        <p>Students Admission</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Trainer />

            <Service />

            <Testimonial />

            <Event />
        </>
    );
}
