'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function TestimonialsAdmin() {
    const { data: session } = useSession();
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = () => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => {
                setTestimonials(data.testimonials || []);
                setLoading(false);
            });
    };

    const handleEdit = (item: any) => {
        setEditingTestimonial(item);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchTestimonials();
            toast.success('Deleted successfully');
        } else {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingTestimonial),
        });
        if (res.ok) {
            setEditingTestimonial(null);
            fetchTestimonials();
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving testimonial', { id: loadToast });
        }
    };

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Manage Testimonials</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            {editingTestimonial ? (
                <div className="p-4 border rounded mb-5 bg-white shadow-sm">
                    <h2 className="text-dark mb-4">{editingTestimonial._id ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-dark">Name</label>
                            <input type="text" className="form-control" value={editingTestimonial.name} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-dark">Role</label>
                            <input type="text" className="form-control" value={editingTestimonial.role} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-dark">Testimonial Text</label>
                            <textarea className="form-control" rows={3} value={editingTestimonial.text} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })} required></textarea>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-dark">Image Filename (e.g. client-1.png)</label>
                            <input type="text" className="form-control" value={editingTestimonial.image} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, image: e.target.value })} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-dark">Rating (1-5)</label>
                            <input type="number" min="1" max="5" className="form-control" value={editingTestimonial.rating || 5} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })} />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label text-dark">Order</label>
                            <input type="number" className="form-control" value={editingTestimonial.order || 0} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, order: parseInt(e.target.value) })} />
                        </div>
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingTestimonial(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <button className="btn btn-danger mb-4" onClick={() => setEditingTestimonial({ name: '', role: '', text: '', image: 'client-1.png', rating: 5, order: 0 })}>
                    Add New Testimonial
                </button>
            )}

            <div className="row g-4">
                {testimonials.map((item) => (
                    <div key={item._id} className="col-md-6">
                        <div className="card shadow-sm h-100 p-3">
                            <div className="d-flex align-items-center mb-3">
                                <img src={`/assets/images/client/${item.image}`} alt="client" width="60" className="rounded-circle me-3" />
                                <div>
                                    <h4 className="card-title h5 mb-0 text-dark">{item.name}</h4>
                                    <p className="text-danger mb-0 small">{item.role}</p>
                                </div>
                            </div>
                            <p className="card-text text-muted flex-grow-1" style={{ fontStyle: 'italic' }}>"{item.text}"</p>
                            <div className="mt-3">
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {session?.user?.role === 'super_admin' && (
                <div className="mt-5 p-4 border rounded bg-white shadow-sm">
                    <h3 className="text-danger">Initial Setup</h3>
                    <p className="text-muted">If you haven't seeded the data yet, click the button below:</p>
                    <button
                        onClick={async () => {
                            const loadToast = toast.loading('Seeding data...');
                            try {
                                const res = await fetch('/api/seed/testimonials');
                                const data = await res.json();
                                toast.success(data.message, { id: loadToast });
                                setTimeout(() => window.location.reload(), 1500);
                            } catch (err) {
                                toast.error('Seeding failed', { id: loadToast });
                            }
                        }}
                        className="btn btn-warning"
                    >
                        Seed Initial Data
                    </button>
                </div>
            )}
        </div>
    );
}
