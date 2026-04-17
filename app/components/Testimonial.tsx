'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FALLBACK_TESTIMONIALS = [
    {
        _id: '1',
        name: 'Ariful Islam',
        role: 'National Athlete',
        text: 'Wushu has changed my life. The discipline and strength I gained here are unmatched.',
        rating: 5
    },
    {
        _id: '2',
        name: 'Sultana Razia',
        role: 'Parent',
        text: 'My son has become much more focused and disciplined after joining the Wushu training program.',
        rating: 5
    },
    {
        _id: '3',
        name: 'Kamrul Hasan',
        role: 'Advanced Practitioner',
        text: 'The trainers are world-class and the community is very supportive. Highly recommended for all ages.',
        rating: 4
    }
];

export default function Testimonial() {
    const [testimonials, setTestimonials] = useState<any[]>(FALLBACK_TESTIMONIALS);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        text: '',
        image: '', // No image required, will use fixed avatar
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => {
                if (data.testimonials && data.testimonials.length > 0) {
                    setTestimonials(data.testimonials);
                }
            })
            .catch(err => console.error("Testimonial fetch error:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setRating = (val: number) => {
        setFormData({ ...formData, rating: val });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const loadToast = toast.loading('Submitting your feedback...');

        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, image: 'fixed-avatar' }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message, { id: loadToast });
                setShowForm(false);
                setFormData({ name: '', role: '', text: '', image: '', rating: 5 });
            } else {
                toast.error(data.error || 'Submission failed', { id: loadToast });
            }
        } catch (error) {
            toast.error('Error submitting feedback', { id: loadToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="client-section ptb-120" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                {/* Commenting out redundant first header and grid section */}
                {/* 
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-header-wrapper">
                            <div className="section-header">
                                <h2 className="section-title text-dark">STUDENT'S <span>TESTIMONIAL</span></h2>
                                <p className="text-muted">Voices of our athletes and practitioners reflecting the spirit of Wushu in Bangladesh.</p>
                            </div>
                            <div className="slider-nav-area">
                                <button onClick={() => setShowForm(!showForm)} className="btn--base" style={{ fontSize: '13px', padding: '10px 20px' }}>
                                    {showForm ? 'Cancel Submission' : 'Submit Your Feedback'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                */}

                {showForm && (
                     <div className="row justify-content-center mb-60">
                     <div className="col-lg-8">
                         <div className="form-area p-5 shadow-lg border" style={{ backgroundColor: '#fff', borderColor: '#eee', borderRadius: 0 }}>
                             <h4 className="text-dark mb-4">Leave Your Feedback</h4>
                             <form onSubmit={handleSubmit}>
                                 <div className="row g-4">
                                     <div className="col-md-6 form-group">
                                         <input type="text" name="name" className="form--control" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
                                     </div>
                                     <div className="col-md-6 form-group">
                                         <input type="text" name="role" className="form--control" placeholder="Your Role (e.g. Athlete, Parent)" value={formData.role} onChange={handleChange} required />
                                     </div>
                                     
                                     <div className="col-12 form-group text-center mb-3">
                                         <label className="text-muted d-block mb-2 small font-weight-bold">Rate Your Experience</label>
                                         <div className="star-rating d-flex justify-content-center gap-2">
                                             {[1, 2, 3, 4, 5].map((star) => (
                                                 <i 
                                                     key={star} 
                                                     className={`fas fa-star fa-2x cursor-pointer transition ${star <= formData.rating ? 'text-warning' : 'text-secondary'}`}
                                                     style={{ cursor: 'pointer' }}
                                                     onClick={() => setRating(star)}
                                                 ></i>
                                             ))}
                                         </div>
                                     </div>

                                     <div className="col-12 form-group">
                                         <textarea name="text" className="form--control" placeholder="Your Message" value={formData.text} onChange={handleChange} required style={{ height: '120px' }}></textarea>
                                     </div>
                                     <div className="col-12 text-center">
                                         <button type="submit" className="btn--base" disabled={isSubmitting}>
                                             {isSubmitting ? 'Submitting...' : 'Post Testimonial'} <i className="fas fa-paper-plane ml-2"></i>
                                         </button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                 </div>
                )}

                {/* Part 1: Original Testimonial Grid (Commented Out) */}
                {/* 
                <div className="client-area mb-80">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="testimonial-grid">
                                {testimonials.map((t) => (
                                    <div className="client-item mb-4" key={`grid-${t._id}`}>
                                        <div className="client-header">
                                            <div className="client-quote">
                                                <img src="/assets/images/client/quote.png" alt="client" />
                                            </div>
                                            <div className="client-thumb d-flex align-items-center justify-content-center">
                                                <i className="fas fa-user fa-3x text-muted"></i>
                                            </div>
                                        </div>
                                        <div className="client-content">
                                            <p className="text-dark opacity-75">{t.text}</p>
                                        </div>
                                        <div className="client-footer mt-auto">
                                            <div className="client-footer-left">
                                                <h4 className="title text-dark">{t.name}</h4>
                                                <span className="sub-title text-secondary">{t.role}</span>
                                            </div>
                                            <div className="client-footer-right">
                                                <span className="ratings">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`fas fa-star ${i < t.rating ? '' : 'active'}`}></i>
                                                    ))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                */}

                {/* Part 2: Featured Testimonial Slider */}
                <div className="client-area mt-80">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                             <div className="section-header-wrapper mb-5">
                                <div className="section-header">
                                    <h2 className="section-title text-dark">STUDENT <span>TESTIMONIALS</span></h2>
                                    <p className="text-muted">Celebrating the dedication and progress of our martial arts community in motion.</p>
                                </div>
                                <div className="slider-nav-area">
                                    <button onClick={() => setShowForm(!showForm)} className="btn--base" style={{ fontSize: '13px', padding: '10px 20px' }}>
                                        {showForm ? 'Cancel Submission' : 'Submit Testimonial'}
                                    </button>
                                </div>
                            </div>
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]}
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={testimonials.length > 2}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    1200: { slidesPerView: 3 },
                                    768: { slidesPerView: 2 },
                                    576: { slidesPerView: 1 },
                                }}
                                className="testimonial-swiper pb-5"
                            >
                                {testimonials.map((t) => (
                                    <SwiperSlide key={`swiper-${t._id}`}>
                                         <div className="client-item mb-4 h-100 d-flex flex-column">
                                            <div className="client-header">
                                                <div className="client-quote">
                                                    <img src="/assets/images/client/quote.png" alt="client" />
                                                </div>
                                                <div className="client-thumb d-flex align-items-center justify-content-center">
                                                     <i className="fas fa-user fa-3x text-muted"></i>
                                                </div>
                                            </div>
                                            <div className="client-content flex-grow-1">
                                                <p className="text-dark opacity-75">{t.text}</p>
                                            </div>
                                            <div className="client-footer mt-auto">
                                                <div className="client-footer-left">
                                                    <h4 className="title text-dark">{t.name}</h4>
                                                    <span className="sub-title text-secondary">{t.role}</span>
                                                </div>
                                                <div className="client-footer-right">
                                                    <span className="ratings">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i key={i} className={`fas fa-star ${i < t.rating ? '' : 'active'}`}></i>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .testimonial-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 30px;
                }
                @media (max-width: 767px) {
                    .testimonial-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .client-item {
                    background: #fff;
                    border: 1px solid #eeeff2;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.04);
                    transition: all 0.3s ease;
                    border-radius: 0 !important;
                    min-height: 350px;
                    position: relative;
                }
                .client-item::before {
                    border-radius: 0 !important;
                    display: none;
                }
                .client-item:hover {
                    background: #fff;
                    transform: translateY(-5px);
                    border-color: #3ee80f;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .testimonial-swiper .swiper-pagination-bullet-active {
                    background: #3ee80f !important;
                }
                .testimonial-swiper .swiper-pagination {
                    bottom: 0 !important;
                }
            `}</style>
        </section>
    );
}
