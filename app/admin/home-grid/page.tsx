'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import Image from 'next/image';

export default function HomeGridAdmin() {
    const [gridData, setGridData] = useState<any>({
        president: { title: 'Message from the President', content: '', image: '' },
        history: { title: 'History of Wushu', content: '' },
        about: { title: 'About BWUF', content: '' },
        secretary: { title: 'Message from the General Secretary', content: '', image: '' }
    });
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch('/api/home-grid')
            .then(res => res.json())
            .then(data => {
                if (data.grid) {
                    setGridData(data.grid);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (section: string, field: string, value: string) => {
        setGridData({
            ...gridData,
            [section]: {
                ...gridData[section],
                [field]: value
            }
        });
    };

    const handleImageUpload = async (section: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const loadToast = toast.loading(`Uploading image for ${section}...`);
        const fd = new FormData();
        fd.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (res.ok) {
                handleChange(section, 'image', data.url);
                toast.success('Image uploaded!', { id: loadToast });
            } else {
                toast.error(data.error || 'Upload failed', { id: loadToast });
            }
        } catch (error) {
            toast.error('Upload failed', { id: loadToast });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving Home Grid content...');

        try {
            const res = await fetch('/api/home-grid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gridData),
            });
            if (res.ok) {
                toast.success('Updated successfully!', { id: loadToast });
            } else {
                toast.error('Error saving content.', { id: loadToast });
            }
        } catch (err) {
            toast.error('Error saving content.', { id: loadToast });
        }
    };

    if (loading) {
        return (
            <div className="ptb-120 text-center"><h2 className="text-white">Loading Admin...</h2></div>
        );
    }

    return (
        <>
            <InnerBanner title="HOME GRID" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Home Sections" />

            <section className="account-widget-section account-widget-section-two account-widget-section--style ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Home Sections</span></h2>
                            <p className="mt-2 text-white-50">Update content for President, Secretary, History and About.</p>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    <form className="account-widget-form" onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Message from President */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">Message from President</h4>
                                    <div className="form-group mb-4 text-center">
                                       <div className="mb-3" style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto', backgroundColor: '#222', borderRadius: '10px', overflow: 'hidden', border: '2px dashed #444' }}>
                                           {gridData.president.image ? (
                                             <Image src={gridData.president.image} alt="President" fill style={{ objectFit: 'cover' }} />
                                           ) : <span style={{ color: '#666', lineHeight: '200px' }}>No Image</span>}
                                       </div>
                                       <input type="file" onChange={(e) => handleImageUpload('president', e)} className="d-none" id="pres-img" />
                                       <label htmlFor="pres-img" className="btn--base" style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '14px' }}>Change President Image</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Title</label>
                                        <input type="text" className="form--control" value={gridData.president.title} onChange={(e) => handleChange('president', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Message Content</label>
                                        <textarea className="form--control" style={{ height: '200px' }} value={gridData.president.content} onChange={(e) => handleChange('president', 'content', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Message from General Secretary */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">General Secretary Message</h4>
                                    <div className="form-group mb-4 text-center">
                                       <div className="mb-3" style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto', backgroundColor: '#222', borderRadius: '10px', overflow: 'hidden', border: '2px dashed #444' }}>
                                           {gridData.secretary.image ? (
                                             <Image src={gridData.secretary.image} alt="Secretary" fill style={{ objectFit: 'cover' }} />
                                           ) : <span style={{ color: '#666', lineHeight: '200px' }}>No Image</span>}
                                       </div>
                                       <input type="file" onChange={(e) => handleImageUpload('secretary', e)} className="d-none" id="sec-img" />
                                       <label htmlFor="sec-img" className="btn--base" style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '14px' }}>Change Secretary Image</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Title</label>
                                        <input type="text" className="form--control" value={gridData.secretary.title} onChange={(e) => handleChange('secretary', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Message Content</label>
                                        <textarea className="form--control" style={{ height: '200px' }} value={gridData.secretary.content} onChange={(e) => handleChange('secretary', 'content', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* History of Wushu */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">History of Wushu</h4>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Title</label>
                                        <input type="text" className="form--control" value={gridData.history.title} onChange={(e) => handleChange('history', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Content Body</label>
                                        <textarea className="form--control" style={{ height: '300px' }} value={gridData.history.content} onChange={(e) => handleChange('history', 'content', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* About BWUF */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">About BWUF Section</h4>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Title</label>
                                        <input type="text" className="form--control" value={gridData.about.title} onChange={(e) => handleChange('about', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Content Body</label>
                                        <textarea className="form--control" style={{ height: '300px' }} value={gridData.about.content} onChange={(e) => handleChange('about', 'content', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-5">
                            <button type="submit" className="btn--base w-100 p-3" style={{ fontSize: '1.2rem' }}>Save All Changes <i className="fas fa-save ml-2"></i></button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
