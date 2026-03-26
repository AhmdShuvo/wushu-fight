'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';

export default function TestimonialModeration() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = () => {
        fetch('/api/admin/testimonials')
            .then(res => res.json())
            .then(data => {
                if (data.testimonials) setTestimonials(data.testimonials);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        const loadToast = toast.loading(`${currentStatus ? 'Unapproving' : 'Approving'}...`);
        const res = await fetch(`/api/admin/testimonials/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isApproved: !currentStatus }),
        });

        if (res.ok) {
            toast.success(`Success!`, { id: loadToast });
            fetchTestimonials();
        } else {
            toast.error('Operation failed', { id: loadToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        const loadToast = toast.loading('Deleting...');
        const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });

        if (res.ok) {
            toast.success('Deleted', { id: loadToast });
            fetchTestimonials();
        } else {
            toast.error('Delete failed', { id: loadToast });
        }
    };

    if (loading) return <div className="ptb-120 text-center text-white"><h2>Loading...</h2></div>;

    return (
        <>
            <InnerBanner title="TESTIMONIALS" subtitle="MODERATION" bgImage="/assets/images/bg/bg-12.png" activePage="Moderate Feedback" />

            <section className="account-widget-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60">
                        <h2 className="section-title">Testimonial <span>Approval</span> System</h2>
                        <Link href="/admin" className="btn--base">Back to Dashboard</Link>
                    </div>

                    <div className="row g-4">
                        {testimonials.map((t) => (
                            <div className="col-lg-6" key={t._id}>
                                <div className="p-4 rounded shadow-sm h-100" style={{ backgroundColor: '#111', border: `2px solid ${t.isApproved ? '#28a745' : '#dc3545'}` }}>
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={t.image || '/assets/images/client/client-1.png'} alt="user" className="rounded-circle mr-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        <div>
                                            <h5 className="text-white mb-0">{t.name}</h5>
                                            <span className="text-danger small">{t.role}</span>
                                        </div>
                                        <div className="ml-auto">
                                            <span className={`badge ${t.isApproved ? 'bg-success' : 'bg-danger'}`}>
                                                {t.isApproved ? 'APPROVED' : 'PENDING'}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-white-50 small italic mb-4">"{t.text}"</p>
                                    <div className="d-flex gap-3">
                                        <button onClick={() => toggleApproval(t._id, t.isApproved)} className={`btn btn-sm ${t.isApproved ? 'btn-outline-warning' : 'btn-success'} w-100`}>
                                            {t.isApproved ? <><i className="fas fa-times me-2"></i> Unapprove</> : <><i className="fas fa-check me-2"></i> Approve</>}
                                        </button>
                                        <button onClick={() => handleDelete(t._id)} className="btn btn-sm btn-outline-danger px-4">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
