'use client';
import { useEffect, useRef } from 'react';

export default function SwiperInit() {
    const swiperInstances = useRef<any[]>([]);

    useEffect(() => {
        const initSwipers = () => {
            // @ts-ignore
            if (typeof window === 'undefined' || !window.Swiper) return;
            // @ts-ignore
            const Swiper = window.Swiper;

            const commonConfig = {
                speed: 1000,
                loop: true,
                autoplay: {
                    speeds: 2000,
                    delay: 4000,
                }
            };

            // Banner handled locally in Banner.tsx
            // Feature
            if (document.querySelector('.feature-slider')) {
                swiperInstances.current.push(new Swiper('.feature-slider', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    autoplay: {
                        speeds: 2000,
                        delay: 4000,
                    },
                    speed: 1000,
                    breakpoints: {
                        991: { slidesPerView: 2 },
                        767: { slidesPerView: 2 },
                        575: { slidesPerView: 1 },
                    }
                }));
            }

            // Training
            if (document.querySelector('.training-slider')) {
                swiperInstances.current.push(new Swiper('.training-slider', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: true,
                    navigation: {
                        nextEl: '.slider-next',
                        prevEl: '.slider-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    autoplay: {
                        speeds: 2000,
                        delay: 4000,
                    },
                    speed: 1000,
                    breakpoints: {
                        991: { slidesPerView: 2 },
                        767: { slidesPerView: 2 },
                        575: { slidesPerView: 1 },
                    }
                }));
            }

            // Trainer
            if (document.querySelector('.trainer-slider')) {
                swiperInstances.current.push(new Swiper('.trainer-slider', {
                    slidesPerView: 4,
                    spaceBetween: 0,
                    loop: true,
                    navigation: {
                        nextEl: '.slider-next',
                        prevEl: '.slider-prev',
                    },
                    pagination: {
                        el: '.custom-pagination',
                        type: 'progressbar',
                    },
                    autoplay: {
                        speeds: 2000,
                        delay: 4000,
                    },
                    speed: 1000,
                    breakpoints: {
                        1199: { slidesPerView: 3 },
                        991: { slidesPerView: 2 },
                        767: { slidesPerView: 2 },
                        575: { slidesPerView: 1 },
                    }
                }));
            }

            // Service
            if (document.querySelector('.service-slider')) {
                swiperInstances.current.push(new Swiper('.service-slider', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    autoplay: {
                        speeds: 2000,
                        delay: 4000,
                    },
                    speed: 1000,
                    breakpoints: {
                        991: { slidesPerView: 2 },
                        767: { slidesPerView: 2 },
                        575: { slidesPerView: 1 },
                    }
                }));
            }

            // Client
            if (document.querySelector('.client-slider')) {
                swiperInstances.current.push(new Swiper('.client-slider', {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    loop: true,
                    navigation: {
                        nextEl: '.slider-next',
                        prevEl: '.slider-prev',
                    },
                    autoplay: {
                        speeds: 2000,
                        delay: 4000,
                    },
                    speed: 1000,
                    breakpoints: {
                        991: { slidesPerView: 1 },
                        767: { slidesPerView: 1 },
                        575: { slidesPerView: 1 },
                    }
                }));
            }

            // Tutorial
            if (document.querySelector('.tutorial-slider')) {
                swiperInstances.current.push(new Swiper('.tutorial-slider', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: '.slider-next',
                        prevEl: '.slider-prev',
                    },
                    pagination: {
                        el: '.custom-pagination',
                        type: 'progressbar',
                    },
                    autoplay: {
                        speeds: 2000,
                        delay: 4000,
                    },
                    speed: 1000,
                    breakpoints: {
                        1199: { slidesPerView: 3 },
                        991: { slidesPerView: 2 },
                        767: { slidesPerView: 2 },
                        575: { slidesPerView: 1 },
                    }
                }));
            }
        };

        const checkSwiper = setInterval(() => {
            // @ts-ignore
            if (window.Swiper) {
                clearInterval(checkSwiper);
                // Give a small delay to ensure DOM is fully ready / transition from huge to normal
                setTimeout(initSwipers, 100);
            }
        }, 100);

        return () => {
            clearInterval(checkSwiper);
            swiperInstances.current.forEach(s => s.destroy && s.destroy(true, true));
            swiperInstances.current = [];
        };
    }, []);

    return null;
}
