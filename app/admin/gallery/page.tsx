'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';

export default function GalleryAdmin() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const categories = ['All', 'Action', 'Ceremony', 'Training', 'Competition', 'Others'];
    const [selectedCategory, setSelectedCategory] = useState('Others');

    const fetchGallery = (p = page) => {
        setLoading(true);
        fetch(`/api/gallery?page=${p}&limit=12`)
            .then(res => res.json())
            .then(data => {
                if (data.items) {
                    setImages(data.items);
                    setTotalPages(data.totalPages);
                    setPage(data.currentPage);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const loadToast = toast.loading(`Uploading ${files.length} images...`);

        try {
            const uploadedItems = [];
            for (let i = 0; i < files.length; i++) {
                const fd = new FormData();
                fd.append('file', files[i]);
                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                const data = await res.json();
                if (res.ok) {
                    uploadedItems.push({
                        imageUrl: data.url,
                        title: files[i].name.split('.')[0],
                        category: selectedCategory,
                        order: 0
                    });
                }
            }

            // Save to DB
            const dbRes = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(uploadedItems)
            });

            if (dbRes.ok) {
                toast.success('Gallery updated successfully!', { id: loadToast });
                fetchGallery(1);
            } else {
                toast.error('Failed to save to database', { id: loadToast });
            }
        } catch (error) {
            toast.error('Upload process failed', { id: loadToast });
        } finally {
            setUploading(false);
        }
    };

    const deleteImage = async (id: string) => {
        if (!window.confirm("Delete this image?")) return;
        const loadToast = toast.loading('Deleting...');
        try {
            const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Deleted!', { id: loadToast });
                fetchGallery();
            } else {
                toast.error('Delete failed', { id: loadToast });
            }
        } catch (error) {
            toast.error('Delete failed', { id: loadToast });
        }
    };

    return (
        <>
            <InnerBanner title="GALLERY" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Gallery" />

            <section className="admin-gallery-section ptb-120" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Photo <span>Storage</span></h2>
                            <p className="mt-2 text-white-50">Bulk upload and manage your gallery assets.</p>
                        </div>
                        <div className="d-flex gap-3">
                            <Link href="/admin" className="btn--base px-4 py-2" style={{ background: '#333' }}>Dashboard</Link>
                            <label className={`btn--base px-4 py-2 ${uploading ? 'opacity-50' : ''}`} style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}>
                                {uploading ? 'Processing...' : 'Bulk Upload +'}
                                <input type="file" multiple className="d-none" onChange={handleBulkUpload} disabled={uploading} accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div className="category-select mb-4 p-4 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #333' }}>
                        <h5 className="text-white mb-3">Set Category for Next Uploads:</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {categories.filter(c => c !== 'All').map(cat => (
                                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded transition ${selectedCategory === cat ? 'bg-danger text-white' : 'bg-dark text-white-50'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-5"><h3 className="text-white">Scanning Library...</h3></div>
                    ) : (
                        <div className="row">
                            {images.map((img) => (
                                <div key={img._id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                                    <div className="gallery-card rounded overflow-hidden position-relative group" style={{ background: '#111', border: '1px solid #333' }}>
                                        <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                                            <img src={img.imageUrl} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="p-3 d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-white m-0 small font-weight-bold">{img.title}</p>
                                                <span className="badge badge-danger" style={{ fontSize: '10px' }}>{img.category}</span>
                                            </div>
                                            <button onClick={() => deleteImage(img._id)} className="btn btn-sm btn-outline-danger p-1">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-5 gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button key={i} onClick={() => fetchGallery(i + 1)} className={`px-3 py-2 rounded ${page === i + 1 ? 'bg-danger text-white' : 'bg-dark text-white'}`}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
