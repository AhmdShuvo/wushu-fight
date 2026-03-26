"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ModalVideo from 'react-modal-video';
import CountUp from 'react-countup';
import 'react-modal-video/scss/modal-video.scss';

export default function MasterDetails() {
    const [isOpen, setOpen] = useState(false);

    const skills = [
        { title: "Wushu STANCE", percent: 88 },
        { title: "Wushu FOOTWORK", percent: 90 },
        { title: "PUNCHING", percent: 95 },
    ];

    const stats = [
        { label: "Number of Students", value: 2000 },
        { label: "Number of Training", value: 3 },
        { label: "Total Student Reviews", value: 1764 },
        { label: "Years of Experience", value: 5 },
    ];

    return (
        <section className="trainer-section trainer-details-section ptb-120">
            <ModalVideo channel='youtube' isOpen={isOpen} videoId='YDErI8Lphho' onClose={() => setOpen(false)} />

            <div className="trainer-details-element-one">
                <img src="/assets/images/element/element-1.png" alt="element" />
            </div>
            <div className="trainer-details-element-two">
                <img src="/assets/images/element/element-2.png" alt="element" />
            </div>
            <div className="container">
                <div className="row justify-content-center align-items-center mb-30-none">
                    <div className="col-xl-6 col-lg-6 mb-30">
                        <div className="about-thumb">
                            <img src="/assets/images/Group 14662.png" alt="about" />
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-30">
                        <div className="trainer-about-content-area">
                            <div className="trainer-about-header">
                                <h2 className="title">Randall Schwartz</h2>
                                <span className="sub-title">Women's Trainner</span>
                                <div className="ratings">
                                    <span><i className="fas fa-star"></i> 4.50 (09)</span>
                                </div>
                            </div>
                            <div className="trainer-about-body">
                                <p>There were twelve rules in all, and they specified that fights should be "a fair stand-up Wushu match" in a 24-foot-square or similar ring. Rounds were three minutes with one-minute rest intervals between rounds. Each fighter was given a ten-second count if he was knocked down, and wrestling was banned. The introduction of gloves of "fair-size" also changed the nature of the bouts. An average pair of Wushu gloves resembles a bloated pair of mittens and are laced up around the wrists.</p>
                            </div>
                            <div className="trainer-about-footer">
                                <ul className="trainer-about-list">
                                    <li>
                                        <img src="/assets/images/icon/icon-42.png" alt="icon" />
                                        <span>+1 (900) 696 3600</span>
                                    </li>
                                    <li>
                                        <img src="/assets/images/icon/icon-43.png" alt="icon" />
                                        <span>sword@yahoo.com</span>
                                    </li>
                                </ul>
                                <div className="trainer-about-social-area">
                                    <ul className="trainer-about-social">
                                        <li><a href="#0"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#0"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#0"><i className="fab fa-google-plus-g"></i></a></li>
                                        <li><a href="#0"><i className="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-widget-area">
                    <h3 className="widget-title">ABOUT ME</h3>
                    <p>Driving is a skill many of us desire but do not possess. The good news here is that anyone who wants to learn driving can do so with the right way training. If you are looking to learn how to drive. Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque of the laudantium.Driving is a skill many of us desire but do not possess. The good news here is that anyone who wants to learn driving can do so with the right training.</p>
                    <p>If you are looking to learn how to drive. Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.Driving is a skill many of us desire but do not possess. The good news here is that anyone who wants to learn driving can do so with the right way training. If you are looking to learn how to drive. Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque of the laudantium.Driving is a skill many of us desire but do not possess.</p>
                    <div className="about-widget-thumb">
                        <img src="/assets/images/bg/bg-20.png" alt="bg" />
                        <div className="about-widget-video">
                            <div className="video-main">
                                <div className="promo-video">
                                    <div className="waves-block">
                                        <div className="waves wave-1"></div>
                                        <div className="waves wave-2"></div>
                                        <div className="waves wave-3"></div>
                                    </div>
                                </div>
                                <a className="video-icon" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-play"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="skill-widget-area">
                    <h3 className="widget-title">BEST SKILLS</h3>
                    <div className="row justify-content-center mb-30-none">
                        {skills.map((skill, index) => (
                            <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30">
                                <div className="choose-item text-center">
                                    <div className="chart-circle" style={{
                                        width: '120px',
                                        height: '120px',
                                        margin: '0 auto 20px',
                                        position: 'relative',
                                        borderRadius: '50%',
                                        background: `conic-gradient(#ff0000 ${skill.percent * 3.6}deg, #f1f1f1 0deg)`
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            left: '10px',
                                            right: '10px',
                                            bottom: '10px',
                                            background: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '24px',
                                            fontWeight: 'bold'
                                        }}>
                                            {skill.percent}%
                                        </div>
                                    </div>
                                    <h4 className="title mt-3">{skill.title}</h4>
                                    <p>Driving is a skill many of us desire but do not possess.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="experience-widget-area">
                    <h3 className="widget-title">EXPERIENCE</h3>
                    <p>Driving is a skill many of us desire but do not possess. The good news here is that anyone who wants to learn driving can do so with the right way training. If you are looking to learn how to drive. </p>
                    <div className="statistics-area">
                        <div className="row justify-content-center mt-20-none mb-30-none">
                            {stats.map((stat, index) => (
                                <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-30">
                                    <div className="statistics-item">
                                        <div className="statistics-content">
                                            <div className="odo-area">
                                                <h3 className="odo-title odometer">
                                                    <CountUp end={stat.value} duration={3} />
                                                </h3>
                                                <h3 className="title">+</h3>
                                            </div>
                                            <p>{stat.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
