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

    // Fallback social links if no data
    const socials = contact?.socials || {

        facebook: '#',
        instagram: '#',
        twitter: '#',
        youtube: '#',
        whatsapp: '#'
    };

    return (
        <footer id="contact" className="footer-section footer-section-two pt-80 pb-30" style={{ backgroundColor: '#fff', color: '#333', borderTop: '1px solid #eee' }}>
            <div className="container">
                <div className="row">
                    {/* Left Side - Socials & Quick Links */}
                    <div className="col-lg-6 col-md-12 mb-30 d-flex flex-column justify-content-center">
                        <div className="footer-widget mb-4">
                            <ul className="footer-social" style={{ display: 'flex', gap: '15px', padding: 0, margin: '0 0 20px 0', listStyle: 'none' }}>
                                <li><a href={socials.facebook} target="_blank" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3b5998', color: '#fff' }}><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href={socials.instagram} target="_blank" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff' }}><i className="fab fa-instagram"></i></a></li>
                                <li><a href={socials.twitter} target="_blank" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1da1f2', color: '#fff' }}><i className="fab fa-twitter"></i></a></li>
                                <li><a href={socials.youtube} target="_blank" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ff0000', color: '#fff' }}><i className="fab fa-youtube"></i></a></li>
                                <li><a href={socials.whatsapp} target="_blank" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#25d366', color: '#fff' }}><i className="fab fa-whatsapp"></i></a></li>
                            </ul>
                        </div>

                        <div className="footer-widget d-flex align-items-center">
                            <h5 style={{ margin: '0 20px 0 0', fontWeight: 'bold' }}>Quick Links:</h5>
                            <div className="quick-links-logos d-flex flex-wrap" style={{ gap: '15px', alignItems: 'center' }}>
                                {contact?.quickLinks?.map((link: any, idx: number) => (
                                    <Link key={idx} href={link.url} style={{ display: 'inline-block' }} title="Quick Link" target="_blank">
                                        <img src={link.image} alt="Quick Link" style={{ width: '40px', height: 'auto', objectFit: 'contain' }} />
                                    </Link>
                                ))}
                                {!contact?.quickLinks?.length && (
                                    <>
                                        <Link href="#" style={{ display: 'inline-block' }} title="Quick Link">
                                            <img src="/assets/images/quicklinks/Picture4.png" alt="Quick Link" style={{ width: '40px', height: 'auto', objectFit: 'contain' }} />
                                        </Link>
                                        <Link href="#" style={{ display: 'inline-block' }} title="Quick Link">
                                            <img src="/assets/images/quicklinks/Picture5.png" alt="Quick Link" style={{ width: '40px', height: 'auto', objectFit: 'contain' }} />
                                        </Link>
                                        <Link href="#" style={{ display: 'inline-block' }} title="Quick Link">
                                            <img src="/assets/images/quicklinks/Picture6.png" alt="Quick Link" style={{ width: '40px', height: 'auto', objectFit: 'contain' }} />
                                        </Link>
                                        <Link href="#" style={{ display: 'inline-block' }} title="Quick Link">
                                            <img src="/assets/images/quicklinks/Picture7.png" alt="Quick Link" style={{ width: '40px', height: 'auto', objectFit: 'contain' }} />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Side - Contact US */}
                    <div className="col-lg-6 col-md-12 mb-30" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="footer-widget text-lg-right">
                            <h5 className="title" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '10px', color: '#000' }}>CONTACT US</h5>
                            <div className="contact-details" style={{ lineHeight: '1.4', color: '#000', fontSize: '16px' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {address.room && <li>{address.room}, {address.floor}</li>}
                                    {address.building && <li>{address.building}</li>}
                                    {address.street && <li>{address.street}</li>}
                                    {address.area && <li>{address.area}, {address.city} - {address.zip}</li>}
                                    {address.country && <li>{address.country}</li>}
                                </ul>
                                <p style={{ margin: '10px 0 0 0', color: '#000' }}>Email : {contact?.email || 'wushubd@gmail.com'}</p>
                                <p style={{ margin: 0, color: '#000' }}>Telephone : {contact?.phone?.telephone || '+88 02 9565503'}</p>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="footer-bottom mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>
                        Copyright &copy; {new Date().getFullYear()} <span style={{ color: '#dc3545', fontWeight: 'bold' }}>Bangladesh Wushu Federation</span>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>

    );
}
