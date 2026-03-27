'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';

export default function TrainingAdmin() {
    const [styles, setStyles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingStyle, setEditingStyle] = useState<any>(null);

    useEffect(() => {
        fetchStyles();
    }, []);

    const fetchStyles = () => {
        fetch('/api/training')
            .then(res => res.json())
            .then(data => {
                setStyles(data.styles || []);
                setLoading(false);
            });
    };

    const handleEdit = (style: any) => {
        setEditingStyle({ ...style });
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(`/api/training?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchStyles();
            toast.success('Deleted successfully');
        } else {
            toast.error('Failed to delete');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'icon' | 'bgImage') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const loadToast = toast.loading('Uploading image...');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                setEditingStyle((prev: any) => ({ ...prev, [field]: data.url }));
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
        const loadToast = toast.loading('Saving...');
        const res = await fetch('/api/training', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingStyle),
        });
        if (res.ok) {
            setEditingStyle(null);
            fetchStyles();
            toast.success('Saved successfully!', { id: loadToast });
        } else {
            toast.error('Error saving training style', { id: loadToast });
        }
    };

    if (loading) {
        return (
            <>
                <InnerBanner title="TRAINING" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Loading..." />
                <div className="ptb-120 text-center"><h2 className="text-white">Loading...</h2></div>
            </>
        )
    }

    return (
        <>
            <InnerBanner title="TRAINING" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Training Styles" />

            <section className="account-widget-section account-widget-section-two account-widget-section--style ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Training</span> Styles</h2>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    {editingStyle ? (
                        <div className="row mb-80">
                            <div className="col-xl-8 col-lg-7">
                                <div className="account-widget-form-area p-5 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <div className="section-header">
                                        <h2 className="section-title">{editingStyle._id ? 'Edit' : 'Add New'} <span>Style</span></h2>
                                        <p className="mt-2 text-white-50">Upload images below. The changes will reflect in the live preview on the right instantly.</p>
                                    </div>
                                    <form className="account-widget-form mt-4" onSubmit={handleSubmit}>
                                        <div className="row justify-content-center mb-25-none">
                                            <div className="col-xl-6 col-lg-6 form-group">
                                                <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Style Title</label>
                                                <input type="text" className="form--control" value={editingStyle.title} onChange={(e) => setEditingStyle({ ...editingStyle, title: e.target.value })} required />
                                            </div>
                                            <div className="col-xl-6 col-lg-6 form-group">
                                                <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Display Order</label>
                                                <input type="number" className="form--control" value={editingStyle.order} onChange={(e) => setEditingStyle({ ...editingStyle, order: parseInt(e.target.value) || 0 })} />
                                            </div>

                                            <div className="col-xl-6 col-lg-6 form-group">
                                                <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Icon Image</label>
                                                <div className="d-flex flex-column" style={{ gap: '10px' }}>
                                                    <input type="text" className="form--control" value={editingStyle.icon} onChange={(e) => setEditingStyle({ ...editingStyle, icon: e.target.value })} placeholder="Image URL..." required />
                                                    <div className="position-relative">
                                                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'icon')} className="position-absolute w-100 h-100" style={{ opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                                                        <button type="button" className="btn--base w-100 text-center" style={{ padding: '10px', backgroundColor: '#333' }}>Upload Icon <i className="fas fa-upload ml-2"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 form-group">
                                                <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Background Image</label>
                                                <div className="d-flex flex-column" style={{ gap: '10px' }}>
                                                    <input type="text" className="form--control" value={editingStyle.bgImage} onChange={(e) => setEditingStyle({ ...editingStyle, bgImage: e.target.value })} placeholder="Image URL..." required />
                                                    <div className="position-relative">
                                                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'bgImage')} className="position-absolute w-100 h-100" style={{ opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                                                        <button type="button" className="btn--base w-100 text-center" style={{ padding: '10px', backgroundColor: '#333' }}>Upload Background <i className="fas fa-upload ml-2"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-12 form-group">
                                                <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Description</label>
                                                <textarea className="form--control" rows={3} value={editingStyle.description} onChange={(e) => setEditingStyle({ ...editingStyle, description: e.target.value })} required></textarea>
                                            </div>
                                            <div className="col-xl-12 form-group d-flex" style={{ gap: '15px' }}>
                                                <button type="submit" className="btn--base">Save Changes <i className="fas fa-save ml-2"></i></button>
                                                <button type="button" className="btn--base" style={{ backgroundColor: '#222', color: '#fff' }} onClick={() => setEditingStyle(null)}>Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Live Preview Card */}
                            <div className="col-xl-4 col-lg-5 d-flex align-items-center pb-5 pt-3">
                                <div className="w-100">
                                    <h4 className="text-white mb-4 text-center">Live Preview (Hover over card)</h4>
                                    <div className="training-item text-center m-0 w-100 position-relative" style={{ height: '400px', backgroundColor: 'transparent' }}>
                                        {(editingStyle.bgImage || '/assets/images/training/training-1.png') && (
                                            <>
                                                <Image
                                                    src={editingStyle.bgImage || '/assets/images/training/training-1.png'}
                                                    alt="bg-always"
                                                    fill
                                                    style={{ objectFit: 'cover', zIndex: 0 }}
                                                />
                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.85)', zIndex: 0 }}></div>
                                            </>
                                        )}
                                        <div className="training-icon position-relative" style={{ width: '80px', height: '80px', margin: '0 auto', zIndex: 1 }}>
                                            {(editingStyle.icon || '/assets/images/icon/icon-3.png') && (
                                                <Image
                                                    src={editingStyle.icon || '/assets/images/icon/icon-3.png'}
                                                    alt="icon"
                                                    width={80}
                                                    height={80}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            )}
                                        </div>
                                        <div className="training-content pb-5 position-relative" style={{ zIndex: 1 }}>
                                            <h3 className="title"><a href="#0" onClick={(e) => e.preventDefault()}>{editingStyle.title || 'STYLE TITLE'}</a></h3>
                                            <p>{editingStyle.description || 'Description will appear here...'}</p>
                                        </div>

                                        <div className="training-overlay bg-overlay-base" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 2 }}>
                                            {(editingStyle.bgImage || '/assets/images/training/training-1.png') && (
                                                <Image
                                                    src={editingStyle.bgImage || '/assets/images/training/training-1.png'}
                                                    alt="bg-hover"
                                                    fill
                                                    style={{ objectFit: 'cover', zIndex: -1 }}
                                                />
                                            )}
                                            <div className="training-overlay-content p-4" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <h3 className="title"><a href="#0" onClick={(e) => e.preventDefault()}>{editingStyle.title || 'STYLE'} TRAINING</a></h3>
                                                <div className="mt-4 d-flex justify-content-center flex-wrap" style={{ gap: '10px' }}>
                                                    <span className="btn--base active" style={{ padding: '8px 20px' }}>Preview <i className="fas fa-eye ml-1"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-60 text-center">
                            <button className="btn--base" onClick={() => {
                                setEditingStyle({ title: '', description: '', icon: '/assets/images/icon/icon-3.png', bgImage: '/assets/images/training/training-1.png', order: 0 });
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                            }}>
                                Add New Style <i className="fas fa-plus ml-2"></i>
                            </button>
                        </div>
                    )}

                    <div className="row justify-content-center mb-30-none">
                        {styles.map((style) => (
                            <div key={style._id} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30" data-aos="fade-up" data-aos-duration="1200">
                                <div className="training-item text-center m-0 h-100 position-relative" style={{ backgroundColor: 'transparent' }}>
                                    {style.bgImage && (
                                        <>
                                            <Image src={style.bgImage} alt="bg-always" fill style={{ objectFit: 'cover', zIndex: 0 }} />
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.85)', zIndex: 0 }}></div>
                                        </>
                                    )}
                                    <div className="training-icon position-relative" style={{ width: '80px', height: '80px', margin: '0 auto', zIndex: 1 }}>
                                        {style.icon && (
                                            <Image src={style.icon} alt="icon" width={80} height={80} style={{ objectFit: 'contain' }} />
                                        )}
                                    </div>
                                    <div className="training-content pb-5 position-relative" style={{ zIndex: 1 }}>
                                        <h3 className="title"><a href="#0" onClick={(e) => e.preventDefault()}>{style.title}</a></h3>
                                        <p>{style.description}</p>
                                    </div>

                                    <div className="training-overlay bg-overlay-base" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 2 }}>
                                        {style.bgImage && (
                                            <Image src={style.bgImage} alt="bg-hover" fill style={{ objectFit: 'cover', zIndex: -1 }} />
                                        )}
                                        <div className="training-overlay-content p-4" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h3 className="title"><a href="#0" onClick={(e) => e.preventDefault()}>{style.title} TRAINING</a></h3>
                                            <div className="mt-4 d-flex justify-content-center flex-wrap" style={{ gap: '10px' }}>
                                                <button className="btn--base active" onClick={(e) => { e.preventDefault(); handleEdit(style); }} style={{ padding: '8px 20px' }}>
                                                    Edit <i className="fas fa-edit ml-1"></i>
                                                </button>
                                                <button className="btn--base" onClick={(e) => { e.preventDefault(); handleDelete(style._id); }} style={{ padding: '8px 20px', backgroundColor: '#3ee80f', color: 'black' }}>
                                                    Delete <i className="fas fa-trash ml-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {styles.length === 0 && !loading && (
                            <div className="col-12 text-center text-white p-5">
                                <h3>No training styles found. Create one above.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
