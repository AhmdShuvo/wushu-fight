'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';

export default function CalendarAdmin() {
    const [events, setEvents] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        _id: '',
        month: '',
        event: '',
        location: '',
        date: '',
        order: 1
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const fetchEvents = () => {
        fetch('/api/calendar')
            .then(res => res.json())
            .then(data => {
                if (data.events) {
                    setEvents(data.events);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving Event...');

        let url = '/api/calendar';
        let method = 'POST';

        if (formData._id) {
            url = `/api/calendar/${formData._id}`;
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
        const res = await fetch(`/api/calendar/${id}`, { method: 'DELETE' });

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
            month: '',
            event: '',
            location: '',
            date: '',
            order: events.length + 1
        });
        setIsEditing(false);
    };

    if (loading) {
        return (
            <>
                <InnerBanner title="CALENDAR" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Loading..." />
                <div className="ptb-120 text-center"><h2 className="text-white">Loading...</h2></div>
            </>
        )
    }

    return (
        <>
            <InnerBanner title="CALENDAR" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Yearly Events" />

            <section className="account-widget-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Yearly</span> Calendar</h2>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="account-widget-form-area p-5 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                <div className="section-header">
                                    <h2 className="section-title" style={{ fontSize: '24px' }}>{isEditing ? 'Edit' : 'Add'} <span>Event</span></h2>
                                </div>
                                <form className="account-widget-form mt-4" onSubmit={handleSubmit}>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Month</label>
                                        <select name="month" className="form--control" value={formData.month} onChange={handleChange} required>
                                            <option value="">Select Month</option>
                                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Event Name</label>
                                        <input type="text" name="event" className="form--control" value={formData.event} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Location</label>
                                        <input type="text" name="location" className="form--control" value={formData.location} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Date Range</label>
                                        <input type="text" name="date" className="form--control" value={formData.date} onChange={handleChange} required placeholder="e.g. Jan 05-15" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Display Order</label>
                                        <input type="number" name="order" className="form--control" value={formData.order} onChange={handleChange} />
                                    </div>
                                    <div className="mt-4 d-flex" style={{ gap: '10px' }}>
                                        <button type="submit" className="btn--base w-100">{isEditing ? 'Update' : 'Add'} Event</button>
                                        {isEditing && <button type="button" onClick={resetForm} className="btn--base w-100" style={{ backgroundColor: '#333' }}>Cancel</button>}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-xl-8 col-lg-7">
                            <div className="table-responsive bg-dark p-4 rounded" style={{ border: '1px solid #333' }}>
                                <table className="table table-dark m-0">
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Event</th>
                                            <th>Location</th>
                                            <th>Order</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((event) => (
                                            <tr key={event._id}>
                                                <td>{event.month}</td>
                                                <td>{event.event}</td>
                                                <td>{event.location}</td>
                                                <td>{event.order}</td>
                                                <td>
                                                    <div className="d-flex" style={{ gap: '10px' }}>
                                                        <button onClick={() => handleEdit(event)} className="text-primary" title="Edit"><i className="fas fa-edit"></i></button>
                                                        <button onClick={() => handleDelete(event._id)} className="text-danger" title="Delete"><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
