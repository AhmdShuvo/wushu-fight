'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import { UserRole } from '@/types/roles';

export default function UserManagementAdmin() {
    const [users, setUsers] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        _id: '',
        name: '',
        email: '',
        password: '',
        role: UserRole.USER
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = () => {
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                if (data.users) setUsers(data.users);
                setLoading(false);
            })
            .catch(err => {
                toast.error('Failed to load users');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading(isEditing ? 'Updating User...' : 'Creating User...');

        let url = '/api/admin/users';
        let method = 'POST';

        if (isEditing && formData._id) {
            url = `/api/admin/users/${formData._id}`;
            method = 'PATCH';
        }

        // If editing and password is empty, don't send it
        const submitData = { ...formData };
        if (isEditing && !submitData.password) {
            delete submitData.password;
        }

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                toast.success(isEditing ? 'User updated successfully!' : 'User created successfully!', { id: loadToast });
                resetForm();
                fetchUsers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Operation failed.', { id: loadToast });
            }
        } catch (error) {
            toast.error('Network error.', { id: loadToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

        const loadToast = toast.loading('Deleting...');
        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });

            if (res.ok) {
                toast.success('User deleted successfully!', { id: loadToast });
                fetchUsers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Error deleting user.', { id: loadToast });
            }
        } catch (error) {
            toast.error('Network error.', { id: loadToast });
        }
    };

    const handleEdit = (user: any) => {
        setFormData({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            password: '' // Don't show hashed password, leave blank for no change
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            name: '',
            email: '',
            password: '',
            role: UserRole.USER
        });
        setIsEditing(false);
        setShowModal(false);
    };

    if (loading) {
        return (
            <>
                <InnerBanner title="USERS" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Loading..." />
                <div className="ptb-120 text-center"><h2 className="text-white">Loading...</h2></div>
            </>
        )
    }

    return (
        <>
            <InnerBanner title="USER MANAGEMENT" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage System Users" />

            <section className="account-widget-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1400px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Platform</span> Users</h2>
                        </div>
                        <div className="d-flex gap-3">
                            <button onClick={() => { resetForm(); setShowModal(true); }} className="btn--base">
                                <i className="fas fa-user-plus mr-2"></i> Create User
                            </button>
                            <Link href="/admin" className="btn--base bg-dark">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-dark table-hover" style={{ backgroundColor: '#111', borderRadius: '15px', overflow: 'hidden', border: '1px solid #333' }}>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th className="p-4 border-secondary">Name</th>
                                    <th className="p-4 border-secondary">Email</th>
                                    <th className="p-4 border-secondary text-center">Role</th>
                                    <th className="p-4 border-secondary text-center">Created At</th>
                                    <th className="p-4 border-secondary text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} style={{ borderBottom: '1px solid #222' }}>
                                        <td className="p-4 align-middle">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar mr-3" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3ee80f22', border: '1px solid #3ee80f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <i className="fas fa-user text-success" style={{ color: '#3ee80f' }}></i>
                                                </div>
                                                <span className="font-weight-bold text-white">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle text-white-50">{user.email}</td>
                                        <td className="p-4 align-middle text-center">
                                            <span className={`badge py-2 px-3 ${user.role === UserRole.SUPER_ADMIN ? 'bg-danger' : user.role === UserRole.ADMIN ? 'bg-success' : 'bg-secondary'}`} style={{ minWidth: '100px', fontSize: '11px', textTransform: 'uppercase' }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-center text-white-50">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 align-middle text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button onClick={() => handleEdit(user)} className="btn btn-sm btn-outline-light">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-outline-danger">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center p-5 text-muted">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* User Form Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 999999, backdropFilter: 'blur(5px)' }}>
                    <div className="p-5 rounded position-relative" style={{ backgroundColor: '#111', border: '1px solid #333', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 0 50px rgba(0,0,0,1)' }}>
                        <button onClick={resetForm} className="position-absolute border-0 bg-transparent text-white" style={{ top: '20px', right: '20px', fontSize: '24px', cursor: 'pointer', zIndex: 10 }}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="section-header mb-4 text-center">
                            <h2 className="section-title" style={{ fontSize: '28px' }}>{isEditing ? 'Modify' : 'Create'} <span>User</span></h2>
                        </div>
                        <form className="account-widget-form" onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Full Name</label>
                                    <input type="text" name="name" className="form--control" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                                </div>
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">Email Address</label>
                                    <input type="email" name="email" className="form--control" value={formData.email} onChange={handleChange} required placeholder="email@example.com" />
                                </div>
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">
                                        Password {isEditing && <span className="text-muted font-weight-normal">(Leave blank to keep current)</span>}
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form--control" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required={!isEditing} 
                                        placeholder={isEditing ? '********' : 'Enter password'}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label className="text-white mb-2 font-weight-bold">System Role</label>
                                    <select name="role" className="form--control text-white" value={formData.role} onChange={handleChange} required style={{ display: 'block', backgroundColor: '#222', color: '#fff' }}>
                                        {Object.values(UserRole).map(role => (
                                            <option key={role} value={role} style={{ color: '#fff', background: '#222' }}>
                                                {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 mt-4 pt-3">
                                    <button type="submit" className="btn--base w-100 py-3 font-weight-bold" style={{ backgroundColor: '#3ee80f', border: 'none', color: '#000' }}>
                                        {isEditing ? 'UPDATE PERMISSIONS' : 'REGISTER USER'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .table-hover tbody tr:hover {
                    background-color: #1a1a1a !important;
                    cursor: default;
                }
                .form--control {
                    background-color: #222 !important;
                    border: 1px solid #444 !important;
                    color: #fff !important;
                }
                .btn-outline-danger:hover {
                    background-color: #dc3545;
                    border-color: #dc3545;
                }
            `}</style>
        </>
    );
}
