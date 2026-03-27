'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import MediaPicker from '../../components/admin/MediaPicker';

export default function TournamentEventsAdmin() {
    const [events, setEvents] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        _id: '',
        title: '',
        description: '',
        image: '',
        videoUrl: '',
        pdfUrl: '',
        date: '',
        location: '',
        type: 'national',
        gridSize: 'medium',
        order: 1
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const fetchEvents = () => {
        fetch('/api/tournament-events')
            .then(res => res.json())
            .then(data => {
                if (data.events) setEvents(data.events);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving Tournament Event...');

        let url = '/api/tournament-events';
        let method = 'POST';

        if (formData._id) {
            url = `/api/tournament-events/${formData._id}`;
            method = 'PATCH';
        }

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            toast.success('Saved successfully!', { id: loadToast });
            resetForm();
            fetchEvents();
        } else {
            toast.error('Error saving event.', { id: loadToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        const loadToast = toast.loading('Deleting...');
        const res = await fetch(`/api/tournament-events/${id}`, { method: 'DELETE' });

        if (res.ok) {
            toast.success('Deleted successfully!', { id: loadToast });
            fetchEvents();
        } else {
            toast.error('Error deleting event.', { id: loadToast });
        }
    };

    const handleEdit = (event: any) => {
        setFormData(event);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            title: '',
            description: '',
            image: '',
            videoUrl: '',
            pdfUrl: '',
            date: '',
            location: '',
            type: 'national',
            gridSize: 'medium',
            order: events.length + 1
        });
        setIsEditing(false);
    };

    if (loading) {
        return (
            <>
                <InnerBanner title="TOURNAMENT" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Loading..." />
                <div className="ptb-120 text-center"><h2 className="text-white">Loading...</h2></div>
            </>
        )
    }

    return (
        <>
            <InnerBanner title="TOURNAMENT" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Sports Events" />

            <section className="account-widget-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1400px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Tournament</span> Events</h2>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    <div className="row">
                        <div className="col-xl-5 col-lg-6">
                            <div className="account-widget-form-area p-5 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #3ee80f' }}>
                                <div className="section-header">
                                    <h2 className="section-title" style={{ fontSize: '24px', color: "#fff" }}>{isEditing ? 'Edit' : 'Add New'} <span>Sports Event</span></h2>
                                </div>
                                <form className="account-widget-form mt-4" onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-12 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Event Title</label>
                                            <input type="text" name="title" className="form--control" value={formData.title} onChange={handleChange} required />
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Event Type</label>
                                            <select name="type" className="form--control" value={formData.type} onChange={handleChange} required>
                                                <option value="national">National</option>
                                                <option value="international">International</option>
                                            </select>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Grid Size (Bento)</label>
                                            <select name="gridSize" className="form--control" value={formData.gridSize} onChange={handleChange} required>
                                                <option value="small">Small (1/3 Width)</option>
                                                <option value="medium">Medium (1/2 Width)</option>
                                                <option value="large">Large (2/3 Width)</option>
                                            </select>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Date</label>
                                            <input type="text" name="date" className="form--control" value={formData.date} onChange={handleChange} required />
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Location</label>
                                            <input type="text" name="location" className="form--control" value={formData.location} onChange={handleChange} required />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Description</label>
                                            <textarea name="description" className="form--control" value={formData.description} onChange={handleChange} required style={{ height: '120px' }}></textarea>
                                        </div>
                                        <div className="col-12 form-group">
                                            <MediaPicker 
                                                label="Event Banner / Thumbnail" 
                                                value={formData.image || ''} 
                                                onChange={(url) => setFormData({...formData, image: url})} 
                                                type="image"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold">Video Clip (URL)</label>
                                            <input type="text" name="videoUrl" className="form--control" value={formData.videoUrl} onChange={handleChange} placeholder="YouTube/MP4 Link" />
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <MediaPicker 
                                                label="Event Detail / Rules PDF" 
                                                value={formData.pdfUrl || ''} 
                                                onChange={(url) => setFormData({...formData, pdfUrl: url})} 
                                                type="pdf"
                                            />
                                        </div>
                                        <div className="col-12 mt-4 d-flex" style={{ gap: '15px' }}>
                                            <button type="submit" className="btn--base w-100">{isEditing ? 'Update' : 'Add'} Event</button>
                                            {isEditing && <button type="button" onClick={resetForm} className="btn--base w-100 bg-dark">Cancel</button>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-xl-7 col-lg-6 mt-lg-0 mt-5">
                            <div className="row g-4">
                                {events.map((event) => (
                                    <div key={event._id} className="col-xl-6 col-lg-12">
                                        <div className="card h-100 shadow border-0 overflow-hidden" style={{ background: '#111', borderRadius: '15px' }}>
                                            <div className="position-relative">
                                                <img src={event.image || '/assets/images/placeholder.png'} alt={event.title} className="w-100" style={{ height: '180px', objectFit: 'cover' }} />
                                                <div className="position-absolute" style={{ top: '15px', left: '15px' }}>
                                                    <span className={`badge ${event.type === 'national' ? 'bg--secondary' : 'bg--primary'}`} style={{ color: '#000' }}>{event.type.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h5 className="text-white mb-1" style={{ fontSize: '18px' }}>{event.title}</h5>
                                                <p className="text-muted small mb-3">{event.location} | {event.date}</p>
                                                <div className="d-flex" style={{ gap: '10px' }}>
                                                    <button onClick={() => handleEdit(event)} className="btn btn-sm btn-outline-light"><i className="fas fa-edit me-1"></i> Edit</button>
                                                    <button onClick={() => handleDelete(event._id)} className="btn btn-sm btn-outline-danger"><i className="fas fa-trash me-1"></i> Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
