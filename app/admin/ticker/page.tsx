'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TickerAdmin() {
    const [formData, setFormData] = useState({
        updatesText: '',
        resourcesText: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/ticker')
            .then(res => res.json())
            .then(data => {
                if (data.ticker) {
                    setFormData({
                        updatesText: data.ticker.updatesText || '',
                        resourcesText: data.ticker.resourcesText || ''
                    });
                }
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving updates...');
        const res = await fetch('/api/ticker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            toast.success('Ticker updated successfully!', { id: loadToast });
        } else {
            toast.error('Error saving updates.', { id: loadToast });
        }
    };

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Manage Header Ticker</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-sm border">
                <div className="mb-4">
                    <label className="form-label text-dark font-weight-bold">Primary Updates Text (IWUF/SAWUF Notices)</label>
                    <textarea 
                        className="form-control" 
                        rows={3} 
                        value={formData.updatesText} 
                        onChange={(e) => setFormData({ ...formData, updatesText: e.target.value })}
                        required
                    ></textarea>
                    <div className="form-text">This will scroll across the top of the website.</div>
                </div>

                <div className="mb-4">
                    <label className="form-label text-dark font-weight-bold">Resources/Trophy Text</label>
                    <textarea 
                        className="form-control" 
                        rows={3} 
                        value={formData.resourcesText} 
                        onChange={(e) => setFormData({ ...formData, resourcesText: e.target.value })}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-danger btn-lg px-5">Publish Updates</button>
            </form>

            <div className="mt-5 p-4 border rounded bg-light">
                <h5 className="text-dark"><i className="fas fa-info-circle me-2"></i> Live Preview Concept</h5>
                <div className="bg-danger text-white p-2 mt-3 rounded" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <span style={{ animation: 'none' }}>
                        <i className="fas fa-bell me-2"></i> {formData.updatesText} | <i className="fas fa-trophy me-2"></i> {formData.resourcesText}
                    </span>
                </div>
            </div>
        </div>
    );
}
