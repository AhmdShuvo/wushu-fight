'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import MediaPicker from '../../components/admin/MediaPicker';

export default function HomeGridAdmin() {
    const [gridData, setGridData] = useState<any>({
        president: { title: 'Message from the President', content: '', image: '' },
        history: { title: 'History of Wushu', content: '', image: '', subtitle: 'ESTABLISHED 1986' },
        about: { title: 'About BWUF', content: '', image: '', subtitle: 'OUR STORY' },
        secretary: { title: 'Message from the General Secretary', content: '', image: '' }
    });
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch('/api/home-grid', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.grid) {
                    setGridData((prev: any) => ({
                        ...prev,
                        ...data.grid,
                        history: { ...prev.history, ...data.grid.history },
                        about: { ...prev.about, ...data.grid.about },
                        president: { ...prev.president, ...data.grid.president },
                        secretary: { ...prev.secretary, ...data.grid.secretary }
                    }));
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

            <section className="account-widget-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Home Sections</span></h2>
                            <p className="mt-2 text-white-50">Current Layout: Split 4/8 frame with dynamic high-impact cards.</p>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    <form className="account-widget-form" onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Message from President */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">Presidential Message</h4>
                                    <div className="mb-4">
                                        <MediaPicker 
                                          label="President Photo (Circular)" 
                                          value={gridData.president.image} 
                                          onChange={(url) => handleChange('president', 'image', url)} 
                                          type="image" 
                                        />
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
                                    <div className="mb-4">
                                        <MediaPicker 
                                          label="Secretary Photo (Circular)" 
                                          value={gridData.secretary.image} 
                                          onChange={(url) => handleChange('secretary', 'image', url)} 
                                          type="image" 
                                        />
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
                                    <h4 className="text-white mb-4 border-bottom pb-2">Federation History (Wide Layout)</h4>
                                    <div className="mb-4">
                                        <MediaPicker 
                                          label="History Feature Image" 
                                          value={gridData.history.image} 
                                          onChange={(url) => handleChange('history', 'image', url)} 
                                          type="image" 
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Top Badge / Subtitle (e.g. ESTABLISHED 1986)</label>
                                        <input type="text" className="form--control" value={gridData.history.subtitle || ''} onChange={(e) => handleChange('history', 'subtitle', e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Title</label>
                                        <input type="text" className="form--control" value={gridData.history.title || ''} onChange={(e) => handleChange('history', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Content Body</label>
                                        <textarea className="form--control" style={{ height: '300px' }} value={gridData.history.content || ''} onChange={(e) => handleChange('history', 'content', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
 
                            {/* About BWUF */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">About BWUF Grid Card</h4>
                                    <div className="mb-4">
                                        <MediaPicker 
                                          label="About Card Image (Optional)" 
                                          value={gridData.about.image || ''} 
                                          onChange={(url) => handleChange('about', 'image', url)} 
                                          type="image" 
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Top Badge / Subtitle (e.g. OUR STORY)</label>
                                        <input type="text" className="form--control" value={gridData.about.subtitle || ''} onChange={(e) => handleChange('about', 'subtitle', e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Title</label>
                                        <input type="text" className="form--control" value={gridData.about.title || ''} onChange={(e) => handleChange('about', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Content Body</label>
                                        <textarea className="form--control" style={{ height: '300px' }} value={gridData.about.content || ''} onChange={(e) => handleChange('about', 'content', e.target.value)}></textarea>
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
