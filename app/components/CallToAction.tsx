import React from 'react';

export default function CallToAction() {
    return (
        <section className="call-to-action-section ptb-120 bg-overlay-black bg_img" data-background="/assets/images/bg/bg-8.png" style={{ backgroundImage: "url('/assets/images/bg/bg-8.png')" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 text-center">
                        <div className="call-to-action-content" data-aos="fade-up" data-aos-duration="1200">
                            <h2 className="title">JOIN THE CLUB</h2>
                            <h2 className="sub-title">#BE COME STRONGER</h2>
                            <p>Fight Federation has specialized in martial arts since 1986 and has one of the most innovative programs in the nation.</p>
                            <div className="call-to-action-btn">
                                <a href="contact.html" className="btn--base">Join Now <i className="fas fa-arrow-right ml-2"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
