'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TrainersAdmin() {
    const [trainers, setTrainers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTrainer, setEditingTrainer] = useState<any>(null);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = () => {
        fetch('/api/trainers')
            .then(res => res.json())
            .then(data => {
                setTrainers(data.trainers || []);
                setLoading(false);
            });
    };

    const handleEdit = (trainer: any) => {
        setEditingTrainer(trainer);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(`/api/trainers?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchTrainers();
            toast.success('Deleted successfully');
        } else {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/trainers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingTrainer),
        });
        if (res.ok) {
            setEditingTrainer(null);
            fetchTrainers();
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving trainer', { id: loadToast });
        }
    };

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Manage Trainers</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            {editingTrainer ? (
                <div className="p-4 border rounded mb-5 bg-white shadow-sm">
                    <h2 className="text-dark mb-4">{editingTrainer._id ? 'Edit Trainer' : 'Add New Trainer'}</h2>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-dark">Name</label>
                            <input type="text" className="form-control" value={editingTrainer.name} onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-dark">Role</label>
                            <input type="text" className="form-control" value={editingTrainer.role} onChange={(e) => setEditingTrainer({ ...editingTrainer, role: e.target.value })} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-dark">Image Filename (e.g. trainer-1.png)</label>
                            <input type="text" className="form-control" value={editingTrainer.image} onChange={(e) => setEditingTrainer({ ...editingTrainer, image: e.target.value })} required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label text-dark">Order</label>
                            <input type="number" className="form-control" value={editingTrainer.order} onChange={(e) => setEditingTrainer({ ...editingTrainer, order: parseInt(e.target.value) })} />
                        </div>
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingTrainer(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <button className="btn btn-danger mb-4" onClick={() => setEditingTrainer({ name: '', role: '', image: 'trainer-1.png', order: 0 })}>
                    Add New Trainer
                </button>
            )}

            <div className="row g-4">
                {trainers.map((trainer) => (
                    <div key={trainer._id} className="col-md-3">
                        <div className="card shadow-sm text-center p-3 h-100">
                            <div className="mb-3 mt-2">
                                <img src={`/assets/images/trainer/${trainer.image}`} alt="trainer" width="100" height="100" className="rounded-circle object-fit-cover mx-auto" />
                            </div>
                            <h3 className="h5 text-dark mb-1">{trainer.name}</h3>
                            <p className="text-danger small">{trainer.role}</p>
                            <div className="mt-auto pt-2">
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(trainer)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(trainer._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
