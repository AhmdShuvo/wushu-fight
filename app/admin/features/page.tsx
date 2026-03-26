'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function FeaturesAdmin() {
    const { data: session } = useSession();
    const [features, setFeatures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingFeature, setEditingFeature] = useState<any>(null);

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = () => {
        fetch('/api/features')
            .then(res => res.json())
            .then(data => {
                setFeatures(data.features || []);
                setLoading(false);
            });
    };

    const handleEdit = (item: any) => {
        setEditingFeature(item);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(`/api/features?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchFeatures();
            toast.success('Deleted successfully');
        } else {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/features', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingFeature),
        });
        if (res.ok) {
            setEditingFeature(null);
            fetchFeatures();
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving feature', { id: loadToast });
        }
    };

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Manage "Why Choose Wushu" Features</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            {editingFeature ? (
                <div className="p-4 border rounded mb-5 bg-white shadow-sm">
                    <h2 className="mb-4">{editingFeature._id ? 'Edit Feature' : 'Add New Feature'}</h2>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-2">
                            <label className="form-label text-dark">Number (e.g. 01)</label>
                            <input type="text" className="form-control" value={editingFeature.num} onChange={(e) => setEditingFeature({ ...editingFeature, num: e.target.value })} required />
                        </div>
                        <div className="col-md-5">
                            <label className="form-label text-dark">Title</label>
                            <input type="text" className="form-control" value={editingFeature.title} onChange={(e) => setEditingFeature({ ...editingFeature, title: e.target.value })} required />
                        </div>
                        <div className="col-md-5">
                            <label className="form-label text-dark">Icon Filename (e.g. icon-6.png)</label>
                            <input type="text" className="form-control" value={editingFeature.icon} onChange={(e) => setEditingFeature({ ...editingFeature, icon: e.target.value })} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-dark">Description</label>
                            <textarea className="form-control" rows={3} value={editingFeature.description} onChange={(e) => setEditingFeature({ ...editingFeature, description: e.target.value })} required></textarea>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label text-dark">Order</label>
                            <input type="number" className="form-control" value={editingFeature.order || 0} onChange={(e) => setEditingFeature({ ...editingFeature, order: parseInt(e.target.value) })} />
                        </div>
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingFeature(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <button className="btn btn-danger mb-4" onClick={() => setEditingFeature({ num: '', title: '', description: '', icon: 'icon-6.png', order: 0 })}>
                    Add New Feature
                </button>
            )}

            <div className="row g-4">
                {features.map((item) => (
                    <div key={item._id} className="col-md-3">
                        <div className="card shadow-sm h-100 text-center p-3">
                            <div className="mb-3 mt-2">
                                <img src={`/assets/images/icon/${item.icon}`} alt="icon" width="50" />
                            </div>
                            <span className="text-danger fw-bold">{item.num}</span>
                            <h3 className="h5 mt-2">{item.title}</h3>
                            <p className="text-muted small flex-grow-1">{item.description}</p>
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
                                const res = await fetch('/api/seed/features');
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
