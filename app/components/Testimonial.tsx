'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Testimonial() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
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
                if (data.testimonials) setTestimonials(data.testimonials);
            });
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
        <section className="client-section client-section-two ptb-120 bg-overlay-black bg_img" style={{ backgroundImage: "url('/assets/images/bg/bg-7.png')" }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-header-wrapper">
                            <div className="section-header white">
                                <h2 className="section-title">OUR <span>STUDENT'S</span> TESTIMONIAL</h2>
                                <p>Voices of our athletes and practitioners reflecting the spirit of Wushu in Bangladesh.</p>
                            </div>
                            <div className="slider-nav-area">
                                <button onClick={() => setShowForm(!showForm)} className="btn--base" style={{ fontSize: '13px', padding: '10px 20px' }}>
                                    {showForm ? 'Cancel Submission' : 'Submit Your Feedback'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showForm && (
                     <div className="row justify-content-center mb-60">
                     <div className="col-lg-8">
                         <div className="form-area p-5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                             <h4 className="text-white mb-4">Leave Your Feedback</h4>
                             <form onSubmit={handleSubmit}>
                                 <div className="row g-4">
                                     <div className="col-md-6 form-group">
                                         <input type="text" name="name" className="form--control" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
                                     </div>
                                     <div className="col-md-6 form-group">
                                         <input type="text" name="role" className="form--control" placeholder="Your Role (e.g. Athlete, Parent)" value={formData.role} onChange={handleChange} required />
                                     </div>
                                     
                                     <div className="col-12 form-group text-center mb-3">
                                         <label className="text-white-50 d-block mb-2 small">Rate Your Experience</label>
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

                <div className="client-area">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="testimonial-grid">
                                {testimonials.map((t, index) => (
                                    <div className="client-item mb-4" key={t._id}>
                                        <div className="client-header">
                                            <div className="client-quote">
                                                <img src="/assets/images/client/quote.png" alt="client" />
                                            </div>
                                            <div className="client-thumb d-flex align-items-center justify-content-center" style={{ borderRadius: '50%' }}>
                                                <i className="fas fa-user fa-3x text-white-50"></i>
                                            </div>
                                        </div>
                                        <div className="client-content">
                                            <p>{t.text}</p>
                                        </div>
                                        <div className="client-footer">
                                            <div className="client-footer-left">
                                                <h4 className="title">{t.name}</h4>
                                                <span className="sub-title">{t.role}</span>
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
            </div>
            <style jsx>{`
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
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    transition: all 0.3s ease;
                }
                .client-item:hover {
                    background: rgba(255,255,255,0.07);
                    transform: translateY(-5px);
                }
            `}</style>
        </section>
    );
}
