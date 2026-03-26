import React from 'react';

export default function Service() {
    return (
        <section className="service-section ptb-120">
            <div className="container">
                <div className="service-area">
                    <div className="service-element">
                        <img src="assets/images/element/element-24.png" alt="element" />
                    </div>
                    <div className="row justify-content-center mb-10-none">
                        <div className="col-xl-12">
                            <div className="service-slider">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="service-item">
                                            <div className="service-thumb">
                                                <img src="assets/images/service/service-1.png" alt="service" />
                                                <div className="service-overlay">
                                                    <div className="service-overlay-content">
                                                        <h3 className="title"><a href="training-details.html">PREFederation MARTIAL ARTS</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="service-item">
                                            <div className="service-thumb">
                                                <img src="assets/images/service/service-2.png" alt="service" />
                                                <div className="service-overlay">
                                                    <div className="service-overlay-content">
                                                        <h3 className="title"><a href="training-details.html">PREFederation MARTIAL ARTS</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="service-item">
                                            <div className="service-thumb">
                                                <img src="assets/images/service/service-3.png" alt="service" />
                                                <div className="service-overlay">
                                                    <div className="service-overlay-content">
                                                        <h3 className="title"><a href="training-details.html">PREFederation MARTIAL ARTS</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
