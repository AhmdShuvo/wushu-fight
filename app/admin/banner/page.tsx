'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';

export default function BannerAdmin() {
    const [banners, setBanners] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        _id: '',
        subTitle: '',
        title: '',
        innerTitle: '',
        description: '',
        backgroundImage: '/assets/images/bg/bg-22.png',
        buttonText: 'Apply Now',
        buttonLink: '#',
        order: 1
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [tickerData, setTickerData] = useState({
        updatesText: 'Important Notices from BWUF, SAWUF, WFA & IWUF!',
        resourcesText: 'Explore our Resources section for the latest Training Documents and Videos'
    });


    const fetchBanners = () => {
        fetch('/api/banner')
            .then(res => res.json())
            .then(data => {
                if (data.banners) {
                    setBanners(data.banners);
                    if (data.banners.length > 0 && !isEditing) {
                        setFormData({ ...data.banners[0] });
                        setIsEditing(true);
                    }
                }
                setLoading(false);
            });
    };

    const fetchTicker = () => {
        fetch('/api/ticker')
            .then(res => res.json())
            .then(data => {
                if (data.ticker) {
                    setTickerData({
                        updatesText: data.ticker.updatesText,
                        resourcesText: data.ticker.resourcesText
                    });
                }
            });
    };

    useEffect(() => {
        fetchBanners();
        fetchTicker();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const loadToast = toast.loading('Uploading background image...');
        const fd = new FormData();
        fd.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (res.ok) {
                setFormData({ ...formData, backgroundImage: data.url });
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
        const loadToast = toast.loading('Saving Banner...');

        let url = '/api/banner';
        let method = 'POST';

        if (formData._id) {
            url = `/api/banner/${formData._id}`;
            method = 'PUT';
        }

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            toast.success('Saved successfully!', { id: loadToast });
            fetchBanners();
        } else {
            toast.error('Error saving banner content.', { id: loadToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;

        const loadToast = toast.loading('Deleting...');
        const res = await fetch(`/api/banner/${id}`, { method: 'DELETE' });

        if (res.ok) {
            toast.success('Deleted successfully!', { id: loadToast });
            if (formData._id === id) {
                resetForm();
            }
            fetchBanners();
        } else {
            toast.error('Error deleting banner.', { id: loadToast });
        }
    };

    const handleEdit = (banner: any) => {
        setFormData(banner);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            subTitle: '',
            title: '',
            innerTitle: '',
            description: '',
            backgroundImage: '/assets/images/bg/bg-22.png',
            buttonText: 'Apply Now',
            buttonLink: '#',
            order: banners.length + 1
        });
        setIsEditing(false);
    };

    if (loading) {
        return (
            <>
                <InnerBanner title="BANNER" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Loading..." />
                <div className="ptb-120 text-center"><h2 className="text-white">Loading...</h2></div>
            </>
        )
    }

    return (
        <>
            <InnerBanner title="BANNER" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Banner Content" />

            <section className="account-widget-section account-widget-section-two account-widget-section--style ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1400px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Manage <span>Banner</span> Section</h2>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    <div className="row mb-80">
                        <div className="col-xl-6 col-lg-7">
                            <div className="account-widget-form-area p-5 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                <div className="section-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <h2 className="section-title">{isEditing ? 'Edit' : 'Add New'} <span>Banner Slide</span></h2>
                                        <p className="mt-2 text-white-50">Upload background images and change texts.</p>
                                    </div>
                                    {isEditing && (
                                        <button onClick={resetForm} className="btn--base" style={{ padding: '8px 20px', backgroundColor: '#333' }}>
                                            Add New Instead <i className="fas fa-plus ml-1"></i>
                                        </button>
                                    )}
                                </div>
                                <form className="account-widget-form mt-4" onSubmit={handleSubmit}>
                                    <div className="row justify-content-center mb-25-none">
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Sub Title</label>
                                            <input type="text" name="subTitle" className="form--control" value={formData.subTitle} onChange={handleChange} required />
                                        </div>
                                        <div className="col-xl-6 col-lg-6 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Main Title</label>
                                            <input type="text" name="title" className="form--control" value={formData.title} onChange={handleChange} required />
                                        </div>
                                        <div className="col-xl-12 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Inner Title (Sub Headline)</label>
                                            <input type="text" name="innerTitle" className="form--control" value={formData.innerTitle} onChange={handleChange} required />
                                        </div>

                                        <div className="col-xl-12 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Background Image</label>
                                            <div className="d-flex flex-column" style={{ gap: '10px' }}>
                                                <input type="text" className="form--control" value={formData.backgroundImage} readOnly placeholder="Image URL..." />
                                                <div className="position-relative">
                                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="position-absolute w-100 h-100" style={{ opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                                                    <button type="button" className="btn--base w-100 text-center" style={{ padding: '10px', backgroundColor: '#333' }}>Upload Background <i className="fas fa-upload ml-2"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Description Tagline</label>
                                            <input type="text" name="description" className="form--control" value={formData.description} onChange={handleChange} />
                                        </div>

                                        <div className="col-xl-4 col-lg-4 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Slide Order</label>
                                            <input type="number" name="order" className="form--control" value={formData.order} onChange={handleChange} />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Button Text</label>
                                            <input type="text" name="buttonText" className="form--control" value={formData.buttonText} onChange={handleChange} />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 form-group">
                                            <label className="text-white mb-2 font-weight-bold" style={{ display: 'block', textAlign: 'left' }}>Button Link</label>
                                            <input type="text" name="buttonLink" className="form--control" value={formData.buttonLink} onChange={handleChange} />
                                        </div>

                                        <div className="col-xl-12 form-group d-flex" style={{ gap: '15px' }}>
                                            <button type="submit" className="btn--base w-100">{isEditing ? 'Update Banner' : 'Add Banner'} <i className="fas fa-save ml-2"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Live Preview Console */}
                        <div className="col-xl-6 col-lg-5 p-0" style={{ position: 'relative' }}>
                            <div className="banner-section banner-section-two" style={{ height: '600px', borderRadius: '10px', overflow: 'hidden', padding: 0, position: 'relative' }}>
                                <div className="banner-bg bg-overlay-black bg_img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                                    {formData.backgroundImage && (
                                        <Image src={formData.backgroundImage} alt="banner-bg" fill style={{ objectFit: 'cover' }} priority />
                                    )}
                                </div>
                                <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
                                    <div className="row w-100 justify-content-center align-items-center">
                                        <div className="col-xl-12 col-lg-12 text-center" style={{ scale: '0.9' }}>
                                            <div className="banner-content">
                                                <span className="sub-title" style={{ fontSize: '14px' }}>{formData.subTitle || 'SUB TITLE'}</span>
                                                <h1 className="title" style={{ fontSize: '42px', lineHeight: '1.2' }}>{formData.title || 'MAIN TITLE'}</h1>
                                                <h3 className="inner-title" style={{ fontSize: '20px' }}>{formData.innerTitle || 'INNER TITLE'}</h3>
                                                <p style={{ fontSize: '14px', maxWidth: '80%', margin: '0 auto 20px' }}>{formData.description || 'Description goes here'}</p>
                                                <div className="banner-btn">
                                                    <a href="#0" onClick={(e) => e.preventDefault()} className="btn--base" style={{ padding: '10px 20px', fontSize: '14px' }}>{formData.buttonText || 'Button'} <i className="fas fa-arrow-right ml-2"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white mt-4 text-center">Live Preview Mode</h4>
                        </div>
                    </div>

                    {/* All Banners Grid */}
                    <div className="row pb-120">
                        <div className="col-12">
                            <div className="section-header text-center mb-60">
                                <h2 className="section-title">All <span>Sliders</span></h2>
                                <p className="mt-2 text-white-50">Manage the slides that appear in your homepage carousel.</p>
                            </div>
                        </div>
                        {banners.map((banner, index) => (
                            <div key={banner._id || index} className="col-xl-4 col-lg-6 col-md-6 mb-30" data-aos="fade-up" data-aos-duration="1200">
                                <div className="banner-section banner-section-two position-relative" style={{ height: '350px', borderRadius: '10px', overflow: 'hidden', padding: 0 }}>

                                    <div className="banner-bg bg-overlay-black bg_img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                                        {banner.backgroundImage && (
                                            <Image src={banner.backgroundImage} alt="banner-bg" fill style={{ objectFit: 'cover' }} priority />
                                        )}
                                    </div>

                                    <div className="container-fluid h-100 d-flex align-items-center justify-content-center position-relative" style={{ zIndex: 1, pointerEvents: 'none' }}>
                                        <div className="row w-100 justify-content-center align-items-center">
                                            <div className="col-12 text-center" style={{ scale: '0.6' }}>
                                                <div className="banner-content m-0">
                                                    <span className="sub-title mb-1">{banner.subTitle}</span>
                                                    <h1 className="title mb-1">{banner.title}</h1>
                                                    <h3 className="inner-title mb-2">{banner.innerTitle}</h3>
                                                    <div className="banner-btn mt-3">
                                                        <span className="btn--base">{banner.buttonText} <i className="fas fa-arrow-right ml-2"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admin Controls Overlay */}
                                    <div className="position-absolute d-flex justify-content-center align-items-center" style={{ top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', opacity: 0, transition: '0.3s', zIndex: 2 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                                        <div className="d-flex" style={{ gap: '10px' }}>
                                            <button onClick={() => handleEdit(banner)} className="btn--base active" style={{ padding: '10px 20px' }}>
                                                Edit <i className="fas fa-edit ml-1"></i>
                                            </button>
                                            <button onClick={() => handleDelete(banner._id)} className="btn--base" style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', borderColor: '#dc3545' }}>
                                                Delete <i className="fas fa-trash ml-1"></i>
                                            </button>
                                        </div>
                                        <div className="position-absolute" style={{ top: '15px', right: '15px' }}>
                                            <span className="badge bg-danger" style={{ fontSize: '14px', padding: '8px 15px' }}>Order: {banner.order}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ticker Management Section */}
                    <div className="row pb-120">
                        <div className="col-12 mt-5">
                            <div className="account-widget-form-area p-5 rounded" style={{ backgroundColor: '#111', border: '1px solid #dc3545' }}>
                                <div className="section-header">
                                    <h2 className="section-title">Dynamic <span>Ticker Notices</span></h2>
                                    <p className="mt-2 text-white-50">Manage the scrolling marquee messages in the site header.</p>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-xl-6 form-group">
                                        <label className="text-white mb-2 font-weight-bold">Primary Notice (Updates)</label>
                                        <input 
                                            type="text" 
                                            className="form--control" 
                                            value={tickerData.updatesText} 
                                            onChange={(e) => setTickerData({ ...tickerData, updatesText: e.target.value })} 
                                            placeholder="Updates: Important Notices..."
                                        />
                                    </div>
                                    <div className="col-xl-6 form-group">
                                        <label className="text-white mb-2 font-weight-bold">Secondary Notice (Resources)</label>
                                        <input 
                                            type="text" 
                                            className="form--control" 
                                            value={tickerData.resourcesText} 
                                            onChange={(e) => setTickerData({ ...tickerData, resourcesText: e.target.value })} 
                                            placeholder="Explore our Resources section..."
                                        />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <button 
                                            className="btn--base" 
                                            onClick={async () => {
                                                const loadToast = toast.loading('Updating Ticker...');
                                                const res = await fetch('/api/ticker', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify(tickerData)
                                                });
                                                if (res.ok) {
                                                    toast.success('Ticker updated!', { id: loadToast });
                                                } else {
                                                    toast.error('Failed to update ticker.', { id: loadToast });
                                                }
                                            }}
                                        >
                                            Save Ticker Settings <i className="fas fa-save ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

