'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AboutAdmin() {
    const [formData, setFormData] = useState<any>({
        title: '',
        spanTitle: '',
        description: '',
        logoText: '',
        instructorTitle: '',
        videoLink: '',
        items: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/about')
            .then(res => res.json())
            .then(data => {
                if (data.about) {
                    setFormData(data.about);
                }
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/about', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving content.', { id: loadToast });
        }
    };

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Edit About Content</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="row g-3 bg-white p-4 rounded shadow-sm">
                <div className="col-md-6">
                    <label className="form-label text-dark">Title (Static Part)</label>
                    <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-dark">Title (Span Part - Red)</label>
                    <input type="text" name="spanTitle" className="form-control" value={formData.spanTitle} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-dark">Logo Text Background</label>
                    <input type="text" name="logoText" className="form-control" value={formData.logoText} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-dark">Instructor Role Title</label>
                    <input type="text" name="instructorTitle" className="form-control" value={formData.instructorTitle} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label text-dark">Description</label>
                    <textarea name="description" className="form-control" rows={3} value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="col-12">
                    <label className="form-label text-dark">Video YouTube Link (Embed URL)</label>
                    <input type="text" name="videoLink" className="form-control" value={formData.videoLink} onChange={handleChange} />
                </div>

                <div className="col-12 mt-4">
                    <h3 className="text-dark">Features List</h3>
                    {formData.items.map((item: any, index: number) => (
                        <div key={index} className="p-3 mb-3 border rounded bg-light">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label text-dark">Item Title</label>
                                    <input type="text" className="form-control" value={item.title} onChange={(e) => handleItemChange(index, 'title', e.target.value)} />
                                </div>
                                <div className="col-md-8">
                                    <label className="form-label text-dark">Item Description</label>
                                    <input type="text" className="form-control" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-danger btn-lg">Save Changes</button>
                    <Link href="/admin" className="btn btn-link text-secondary ml-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
}
