'use client';

import React, { useEffect, useState } from 'react';
import TrainingSlider from './TrainingSlider';

export default function Training() {
    const [styles, setStyles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/training')
            .then(res => res.json())
            .then(data => {
                setStyles(data.styles || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch styles:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="training" className="training-section ptb-120">
            <div className="training-element-one my-paroller" data-paroller-factor="0.08" data-paroller-type="foreground" data-paroller-direction="horizontal">
                <img src="/assets/images/element/element-1.png" alt="element" />
            </div>
            <div className="training-element-two my-paroller" data-paroller-factor="0.08" data-paroller-type="foreground" data-paroller-direction="horizontal">
                <img src="/assets/images/element/element-2.png" alt="element" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-header-wrapper">
                            <div className="section-header">
                                <h2 className="section-title">OUR <span>Wushu</span> TRAINING</h2>
                                <p>Fight Federation has specialized in martial arts since 1986 and has one of the most innovative programs in the nation.</p>
                            </div>
                            <div className="slider-nav-area">
                                <div className="slider-prev" style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-chevron-left"></i>
                                </div>
                                <div className="slider-next" style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="training-slider-area">
                            {loading ? (
                                <div className="text-center py-5">
                                    <h4 className="text-white">Loading Training Styles...</h4>
                                </div>
                            ) : styles.length > 0 ? (
                                <TrainingSlider styles={styles} />
                            ) : (
                                <div className="text-center py-5">
                                    <h4 className="text-white">No training styles available right now.</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

