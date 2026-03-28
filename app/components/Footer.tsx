'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        fetch('/api/contact', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.contact) {
                    setContact(data.contact);
                }
            });
    }, []);

    const defaults = {
        room: 'Room: 32',
        floor: '2nd Floor',
        building: 'Bangabandhu National Stadium',
        street: 'Puraana Paltan',
        area: 'Dhaka',
        city: 'Dhaka',
        zip: '1000',
        country: 'Bangladesh',
    };

    const address = contact?.address ? { ...defaults, ...contact.address } : defaults;

    const socials = contact?.socials || {
        facebook: '#',
        instagram: '#',
        twitter: '#',
        youtube: '#',
        whatsapp: '#'
    };

    return (
        <footer id="contact" className="footer-section footer-section-two pt-80" style={{ position: 'relative', backgroundColor: '#0a0a0a', color: '#fff', overflow: 'hidden' }}>
            <div className="footer-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, opacity: 0.1 }}>
                <img src="/assets/images/bg/bg-4.png" alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div className="container-fluid px-3 px-lg-5" style={{ position: 'relative', zIndex: 2 }}>
                <div className="row g-4">
                    {/* Column 1: About & Socials */}
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="footer-widget">
                            <div className="footer-logo mb-4">
                                <Link href="/" className="site-logo site-title">
                                    <img src={contact?.footer?.logo || "/assets/images/wushu_logo.png"} alt="site-logo" style={{ maxWidth: '100px' }} />
                                </Link>
                            </div>
                            <p className="text-white-50 mb-4" style={{ lineHeight: '1.6', textAlign: 'justify', fontSize: '14px' }}>
                                {contact?.footer?.description || "Bangladesh Wushu Federation (BWUF) is the sole authority for Wushu in Bangladesh, dedicated to promoting martial arts excellence and discipline since 1986. We are affiliated with SAWUF, WFA, and IWUF."}
                            </p>
                            <ul className="footer-social d-flex gap-3 p-0 m-0" style={{ listStyle: 'none' }}>
                                <li><a href={socials.facebook} target="_blank" className="social-link"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href={socials.instagram} target="_blank" className="social-link"><i className="fab fa-instagram"></i></a></li>
                                <li><a href={socials.twitter} target="_blank" className="social-link"><i className="fab fa-twitter"></i></a></li>
                                <li><a href={socials.youtube} target="_blank" className="social-link"><i className="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (Condensed Center) */}
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="footer-widget text-center">
                            <h4 className="title text-white mb-4" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #dc3545', display: 'inline-block', paddingBottom: '5px' }}>Quick Links</h4>
                            <div className="footer-gallery-area d-flex justify-content-center">
                                <div className="footer-gallery-wrapper d-flex flex-nowrap gap-3">
                                    {contact?.quickLinks?.map((link: any, idx: number) => (
                                        <div className="footer-gallery-thumb" key={idx} style={{ width: '50px', height: '50px', overflow: 'hidden', border: '1px solid #333', borderRadius: '6px', transition: 'all 0.3s ease' }}>
                                            <Link href={link.url} target="_blank" className="w-100 h-100 d-block">
                                                <img src={link.image} alt="link" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px', backgroundColor: '#fff' }} />
                                            </Link>
                                        </div>
                                    ))}
                                    {!contact?.quickLinks?.length && [4, 5, 6, 7].map(n => (
                                        <div className="footer-gallery-thumb" key={n} style={{ width: '50px', height: '50px', overflow: 'hidden', border: '1px solid #333', borderRadius: '6px', transition: 'all 0.3s ease' }}>
                                            <Link href="#" className="w-100 h-100 d-block">
                                                <img src={`/assets/images/quicklinks/Picture${n}.png`} alt="link" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px', backgroundColor: '#fff' }} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Contact Details (Straight Alignment Focal Point) */}
                    <div className="col-xl-5 col-lg-5 col-md-12 d-flex flex-column align-items-center align-items-lg-end">
                        <div className="footer-widget mx-auto ml-lg-auto" style={{ textAlign: 'left', maxWidth: '300px' }}>
                            <div className="text-center text-lg-right w-100">
                                <h4 className="title text-white mb-4" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px solid #dc3545', display: 'inline-block', paddingBottom: '8px' }}>Contact Us</h4>
                            </div>
                            <ul className="footer-list p-0 m-0" style={{ listStyle: 'none' }}>
                                <li className="mb-4 d-flex gap-3 align-items-start">
                                    <div className="contact-icon-circle mt-1">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <span className="d-block text-white mb-1" style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>HQ Address</span>
                                        <span className="text-white-50" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                            {address.room}, {address.floor}<br />
                                            {address.building}<br />
                                            {address.street}, {address.area}<br />
                                            {address.city} - {address.zip}, {address.country}
                                        </span>
                                    </div>
                                </li>
                                <li className="mb-3 d-flex gap-3 align-items-center">
                                    <div className="contact-icon-circle">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <span className="d-block text-white" style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>Email Support</span>
                                        <span className="text-white-50 small">{contact?.email || 'wushubd@gmail.com'}</span>
                                    </div>
                                </li>
                                <li className="d-flex gap-3 align-items-center">
                                    <div className="contact-icon-circle">
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <span className="d-block text-white" style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>Hotline No.</span>
                                        <span className="text-white-50 small">{contact?.phone?.telephone || '+88 02 9565503'}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>




                </div>
            </div>

            <div className="copyright-wrapper py-2" style={{ marginTop: '0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12 text-center">
                            <div className="copyright-area">
                                <p className="text-white-50 small m-0">
                                    Copyright &copy; {new Date().getFullYear()} <span style={{ color: '#dc3545', fontWeight: 'bold' }}>Bangladesh Wushu Federation</span>. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .social-link {
                    width: 40px;
                    height: 40px;
                    background: #1a1a1a;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .social-link:hover {
                    background: #dc3545;
                    color: #fff;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(220,53,69,0.3);
                }
                .contact-icon-circle {
                    width: 35px;
                    height: 35px;
                    background: rgba(220, 53, 69, 0.1);
                    color: #dc3545;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-size: 14px;
                    flex-shrink: 0;
                    border: 1px solid rgba(220, 53, 69, 0.2);
                    transition: all 0.3s ease;
                }
                .contact-icon-circle:hover {
                    background: #dc3545;
                    color: #fff;
                }
                .footer-gallery-thumb {
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .footer-gallery-thumb:hover {
                    border-color: #dc3545 !important;
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 8px 20px rgba(220,53,69,0.4);
                    z-index: 10;
                }
                .text--acc { color: #dc3545 !important; }
            `}</style>
        </footer>
    );
}
