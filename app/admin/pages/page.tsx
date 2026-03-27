'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import MediaPicker from '../../components/admin/MediaPicker';
import IconPicker from '../../components/admin/IconPicker';

export default function PagesAdmin() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchPages = () => {
        fetch('/api/pages')
            .then(res => res.json())
            .then(data => {
                if (data.pages) setPages(data.pages);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const resetForm = () => {
        setSelectedPage({
            slug: '',
            title: '',
            subtitle: '',
            layout: 'content-image',
            content: '',
            description: '',
            highlights: [],
            cards: [],
            items: [],
            image: ''
        });
        setIsEditing(true);
    };

    const handleEdit = (page: any) => {
        setSelectedPage(JSON.parse(JSON.stringify(page)));
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving page changes...');

        const exists = pages.find(p => p.slug === selectedPage.slug);
        const method = exists ? 'PATCH' : 'POST';
        const url = exists ? `/api/pages/${selectedPage.slug}` : '/api/pages';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedPage),
            });

            if (res.ok) {
                toast.success(`Page ${exists ? 'updated' : 'created'} successfully!`, { id: loadToast });
                setIsEditing(false);
                fetchPages();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to save page.', { id: loadToast });
            }
        } catch (err) {
            toast.error('Connection error', { id: loadToast });
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this page? This cannot be undone.')) return;

        const loadToast = toast.loading('Deleting page...');
        const res = await fetch(`/api/pages/${slug}`, { method: 'DELETE' });

        if (res.ok) {
            toast.success('Page deleted!', { id: loadToast });
            fetchPages();
        } else {
            toast.error('Failed to delete page.', { id: loadToast });
        }
    };

    const handleArrayChange = (field: string, index: number, subfield: string, value: string) => {
        const newData = { ...selectedPage };
        if (subfield) {
            newData[field][index][subfield] = value;
        } else {
            newData[field][index] = value;
        }
        setSelectedPage(newData);
    };

    const addArrayItem = (field: string) => {
        const newData = { ...selectedPage };
        if (!newData[field]) newData[field] = [];

        if (field === 'highlights' || field === 'cards') {
            newData[field].push({ icon: 'fa-star', title: 'New Item', text: 'Detail here' });
        } else if (field === 'items') {
            newData[field].push({ title: 'New Entry', desc: 'Description here' });
        } else if (field === 'content') {
            if (!Array.isArray(newData[field])) {
                newData[field] = newData[field] ? [newData[field]] : [''];
            }
            newData[field].push('');
        }
        setSelectedPage(newData);
    };

    if (loading) return <div className="ptb-120 text-center"><h2 className="text-white">Loading Admin...</h2></div>;

    return (
        <>
            <InnerBanner title="CONTENT ENGINE" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Dynamic Pages" />

            <section className="admin-pages-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1400px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Website <span>Pages</span> Manager</h2>
                        </div>
                        <div className="d-flex gap-3">
                            <button onClick={resetForm} className="btn--base">
                                <i className="fas fa-plus mr-2"></i> Register New Page
                            </button>
                            <Link href="/admin" className="btn--base bg-dark">Back to Dashboard</Link>
                        </div>
                    </div>

                    {!isEditing ? (
                        <div className="row g-4">
                            {pages.map((page) => (
                                <div className="col-xl-4 col-lg-6" key={page.slug}>
                                    <div className="card h-100 p-4 shadow-lg border-0" style={{ backgroundColor: '#111', borderRadius: '15px', borderLeft: '5px solid #3ee80f' }}>
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h4 className="text-white mb-0">{page.title}</h4>
                                            <span className="badge bg-secondary" style={{ fontSize: '10px' }}>{page.layout}</span>
                                        </div>
                                        <p className="text-white-50 small mb-2">Slug: <code style={{ color: '#3ee80f' }}>{page.slug}</code></p>
                                        <p className="text-white-50 small mb-4 line-clamp-2" style={{ height: '40px', overflow: 'hidden' }}>{page.subtitle}</p>

                                        <div className="d-flex gap-3 mt-auto pt-3 border-top border-secondary">
                                            <button onClick={() => handleEdit(page)} className="btn btn-sm btn-outline-light w-100">
                                                <i className="fas fa-edit mr-2"></i> Edit
                                            </button>
                                            <button onClick={() => handleDelete(page.slug)} className="btn btn-sm btn-outline-success w-100" style={{ borderColor: '#3ee80f', color: '#3ee80f' }}>
                                                <i className="fas fa-trash mr-2"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="edit-form-area p-5 rounded" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                            <div className="d-flex justify-content-between mb-5">
                                <h3 className="text-white">Management: <span style={{ color: '#3ee80f' }}>{selectedPage.title || 'New Dynamic Page'}</span></h3>
                                <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-light">Close Editor</button>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="row g-4">
                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2">Unique URL Slug (ex: history-of-wushu)</label>
                                        <input type="text" className="form--control" placeholder="Required for linking" value={selectedPage.slug} onChange={(e) => setSelectedPage({ ...selectedPage, slug: e.target.value })} required />
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2">Main Display Title</label>
                                        <input type="text" className="form--control" placeholder="Ex: Our History" value={selectedPage.title} onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })} required />
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2">Subtitle / Tagline</label>
                                        <input type="text" className="form--control" placeholder="Ex: Since 1986" value={selectedPage.subtitle || ''} onChange={(e) => setSelectedPage({ ...selectedPage, subtitle: e.target.value })} />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="text-white-50 mb-2">Visual Layout Pattern</label>
                                        <select className="form--control text-white" style={{ background: '#222' }} value={selectedPage.layout} onChange={(e) => setSelectedPage({ ...selectedPage, layout: e.target.value })}>
                                            <option value="content-image">Content with Large Image</option>
                                            <option value="cards-overlay">Dark Theme Cards Overlay</option>
                                            <option value="team-grid">Organogram / Member Grid</option>
                                            <option value="list-cards">Two-Column Description List</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <MediaPicker
                                            label="Feature Image (Landscape/Banner)"
                                            value={selectedPage.image || ''}
                                            onChange={(url) => setSelectedPage({ ...selectedPage, image: url })}
                                            type="image"
                                        />
                                    </div>

                                    <div className="col-12 mt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <label className="text-white-50 mb-0">Main Content Block(s)</label>
                                            <button type="button" onClick={() => addArrayItem('content')} className="btn btn-xs btn-outline-success font-weight-bold" style={{ borderColor: '#3ee80f', color: '#3ee80f' }}>Add Paragraph +</button>
                                        </div>
                                        {Array.isArray(selectedPage.content) ? (
                                            selectedPage.content.map((p: string, i: number) => (
                                                <div className="position-relative mb-3" key={i}>
                                                    <textarea className="form--control" style={{ height: '100px' }} value={p} onChange={(e) => handleArrayChange('content', i, '', e.target.value)} />
                                                    <button type="button" onClick={() => {
                                                        const nc = [...selectedPage.content]; nc.splice(i, 1); setSelectedPage({ ...selectedPage, content: nc });
                                                    }} className="btn btn-sm btn-danger position-absolute" style={{ top: '10px', right: '10px' }}>Remove</button>
                                                </div>
                                            ))
                                        ) : (
                                            <textarea className="form--control" style={{ height: '150px' }} value={selectedPage.content || ''} onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })} />
                                        )}
                                    </div>

                                    <div className="col-12 mt-5 border-top pt-5 border-secondary">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h5 className="text-white">Structured Elements (Cards, Highlights, Lists)</h5>
                                            <div className="d-flex gap-2">
                                                <button type="button" onClick={() => addArrayItem('highlights')} className="btn btn-sm btn-outline-light">Add Highlight +</button>
                                                {/* <button type="button" onClick={() => addArrayItem('items')} className="btn btn-sm btn-outline-light">Add List Item +</button> */}
                                            </div>
                                        </div>

                                        <div className="row g-4">
                                            {selectedPage.highlights?.map((h: any, i: number) => (
                                                <div className="col-xl-4 col-md-6" key={i}>
                                                    <div className="p-4 rounded border border-secondary bg-dark position-relative">
                                                        <button type="button" onClick={() => {
                                                            const nh = [...selectedPage.highlights]; nh.splice(i, 1); setSelectedPage({ ...selectedPage, highlights: nh });
                                                        }} className="btn btn-xs btn-danger position-absolute" style={{ top: '5px', right: '5px' }}>&times;</button>

                                                        <label className="small text-muted mb-2 d-block">Icon Selection</label>
                                                        <IconPicker value={h.icon} onChange={(icon) => handleArrayChange('highlights', i, 'icon', icon)} />

                                                        <label className="small text-muted mt-3 mb-1 d-block">Point Title</label>
                                                        <input type="text" className="form--control mb-2" value={h.title} onChange={(handleEvent) => handleArrayChange('highlights', i, 'title', handleEvent.target.value)} />
                                                        <label className="small text-muted mb-1 d-block">Short Description</label>
                                                        <input type="text" className="form--control" value={h.text} onChange={(handleEvent) => handleArrayChange('highlights', i, 'text', handleEvent.target.value)} />
                                                    </div>
                                                </div>
                                            ))}

                                            {selectedPage.items?.map((item: any, i: number) => (
                                                <div className="col-12" key={i}>
                                                    <div className="p-4 rounded border border-secondary" style={{ backgroundColor: '#111' }}>
                                                        <div className="row g-3">
                                                            <div className="col-md-5">
                                                                <label className="small text-muted mb-1">Label / Org Name</label>
                                                                <input type="text" className="form--control" value={item.title} onChange={(e) => handleArrayChange('items', i, 'title', e.target.value)} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small text-muted mb-1">Role / Summary</label>
                                                                <textarea className="form--control" value={item.desc} onChange={(e) => handleArrayChange('items', i, 'desc', e.target.value)} />
                                                            </div>
                                                            <div className="col-md-1 d-flex align-items-end">
                                                                <button type="button" onClick={() => {
                                                                    const ni = [...selectedPage.items]; ni.splice(i, 1); setSelectedPage({ ...selectedPage, items: ni });
                                                                }} className="btn btn-danger w-100"><i className="fas fa-trash"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-12 mt-5 text-center">
                                        <button type="submit" className="btn--base px-5 py-3 font-weight-bold" style={{ fontSize: '18px' }}>
                                            <i className="fas fa-save mr-2"></i> COMMIT CHANGES TO DATABASE
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
