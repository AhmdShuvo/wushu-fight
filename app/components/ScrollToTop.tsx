"use client";
import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <a href="#" className={`scrollToTop ${isVisible ? 'active' : ''}`} onClick={scrollToTop}>
            <img src="/assets/images/element/top.png" alt="element" />
            <div className="scrollToTop-icon">
                <i className="fas fa-arrow-up"></i>
            </div>
        </a>
    );
}
