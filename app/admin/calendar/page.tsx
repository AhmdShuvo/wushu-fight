'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import CustomDateTimePicker from '../../components/CustomDateTimePicker';

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
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };
        
        if (name === 'date' && value) {
            const date = new Date(value);
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            newFormData.month = monthNames[date.getMonth()];
        }
        
        setFormData(newFormData);
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
                            <h2 className="section-title"> <span>Yearly Calendar</span></h2>
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
                                    {formData.month && (
                                        <div className="mb-4">
                                            <label className="text-white-50 mb-1" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Selected Month</label>
                                            <div className="h4 text-white" style={{ color: '#3ee80f' }}>{formData.month}</div>
                                        </div>
                                    )}
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Event Name</label>
                                        <input type="text" name="event" className="form--control" value={formData.event} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Location</label>
                                        <input type="text" name="location" className="form--control" value={formData.location} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="text-white mb-2 font-weight-bold">Event Date & Time</label>
                                        <CustomDateTimePicker 
                                            value={formData.date} 
                                            onChange={(val) => {
                                                const e = { target: { name: 'date', value: val } } as any;
                                                handleChange(e);
                                            }} 
                                            placeholder="Select Date & Time"
                                        />
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
            <style jsx>{`
                .form-group {
                    position: relative;
                }
                .input-with-icon {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .calendar-icon {
                    position: absolute;
                    right: 20px;
                    color: #3ee80f;
                    font-size: 18px;
                    pointer-events: none;
                    transition: all 0.3s ease;
                }
                .form--control {
                    background: rgba(26, 26, 26, 0.8) !important;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: #fff !important;
                    padding: 15px 18px !important;
                    padding-right: 50px !important; /* Make room for icon */
                    border-radius: 12px !important;
                    font-size: 15px !important;
                    letter-spacing: 0.5px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .form--control:focus {
                    background: rgba(30, 30, 30, 0.95) !important;
                    border-color: #3ee80f !important;
                    box-shadow: 0 0 25px rgba(62, 232, 15, 0.2), inset 0 0 10px rgba(62, 232, 15, 0.05) !important;
                    outline: none;
                }
                .form--control:focus + .calendar-icon {
                    transform: scale(1.1);
                    text-shadow: 0 0 10px rgba(62, 232, 15, 0.5);
                }
                .form--control:hover {
                    border-color: rgba(62, 232, 15, 0.4) !important;
                }
                input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    color: transparent;
                    cursor: pointer;
                    z-index: 1;
                    /* Hide the default icon but keep the hit area */
                }
                .btn--base {
                    background: linear-gradient(135deg, #3ee80f 0%, #2dbd0c 100%);
                    color: #000;
                    padding: 15px 25px;
                    border-radius: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border: none;
                    box-shadow: 0 4px 15px rgba(62, 232, 15, 0.2);
                    transition: all 0.4s ease;
                }
                .btn--base:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(62, 232, 15, 0.4);
                    filter: brightness(1.1);
                }
                .section-title span {
                    color: #3ee80f;
                    text-shadow: 0 0 15px rgba(62, 232, 15, 0.2);
                }
            `}</style>
        </>
    );
}
