'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function ScheduleAdmin() {
    const { data: session } = useSession();
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingDay, setEditingDay] = useState<any>(null);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = () => {
        fetch('/api/schedule')
            .then(res => res.json())
            .then(data => {
                setSchedule(data.schedule || []);
                setLoading(false);
            });
    };

    const handleEdit = (item: any) => {
        setEditingDay(JSON.parse(JSON.stringify(item)));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingDay),
        });
        if (res.ok) {
            setEditingDay(null);
            fetchSchedule();
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving schedule', { id: loadToast });
        }
    };

    const renderSlotFields = (timeLabel: string, fieldName: string) => (
        <div className="col-12 p-3 border rounded mb-3 bg-light">
            <h5 className="text-dark">{timeLabel} Slot</h5>
            <div className="row g-2">
                <div className="col-md-4">
                    <label className="form-label text-dark">Class Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={editingDay[fieldName].text}
                        onChange={(e) => setEditingDay({ ...editingDay, [fieldName]: { ...editingDay[fieldName], text: e.target.value } })}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label text-dark">Time Subtext (e.g. 10 am - 11 am)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={editingDay[fieldName].subText}
                        onChange={(e) => setEditingDay({ ...editingDay, [fieldName]: { ...editingDay[fieldName], subText: e.target.value } })}
                    />
                </div>
                <div className="col-md-2 d-flex align-items-end mb-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={editingDay[fieldName].isBlank}
                            onChange={(e) => setEditingDay({ ...editingDay, [fieldName]: { ...editingDay[fieldName], isBlank: e.target.checked } })}
                        />
                        <label className="form-check-label text-dark">Is Blank?</label>
                    </div>
                </div>
                <div className="col-md-2 d-flex align-items-end mb-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={editingDay[fieldName].isActive}
                            onChange={(e) => setEditingDay({ ...editingDay, [fieldName]: { ...editingDay[fieldName], isActive: e.target.checked } })}
                        />
                        <label className="form-check-label text-dark">Highlighed?</label>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Manage Training Schedule</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            {editingDay ? (
                <div className="p-4 border rounded mb-5 bg-white shadow-sm">
                    <h2 className="text-dark mb-4">Edit {editingDay.day} Schedule</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label text-dark">Day Name</label>
                            <input type="text" className="form-control" style={{ width: '200px' }} value={editingDay.day} onChange={(e) => setEditingDay({ ...editingDay, day: e.target.value })} required />
                        </div>

                        {renderSlotFields("10:00 AM", "col10am")}
                        {renderSlotFields("12:00 PM", "col12pm")}
                        {renderSlotFields("02:00 PM", "col02pm")}
                        {renderSlotFields("05:00 PM", "col05pm")}
                        {renderSlotFields("07:00 PM", "col07pm")}

                        <div className="col-12 mt-4 text-dark">
                            <button type="submit" className="btn btn-success me-2">Save Changes</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingDay(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="table-responsive bg-white p-3 rounded shadow-sm">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>10 am</th>
                                <th>12 pm</th>
                                <th>02 pm</th>
                                <th>05 pm</th>
                                <th>07 pm</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((item) => (
                                <tr key={item._id}>
                                    <td className="fw-bold">{item.day}</td>
                                    <td>{item.col10am.isBlank ? '-' : item.col10am.text}</td>
                                    <td>{item.col12pm.isBlank ? '-' : item.col12pm.text}</td>
                                    <td>{item.col02pm.isBlank ? '-' : item.col02pm.text}</td>
                                    <td>{item.col05pm.isBlank ? '-' : item.col05pm.text}</td>
                                    <td>{item.col07pm.isBlank ? '-' : item.col07pm.text}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {session?.user?.role === 'super_admin' && (
                <div className="mt-5 p-4 border rounded bg-white shadow-sm">
                    <h3 className="text-danger">Initial Setup</h3>
                    <p className="text-muted">If you haven't seeded the data yet, click the button below:</p>
                    <button
                        onClick={async () => {
                            const loadToast = toast.loading('Seeding data...');
                            try {
                                const res = await fetch('/api/seed/schedule');
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
