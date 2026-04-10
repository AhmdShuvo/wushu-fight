'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface MediaPickerProps {
    value: string;
    onChange: (url: string) => void;
    onSelectMedia?: (media: any) => void;
    type?: 'image' | 'pdf' | 'video' | 'document' | 'all';
    label?: string;
}

export default function MediaPicker({ value, onChange, onSelectMedia, type = 'all', label = 'Asset Selector' }: MediaPickerProps) {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
    const [library, setLibrary] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(type);

    const getAcceptTypes = () => {
        switch (type) {
            case 'image': return 'image/*';
            case 'pdf': return '.pdf';
            case 'video': return 'video/*';
            case 'document': return '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.pdf';
            default: return '*/*';
        }
    };

    const fetchLibrary = () => {
        setLoading(true);
        fetch(`/api/media?type=${filter}`)
            .then(res => res.json())
            .then(data => {
                if (data.media) setLibrary(data.media);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (showModal && activeTab === 'library') {
            fetchLibrary();
        }
    }, [showModal, activeTab, filter]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Strict Client-side Validation 
        const ext = file.name.split('.').pop()?.toLowerCase();
        const docExts = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'pdf'];
        const imgExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        const vidExts = ['mp4', 'webm', 'mov', 'avi'];

        if (type === 'image' && !imgExts.includes(ext || '')) {
            toast.error('Only images are allowed!'); return;
        }
        if (type === 'pdf' && ext !== 'pdf') {
            toast.error('Only PDFs are allowed!'); return;
        }
        if (type === 'video' && !vidExts.includes(ext || '')) {
            toast.error('Only videos are allowed!'); return;
        }
        if (type === 'document' && !docExts.includes(ext || '')) {
            toast.error('Only documents (PDF/DOCX/etc.) are allowed!'); return;
        }

        const loadToast = toast.loading('Uploading asset...');
        const fd = new FormData();
        fd.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (res.ok) {
                onChange(data.url);
                if (onSelectMedia) onSelectMedia(data.media);
                toast.success('Successfully uploaded!', { id: loadToast });
                setShowModal(false);
            } else {
                toast.error(data.error || 'Upload failed', { id: loadToast });
            }
        } catch (error) {
            toast.error('Connection error', { id: loadToast });
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('Permanently delete this media asset?')) return;
        
        const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            toast.success('Deleted');
            fetchLibrary();
        }
    };

    const getIconForFile = (url: string) => {
        if (url.endsWith('.pdf')) return 'fa-file-pdf text-danger';
        if (url.match(/\.(docx|doc)$/)) return 'fa-file-word text-primary';
        if (url.match(/\.(xlsx|xls)$/)) return 'fa-file-excel text-success';
        if (url.match(/\.(pptx|ppt)$/)) return 'fa-file-powerpoint text-warning';
        return 'fa-file-alt text-muted';
    };

    return (
        <div className="media-picker-component">
            <label className="text-white-50 mb-2 small font-weight-bold uppercase">{label}</label>
            <div className="d-flex gap-3 align-items-center">
                <div 
                    className="preview-box rounded border border-secondary overflow-hidden d-flex align-items-center justify-content-center bg-dark"
                    style={{ width: '80px', height: '60px', flexShrink: 0 }}
                >
                    {value ? (
                        value.match(/\.(pdf|docx|doc|xlsx|xls|pptx|ppt|txt)$/) ? (
                            <i className={`fas ${getIconForFile(value)} fa-2x`}></i>
                        ) : (
                            <img src={value} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )
                    ) : (
                        <i className="fas fa-image text-white-50"></i>
                    )}
                </div>
                <div className="flex-grow-1">
                    <input 
                        type="text" 
                        className="form--control mb-2" 
                        placeholder="Public URL or local path" 
                        value={value} 
                        onChange={(e) => onChange(e.target.value)} 
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowModal(true)} 
                        className="btn btn-sm btn-outline-danger w-100"
                        style={{ fontSize: '11px', padding: '5px' }}
                    >
                        BROWSE MEDIA ENGINE <i className="fas fa-folder-open ml-2"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999999, backdropFilter: 'blur(10px)' }}>
                    <div className="media-modal-content p-5 rounded" style={{ backgroundColor: '#111', border: '1px solid #333', width: '90%', maxWidth: '900px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="text-white h5 mb-0">ASSET <span className="text-danger">MANAGER</span></h2>
                            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-danger"><i className="fas fa-times"></i></button>
                        </div>

                        <div className="tabs-header d-flex gap-4 mb-4 border-bottom border-secondary pb-3">
                            <button onClick={() => setActiveTab('upload')} className={`bg-transparent border-0 text-white font-weight-bold ${activeTab === 'upload' ? 'text-danger border-bottom border-danger' : 'opacity-50'}`} style={{ paddingBottom: '10px' }}>UPLOAD NEW</button>
                            <button onClick={() => setActiveTab('library')} className={`bg-transparent border-0 text-white font-weight-bold ${activeTab === 'library' ? 'text-danger border-bottom border-danger' : 'opacity-50'}`} style={{ paddingBottom: '10px' }}>BROWSE LIBRARY</button>
                        </div>

                        <div className="tab-content flex-grow-1 overflow-auto">
                            {activeTab === 'upload' ? (
                                <div className="text-center py-5">
                                    <div className="upload-dropzone p-5 border-dashed rounded position-relative" style={{ border: '2px dashed #444', backgroundColor: '#1a1a1a' }}>
                                        <i className="fas fa-cloud-upload-alt text-danger fa-4x mb-4"></i>
                                        <h4 className="text-white mb-3">Drop file here or click to select</h4>
                                        <p className="text-muted small">Supports {type === 'all' ? 'Images, PDFs, Documents and Video clips' : type.toUpperCase()}</p>
                                        <input 
                                            type="file" 
                                            className="position-absolute opacity-0" 
                                            style={{ top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
                                            onChange={handleUpload}
                                            accept={getAcceptTypes()}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="library-view h-100">
                                    <div className="filter-bar mb-4 d-flex gap-2">
                                        <button onClick={() => setFilter('image')} className={`btn btn-xs ${filter === 'image' ? 'btn-danger' : 'btn-dark'}`}>IMAGES</button>
                                        <button onClick={() => setFilter('pdf')} className={`btn btn-xs ${filter === 'pdf' ? 'btn-danger' : 'btn-dark'}`}>PDFS</button>
                                        <button onClick={() => setFilter('document')} className={`btn btn-xs ${filter === 'document' ? 'btn-danger' : 'btn-dark'}`}>DOCS</button>
                                        <button onClick={() => setFilter('all')} className={`btn btn-xs ${filter === 'all' ? 'btn-danger' : 'btn-dark'}`}>ALL</button>
                                    </div>

                                    {loading ? (
                                        <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>
                                    ) : (
                                        <div className="row g-3">
                                            {library.map((item) => (
                                                <div className="col-lg-3 col-md-4 col-6" key={item._id}>
                                                    <div 
                                                        className={`asset-card rounded overflow-hidden border ${value === item.url ? 'border-danger' : 'border-secondary'} bg-dark h-100 position-relative`}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => { 
                                                            onChange(item.url); 
                                                            if (onSelectMedia) onSelectMedia(item);
                                                            setShowModal(false); 
                                                        }}
                                                    >
                                                        <div className="asset-thumb" style={{ height: '120px' }}>
                                                            {item.type === 'pdf' ? (
                                                                <div className="h-100 d-flex align-items-center justify-content-center flex-column">
                                                                    <i className="fas fa-file-pdf text-danger fa-3x mb-2"></i>
                                                                    <span className="small text-white-50 px-2 text-center text-truncate w-100">{item.filename}</span>
                                                                </div>
                                                            ) : (
                                                                <img src={item.url} alt={item.filename} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                                            )}
                                                        </div>
                                                        <div className="p-2 d-flex justify-content-between align-items-center bg-black">
                                                            <span className="text-white extra-small text-truncate" style={{ fontSize: '10px' }}>{item.filename}</span>
                                                            <button onClick={(e) => handleDelete(e, item._id)} className="btn btn-xs btn-danger p-1" style={{ fontSize: '8px' }}><i className="fas fa-trash"></i></button>
                                                        </div>
                                                        {value === item.url && (
                                                            <div className="position-absolute" style={{ top: '5px', right: '5px' }}>
                                                                <i className="fas fa-check-circle text-danger bg-white rounded-circle"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {library.length === 0 && <div className="col-12 text-center py-5 text-muted">No assets found in library.</div>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .extra-small { font-size: 10px; }
                .uppercase { text-transform: uppercase; letter-spacing: 1px; }
            `}</style>
        </div>
    );
}
