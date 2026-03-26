import React from 'react';

export default function Subscribe() {
    return (
        <section className="subscribe-section ptb-120">
            <div className="container">
                <div className="subscribe-area">
                    <div className="subscribe-element">
                        <img src="assets/images/element/element-22.png" alt="element" />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="subscribe-thumb" data-aos="fade-up" data-aos-duration="1200">
                                <img src="assets/images/element/element-23.png" alt="element" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="subscribe-content" data-aos="fade-left" data-aos-duration="1200">
                                <div className="section-header white">
                                    <h2 className="section-title">SUBSCRIBE NOW</h2>
                                    <p>Fight Federation has specialized in martial arts since 1986 and has one of the most innovative programs in the nation.</p>
                                </div>
                                <form className="subscribe-form">
                                    <label className="subscribe-icon"><i className="las la-envelope"></i></label>
                                    <input type="text" className="form--control" placeholder="Email Address" />
                                    <button type="submit" className="btn--base">GET ALART</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
