'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function NewsAdmin() {
    const { data: session } = useSession();
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingNews, setEditingNews] = useState<any>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        fetch('/api/news')
            .then(res => res.json())
            .then(data => {
                setNews(data.news || []);
                setLoading(false);
            });
    };

    const handleEdit = (item: any) => {
        setEditingNews(item);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchNews();
            toast.success('Deleted successfully');
        } else {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingNews),
        });
        if (res.ok) {
            setEditingNews(null);
            fetchNews();
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving news', { id: loadToast });
        }
    };

    if (loading) return <div className="p-5 text-dark">Loading...</div>;

    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Manage Latest News</h1>
                <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
            </div>

            {editingNews ? (
                <div className="p-4 border rounded mb-5 bg-white shadow-sm">
                    <h2 className="mb-4">{editingNews._id ? 'Edit News' : 'Add New News'}</h2>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-dark">Title</label>
                            <input type="text" className="form-control" value={editingNews.title} onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-dark">Slug (auto-generated)</label>
                            <input type="text" className="form-control" value={editingNews.slug} onChange={(e) => setEditingNews({ ...editingNews, slug: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-dark">Date (e.g. Feb 10, 2024)</label>
                            <input type="text" className="form-control" value={editingNews.date} onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-dark">Author</label>
                            <input type="text" className="form-control" value={editingNews.author} onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-dark">Category</label>
                            <input type="text" className="form-control" value={editingNews.category} onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-dark">Image Filename (e.g. blog-1.png)</label>
                            <input type="text" className="form-control" value={editingNews.img} onChange={(e) => setEditingNews({ ...editingNews, img: e.target.value })} required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label text-dark">Order</label>
                            <input type="number" className="form-control" value={editingNews.order || 0} onChange={(e) => setEditingNews({ ...editingNews, order: parseInt(e.target.value) })} />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-dark">Full Content</label>
                            <textarea className="form-control" rows={10} value={editingNews.content || ''} onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })} required></textarea>
                        </div>
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingNews(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <button className="btn btn-danger mb-4" onClick={() => setEditingNews({ title: '', slug: '', date: '', author: '', category: '', img: 'blog-1.png', content: '', order: 0 })}>
                    Add New News Item
                </button>
            )}

            <div className="row g-4">
                {news.map((item) => (
                    <div key={item._id} className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <img src={`/assets/images/blog/${item.img}`} alt="news" className="card-img-top" />
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title h5">{item.title}</h3>
                                <p className="text-muted mb-1 small">By {item.author} | {item.date}</p>
                                <p className="text-danger mb-3 small">{item.category}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
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
                                const res = await fetch('/api/seed/news');
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
