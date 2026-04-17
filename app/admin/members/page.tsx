'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import MediaPicker from '../../components/admin/MediaPicker';

export default function MembersAdmin() {
    const [members, setMembers] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        _id: '',
        name: '',
        role: '',
        desc: '',
        image: '',
        category: 'executive',
        order: 1
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchMembers = () => {
        fetch('/api/members')
            .then(res => res.json())
            .then(data => {
                if (data.members) setMembers(data.members);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving Member...');

        let url = '/api/members';
        let method = 'POST';

        if (formData._id) {
            url = `/api/members/${formData._id}`;
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
            fetchMembers();
        } else {
            const data = await res.json();
            toast.error(data.error || 'Error saving member.', { id: loadToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;

        const loadToast = toast.loading('Deleting...');
        const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });

        if (res.ok) {
            toast.success('Deleted successfully!', { id: loadToast });
            fetchMembers();
        } else {
            toast.error('Error deleting member.', { id: loadToast });
        }
    };

    const handleEdit = (member: any) => {
        setFormData(member);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            name: '',
            role: '',
            desc: '',
            image: '',
            category: 'executive',
            order: members.length + 1
        });
        setIsEditing(false);
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-success"></div>
                <h4 className="mt-3">Loading Members...</h4>
            </div>
        )
    }

    return (
        <div className="admin-page-content">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h2 className="m-0 font-weight-bold">Registry <span className="text-success">Management</span></h2>
                    <p className="text-muted small m-0">Create and manage your organization's members and executive committee.</p>
                </div>
                <div className="d-flex gap-2">
                    <button onClick={() => { resetForm(); setShowModal(true); }} className="btn btn-success shadow-sm d-flex align-items-center gap-2">
                        <i className="fas fa-user-plus"></i> Add New Member
                    </button>
                    <button onClick={fetchMembers} className="btn btn-outline-dark shadow-sm">
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <section className="members-grid-section">
                <div className="row g-4">
                        {members.map((member) => (
                            <div key={member._id} className="col-xl-4 col-lg-6">
                                <div className="card h-100 shadow border-0 overflow-hidden" style={{ background: '#111', borderRadius: '15px', border: member.category === 'founding' ? '1px solid #3ee80f' : '1px solid #333' }}>
                                    <div className="p-4">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="member-thumb mr-4" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#222', overflow: 'hidden', flexShrink: 0, border: '2px solid #333' }}>
                                                <img src={member.image || '/assets/images/placeholder.png'} alt={member.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <h5 className="text-white mb-1 text-truncate">{member.name}</h5>
                                                <span className={`badge ${member.category === 'founding' ? 'bg--secondary' : 'bg-primary'} mb-0`} style={{ fontSize: '10px', color: member.category === 'founding' ? '#000' : '#fff' }}>{member.category.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <p className="font-weight-bold mb-2 small" style={{ color: '#3ee80f' }}>{member.role}</p>
                                        <p className="text-white-50 small mb-4 line-clamp-2" style={{ height: '40px', overflow: 'hidden' }}>{member.desc}</p>
                                        <div className="d-flex gap-3 pt-3 border-top border-secondary">
                                            <button onClick={() => handleEdit(member)} className="btn btn-sm btn-outline-light w-100">
                                                <i className="fas fa-edit mr-2"></i> Edit
                                            </button>
                                            <button onClick={() => handleDelete(member._id)} className="btn btn-sm btn-outline-success w-100" style={{ borderColor: '#3ee80f', color: '#3ee80f' }}>
                                                <i className="fas fa-trash mr-2"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Member Form Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 999999, backdropFilter: 'blur(5px)' }}>
                    <div className="p-5 rounded position-relative" style={{ backgroundColor: '#111', border: '1px solid #333', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 0 50px rgba(0,0,0,1)' }}>
                        <button onClick={resetForm} className="position-absolute border-0 bg-transparent text-white" style={{ top: '20px', right: '20px', fontSize: '24px', cursor: 'pointer', zIndex: 10 }}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="section-header mb-4">
                            <h2 className="section-title" style={{ fontSize: '28px' }}>{isEditing ? 'Update' : 'Register'} <span>Member</span></h2>
                        </div>
                        <form className="account-widget-form" onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Full Name</label>
                                    <input type="text" name="name" className="form--control" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Role/Designation</label>
                                    <input type="text" name="role" className="form--control" value={formData.role} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Category</label>
                                    <select name="category" className="form--control text-white" value={formData.category} onChange={handleChange} required style={{ display: 'block', backgroundColor: '#222', color: '#fff' }}>
                                        <option value="executive" style={{ color: '#fff', background: '#222' }}>Executive Committee</option>
                                        <option value="founding" style={{ color: '#fff', background: '#222' }}>Founding Member</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Display Order</label>
                                    <input type="number" name="order" className="form--control" value={formData.order} onChange={handleChange} />
                                </div>
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Detailed Bio/Description</label>
                                    <textarea name="desc" className="form--control" value={formData.desc} onChange={handleChange} required style={{ height: '100px' }}></textarea>
                                </div>
                                <div className="col-12 form-group">
                                    <MediaPicker 
                                        label="Member Profile Photo" 
                                        value={formData.image || ''} 
                                        onChange={(url) => setFormData({...formData, image: url})} 
                                        type="image"
                                    />
                                </div>
                                <div className="col-12 mt-4 pt-3 border-top border-secondary">
                                    <button type="submit" className="btn--base w-100 py-3 font-weight-bold">
                                        {isEditing ? 'COMMIT UPDATES' : 'ENROLL MEMBER'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

