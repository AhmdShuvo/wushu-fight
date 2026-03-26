'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InnerBanner from '../components/InnerBanner';

export default function Contact() {
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        fetch('/api/contact')
            .then(res => res.json())
            .then(data => {
                if (data.contact) {
                    setContact(data.contact);
                }
            });

        // Initialize Paroller when component mounts
        const initParoller = () => {
            if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.paroller) {
                const $ = (window as any).jQuery;
                $('.my-paroller').paroller();
            } else {
                setTimeout(initParoller, 100);
            }
        };
        const timer = setTimeout(initParoller, 500);
        return () => clearTimeout(timer);
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
        mapLink: 'https://maps.app.goo.gl/kJHSD23asEeUcN7b8',
        mapIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.5491012173534!2d90.41058117437461!3d23.727790789645827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9a18d0b0931%3A0xdab240983bb02610!2sNational%20Stadium%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1767015612952!5m2!1sen!2sbd'
    };

    const address = contact?.address ? { ...defaults, ...contact.address } : defaults;



    const phone = contact?.phone || {
        telephone: '+88 02 9565503',
        mobile: '+88 01972182990'
    };

    const email = contact?.email || 'wushubd@gmail.com';
    const socials = contact?.socials || {
        facebook: '#',
        instagram: '#',
        twitter: '#',
        youtube: '#',
        whatsapp: '#'
    };

    const pageContent = contact?.contactPage || {
        title: 'Ready to Get More Information',
        subtitle: 'Information',
        description: 'If you have any questions or need more information, please use the form below to send us a message.'
    };

    return (
        <>
            <InnerBanner title="CONTACT" subtitle="US" bgImage="/assets/images/bg/bg-12.png" activePage="Contact Us" />

            <section className="contact-item-section ptb-120">
                <div className="contact-element-one my-paroller" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="vertical">
                    <img src="/assets/images/element/element-1.png" alt="element" />
                </div>
                <div className="contact-element-two my-paroller" data-paroller-factor="0.2" data-paroller-type="foreground" data-paroller-direction="vertical">
                    <img src="/assets/images/element/element-2.png" alt="element" />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 text-center">
                            <div className="section-header" data-aos="fade-up" data-aos-duration="1200">
                                <h2 className="section-title">{pageContent.title.replace('Information', '')} <span>{pageContent.subtitle}</span></h2>
                                <p>{pageContent.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-30-none">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-30">
                            <div className="contact-item">
                                <div className="contact-icon-area">
                                    <div className="contact-icon">
                                        <img src="/assets/images/icon/icon-65.png" alt="icon" />
                                    </div>
                                </div>
                                <div className="contact-content">
                                    <h4 className="title">OFFICE ADRESS</h4>
                                    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                                       {address.room && <span>{address.room}, {address.floor}</span>} <br />
                                       {address.building && <span>{address.building}</span>} <br />
                                       {address.street && <span>{address.street}</span>} <br />
                                       {address.area && <span>{address.area}, {address.city} - {address.zip}</span>} <br />
                                       {address.country && <span>{address.country}</span>} <br />
                                       <a href={address.mapLink} target="_blank" className="font-weight-bold text-danger">view map</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-30">
                            <div className="contact-item">
                                <div className="contact-icon-area">
                                    <div className="contact-icon">
                                        <img src="/assets/images/icon/icon-66.png" alt="icon" />
                                    </div>
                                </div>
                                <div className="contact-content">
                                    <h4 className="title">TELEPHONE NUMBER</h4>
                                    <p>{phone.telephone} <br /> <a href={`tel:${phone.telephone}`}>call now</a> </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-30">
                            <div className="contact-item">
                                <div className="contact-icon-area">
                                    <div className="contact-icon">
                                        <img src="/assets/images/icon/icon-66.png" alt="icon" />
                                    </div>
                                </div>
                                <div className="contact-content">
                                    <h4 className="title">MOBILE NUMBER</h4>
                                    <p>{phone.mobile} <br /> <a href={`tel:${phone.mobile}`}>call now</a> </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-30">
                            <div className="contact-item">
                                <div className="contact-icon-area">
                                    <div className="contact-icon">
                                        <img src="/assets/images/icon/icon-64.png" alt="icon" />
                                    </div>
                                </div>
                                <div className="contact-content">
                                    <h4 className="title">SEND MAIL</h4>
                                    <p>{email}<br /> <a href={`mailto:${email}`}>send now</a> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="account-widget-section account-widget-section-two account-widget-section--style ptb-120">
                <div className="container">
                    <div className="row justify-content-center align-items-center mb-60-none">
                        <div className="col-xl-6 col-lg-6 mb-60">
                            <div className="account-widget-left">
                                <div className="section-header">
                                    <h2 className="section-title">Any Question? Feel
                                        Free to <span>Contact</span> with Us!</h2>
                                    <p>{pageContent.description}</p>
                                </div>
                                <div className="banner-widget">
                                    <div className="banner-widget-wrapper">
                                        <div className="banner-widget-left">
                                            <div className="banner-widget-thumb">
                                                <img src="/assets/images/element/element-9.png" alt="element" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-social-area">
                                    <span>FOLLOW US -</span>
                                    <ul className="contact-social">
                                        <li><a href={socials.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href={socials.twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href={socials.instagram} target="_blank"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href={socials.youtube} target="_blank"><i className="fab fa-youtube"></i></a></li>
                                        <li><a href={socials.whatsapp} target="_blank"><i className="fab fa-whatsapp"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-60">
                            <div className="account-widget-form-area">
                                <form className="account-widget-form">
                                    <div className="row justify-content-center mb-25-none">
                                        <div className="col-xl-12 form-group">
                                            <input type="text" className="form--control" placeholder="Your Name*" />
                                        </div>
                                        <div className="col-xl-12 form-group">
                                            <input type="email" className="form--control" placeholder="Your Email*" />
                                        </div>
                                        <div className="col-xl-12 form-group">
                                            <input type="text" className="form--control" placeholder="Your Phone*" />
                                        </div>
                                        <div className="col-xl-12 form-group">
                                            <textarea className="form--control" placeholder="Your Message*"></textarea>
                                        </div>
                                        <div className="col-xl-12 form-group">
                                            <button type="submit" className="btn--base">Send Now <i className="fas fa-arrow-right ml-2"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section ptb-120">
                <div className="container">
                    <div className="row justify-content-center mb-5-none">
                        <div className="col-xl-12">
                            <div className="map-area">
                              <iframe src={address.mapIframe} width="600" height="450" style={{ border: 0 }} allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
