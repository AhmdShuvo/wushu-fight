'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';

export default function ContactAdmin() {
    const [contactData, setContactData] = useState<any>({
        address: { room: '', floor: '', building: '', street: '', area: '', city: '', zip: '', country: '', mapLink: '', mapIframe: '' },
        phone: { telephone: '', mobile: '' },

        email: '',
        socials: { facebook: '', instagram: '', twitter: '', youtube: '', whatsapp: '' },
        contactPage: { title: '', subtitle: '', description: '' },
        quickLinks: []
    });

    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch('/api/contact')
            .then(res => res.json())
            .then(data => {
                if (data.contact) {
                    setContactData((prev: any) => ({
                        ...prev,
                        ...data.contact,
                        address: { ...prev.address, ...data.contact.address },
                        phone: { ...prev.phone, ...data.contact.phone },
                        socials: { ...prev.socials, ...data.contact.socials },
                        contactPage: { ...prev.contactPage, ...data.contact.contactPage },
                        quickLinks: data.contact.quickLinks || []
                    }));
                }
                setLoading(false);

            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (section: string, field: string, value: string) => {
        if (section) {
            setContactData({
                ...contactData,
                [section]: {
                    ...contactData[section],
                    [field]: value
                }
            });
        } else {
            setContactData({
                ...contactData,
                [field]: value
            });
        }
    };

    const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const loadToast = toast.loading(`Uploading link image...`);
        const fd = new FormData();
        fd.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (res.ok) {
                const newLinks = [...contactData.quickLinks];
                newLinks[index].image = data.url;
                setContactData({ ...contactData, quickLinks: newLinks });
                toast.success('Image uploaded!', { id: loadToast });
            } else {
                toast.error(data.error || 'Upload failed', { id: loadToast });
            }
        } catch (error) {
            toast.error('Upload failed', { id: loadToast });
        }
    };

    const addQuickLink = () => {
        setContactData({
            ...contactData,
            quickLinks: [...contactData.quickLinks, { image: '', url: '#' }]
        });
    };

    const removeQuickLink = (index: number) => {
        setContactData({
            ...contactData,
            quickLinks: contactData.quickLinks.filter((_: any, i: number) => i !== index)
        });
    };

    const handleQuickLinkChange = (index: number, field: string, value: string) => {
        const newLinks = [...contactData.quickLinks];
        newLinks[index][field] = value;
        setContactData({ ...contactData, quickLinks: newLinks });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const loadToast = toast.loading('Saving Contact Info...');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData),
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
        return <div className="ptb-120 text-center"><h2 className="text-white">Loading...</h2></div>;
    }

    return (
        <>
            <InnerBanner title="CONTACT" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Manage Contact Sections" />

            <section className="account-widget-section account-widget-section-two account-widget-section--style ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0">
                            <h2 className="section-title">Global <span>Contact Info</span></h2>
                            <p className="mt-2 text-white-50">This information affects both the Footer and the reach page.</p>
                        </div>
                        <Link href="/admin" className="btn--base">Back to Dashboard <i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>

                    <form className="account-widget-form" onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Address Details */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">Office Address (Detailed)</h4>
                                    <div className="row">
                                        <div className="col-lg-6 form-group mb-3">
                                            <label className="text-white-50 small">Room No</label>
                                            <input type="text" className="form--control" value={contactData.address.room} onChange={(e) => handleChange('address', 'room', e.target.value)} />
                                        </div>
                                        <div className="col-lg-6 form-group mb-3">
                                            <label className="text-white-50 small">Floor</label>
                                            <input type="text" className="form--control" value={contactData.address.floor} onChange={(e) => handleChange('address', 'floor', e.target.value)} />
                                        </div>
                                        <div className="col-lg-12 form-group mb-3">
                                            <label className="text-white-50 small">Building / Stadium Name</label>
                                            <input type="text" className="form--control" value={contactData.address.building} onChange={(e) => handleChange('address', 'building', e.target.value)} />
                                        </div>
                                        <div className="col-lg-12 form-group mb-3">
                                            <label className="text-white-50 small">Street / Road Name</label>
                                            <input type="text" className="form--control" value={contactData.address.street} onChange={(e) => handleChange('address', 'street', e.target.value)} />
                                        </div>
                                        <div className="col-lg-6 form-group mb-3">
                                            <label className="text-white-50 small">Area</label>
                                            <input type="text" className="form--control" value={contactData.address.area} onChange={(e) => handleChange('address', 'area', e.target.value)} />
                                        </div>
                                        <div className="col-lg-6 form-group mb-3">
                                            <label className="text-white-50 small">City</label>
                                            <input type="text" className="form--control" value={contactData.address.city} onChange={(e) => handleChange('address', 'city', e.target.value)} />
                                        </div>
                                        <div className="col-lg-6 form-group mb-3">
                                            <label className="text-white-50 small">Zip / Post Code</label>
                                            <input type="text" className="form--control" value={contactData.address.zip} onChange={(e) => handleChange('address', 'zip', e.target.value)} />
                                        </div>
                                        <div className="col-lg-6 form-group mb-3">
                                            <label className="text-white-50 small">Country</label>
                                            <input type="text" className="form--control" value={contactData.address.country} onChange={(e) => handleChange('address', 'country', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">External Map Link</label>
                                        <input type="text" className="form--control" value={contactData.address.mapLink} onChange={(e) => handleChange('address', 'mapLink', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Map Embed URL</label>
                                        <input type="text" className="form--control" value={contactData.address.mapIframe} onChange={(e) => handleChange('address', 'mapIframe', e.target.value)} />
                                    </div>
                                </div>
                            </div>


                            {/* Contact Details */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">Phone & Email</h4>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Telephone</label>
                                        <input type="text" className="form--control" value={contactData.phone.telephone} onChange={(e) => handleChange('phone', 'telephone', e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Mobile</label>
                                        <input type="text" className="form--control" value={contactData.phone.mobile} onChange={(e) => handleChange('phone', 'mobile', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Email Address</label>
                                        <input type="email" className="form--control" value={contactData.email} onChange={(e) => handleChange('', 'email', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="col-xl-12 mb-30">
                                <div className="p-4 rounded" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">Social Profiles</h4>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 form-group mb-3">
                                            <label className="text-white-50 small">Facebook</label>
                                            <input type="text" className="form--control" value={contactData.socials.facebook} onChange={(e) => handleChange('socials', 'facebook', e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 form-group mb-3">
                                            <label className="text-white-50 small">Instagram</label>
                                            <input type="text" className="form--control" value={contactData.socials.instagram} onChange={(e) => handleChange('socials', 'instagram', e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 form-group mb-3">
                                            <label className="text-white-50 small">Twitter / X</label>
                                            <input type="text" className="form--control" value={contactData.socials.twitter} onChange={(e) => handleChange('socials', 'twitter', e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 form-group mb-3">
                                            <label className="text-white-50 small">YouTube</label>
                                            <input type="text" className="form--control" value={contactData.socials.youtube} onChange={(e) => handleChange('socials', 'youtube', e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 form-group mb-3">
                                            <label className="text-white-50 small">WhatsApp</label>
                                            <input type="text" className="form--control" value={contactData.socials.whatsapp} onChange={(e) => handleChange('socials', 'whatsapp', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Page Content */}
                            <div className="col-xl-6 mb-30">
                                <div className="p-4 rounded h-100" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <h4 className="text-white mb-4 border-bottom pb-2">Contact Page Header</h4>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Section Title</label>
                                        <input type="text" className="form--control" value={contactData.contactPage.title} onChange={(e) => handleChange('contactPage', 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-white-50 small">Section Subtitle (Span text)</label>
                                        <input type="text" className="form--control" value={contactData.contactPage.subtitle} onChange={(e) => handleChange('contactPage', 'subtitle', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white-50 small">Description Description</label>
                                        <textarea className="form--control" style={{ height: '100px' }} value={contactData.contactPage.description} onChange={(e) => handleChange('contactPage', 'description', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Quick Links (Logo links) */}
                        <div className="row">
                            <div className="col-xl-12 mb-30">
                                <div className="p-4 rounded" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                                        <h4 className="text-white mb-0">Footer Quick Links (Logo images)</h4>
                                        <button type="button" onClick={addQuickLink} className="btn--base py-2 px-3" style={{ fontSize: '13px' }}>Add Link +</button>
                                    </div>
                                    
                                    <div className="row">
                                        {contactData.quickLinks?.map((link: any, index: number) => (

                                            <div key={index} className="col-lg-3 col-md-4 mb-3">
                                                <div className="p-3 rounded" style={{ background: '#222', border: '1px solid #444' }}>
                                                    <div className="mb-2 text-center" style={{ width: '100%', height: '60px', position: 'relative', background: '#333' }}>
                                                        {link.image && <img src={link.image} style={{ height: '100%', objectFit: 'contain' }} />}
                                                    </div>
                                                    <div className="form-group mb-2">
                                                       <input type="file" onChange={(e) => handleImageUpload(index, e)} className="d-none" id={`file-${index}`} />
                                                       <label htmlFor={`file-${index}`} className="btn--base w-100 py-1" style={{ fontSize: '10px', background: '#555', cursor: 'pointer' }}>Upload Logo</label>
                                                    </div>
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form--control py-1 px-2" style={{ fontSize: '12px' }} value={link.url} onChange={(e) => handleQuickLinkChange(index, 'url', e.target.value)} placeholder="Link URL" />
                                                    </div>
                                                    <button type="button" onClick={() => removeQuickLink(index)} className="btn btn-sm btn-danger w-100 py-1" style={{ fontSize: '10px' }}>Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="text-center mt-4">
                            <button type="submit" className="btn--base w-100 p-3" style={{ fontSize: '1.2rem' }}>Save Global Profile <i className="fas fa-save ml-2"></i></button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
