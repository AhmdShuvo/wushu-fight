'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        fetch('/api/contact')
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
            
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="row">
                    {/* Column 1: About & Socials */}
                    <div className="col-xl-5 col-lg-5 col-md-6">
                        <div className="footer-widget">
                            <div className="footer-logo mb-4">
                                <Link href="/" className="site-logo site-title">
                                    <img src="/assets/images/wushu_logo.png" alt="site-logo" style={{ maxWidth: '100px' }} />
                                </Link>
                            </div>
                            <p className="text-white-50 mb-4" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                                Bangladesh Wushu Federation (BWUF) is the sole authority for Wushu in Bangladesh, 
                                dedicated to promoting martial arts excellence and discipline since 1986. 
                                We are affiliated with SAWUF, WFA, and IWUF.
                            </p>
                            <ul className="footer-social d-flex gap-3 p-0 m-0" style={{ listStyle: 'none' }}>
                                <li><a href={socials.facebook} target="_blank" className="social-link"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href={socials.instagram} target="_blank" className="social-link"><i className="fab fa-instagram"></i></a></li>
                                <li><a href={socials.twitter} target="_blank" className="social-link"><i className="fab fa-twitter"></i></a></li>
                                <li><a href={socials.youtube} target="_blank" className="social-link"><i className="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Contact Details */}
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="footer-widget px-xl-4">
                            <h4 className="title text-white mb-4" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #3ee80f', display: 'inline-block', paddingBottom: '5px' }}>Contact Us</h4>
                            <ul className="footer-list p-0 m-0 text-white-50" style={{ listStyle: 'none', lineHeight: '1.8' }}>
                                <li className="mb-3 d-flex gap-3">
                                    <i className="fas fa-map-marker-alt text--acc mt-1"></i>
                                    <span>
                                        {address.room}, {address.floor}<br />
                                        {address.building}<br />
                                        {address.street}, {address.area}<br />
                                        {address.city} - {address.zip}, {address.country}
                                    </span>
                                </li>
                                <li className="mb-2 d-flex gap-3 align-items-center">
                                    <i className="fas fa-envelope text--acc"></i>
                                    <span>{contact?.email || 'wushubd@gmail.com'}</span>
                                </li>
                                <li className="d-flex gap-3 align-items-center">
                                    <i className="fas fa-phone-alt text--acc"></i>
                                    <span>{contact?.phone?.telephone || '+88 02 9565503'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h4 className="title text-white mb-4" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #3ee80f', display: 'inline-block', paddingBottom: '5px' }}>Quick Links</h4>
                            <div className="footer-gallery-area">
                                <div className="footer-gallery-wrapper d-flex flex-wrap gap-2">
                                    {contact?.quickLinks?.map((link: any, idx: number) => (
                                        <div className="footer-gallery-thumb" key={idx} style={{ width: '60px', height: '60px', overflow: 'hidden', border: '1px solid #333' }}>
                                            <Link href={link.url} target="_blank" className="w-100 h-100 d-block">
                                                <img src={link.image} alt="link" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px', backgroundColor: '#fff' }} />
                                            </Link>
                                        </div>
                                    ))}
                                    {!contact?.quickLinks?.length && [4, 5, 6, 7].map(n => (
                                        <div className="footer-gallery-thumb" key={n} style={{ width: '60px', height: '60px', overflow: 'hidden', border: '1px solid #333' }}>
                                            <Link href="#" className="w-100 h-100 d-block">
                                                <img src={`/assets/images/quicklinks/Picture${n}.png`} alt="link" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px', backgroundColor: '#fff' }} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                                    Copyright &copy; {new Date().getFullYear()} <span className="text--acc font-weight-bold">Bangladesh Wushu Federation</span>. All Rights Reserved.
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
                    border-radius: 0;
                    transition: all 0.3s ease;
                }
                .social-link:hover {
                    background: #3ee80f;
                    color: #000;
                    transform: translateY(-3px);
                }
                .text--acc { color: #3ee80f !important; }
            `}</style>
        </footer>
    );
}
