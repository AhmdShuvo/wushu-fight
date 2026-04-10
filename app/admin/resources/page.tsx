'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InnerBanner from '../../components/InnerBanner';
import MediaPicker from '../../components/admin/MediaPicker';
import IconPicker from '../../components/admin/IconPicker';

const RESOURCE_LINKS = [
    { category: 'Key Documents', links: [
        { label: 'IWUF Constitution', value: 'iwuf-constitution' },
        { label: 'IWUF Rules & Regulations', value: 'iwuf-rules' },
        { label: 'BWUF Constitution', value: 'bwuf-constitution' },
        { label: 'BWUF Rules & Regulations', value: 'bwuf-rules' }
    ]},
    { category: 'Training Materials', links: [
        { label: 'Training Documents', value: 'training-documents' },
        { label: 'Training Videos', value: 'training-videos' },
        { label: 'Other Documentaries', value: 'other-documentaries' },
        { label: 'Reference Books', value: 'reference-books' }
    ]},
    { category: 'Statistics', links: [
        { label: 'National Competitions Data', value: 'national-competitions' },
        { label: 'International Competitions Data', value: 'international-competitions' },
        { label: 'Regional Competitions Data', value: 'regional-competitions' }
    ]}
];

export default function ResourcesAdmin() {
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedResource, setSelectedResource] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    const onSlugChange = (slug: string) => {
        // Check if this slug is already registered in our DB
        const existingResource = resources.find(r => r.slug === slug);
        
        if (existingResource) {
            toast.success(`Switching to existing ${slug} entry`);
            setSelectedResource(JSON.parse(JSON.stringify(existingResource)));
            return;
        }

        let title = '';
        let category = 'Key Documents';
        
        // Find metadata for this slug to auto-fill
        RESOURCE_LINKS.forEach(group => {
            const link = group.links.find(l => l.value === slug);
            if (link) {
                title = link.label;
                category = group.category;
            }
        });

        setSelectedResource({ 
            ...selectedResource, 
            slug, 
            title: selectedResource.title || title, 
            category: selectedResource.category || category 
        });
    }

    const fetchResources = () => {
        setLoading(true);
        fetch('/api/resources')
            .then(res => res.json())
            .then(data => {
                if (data.resources) setResources(data.resources);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const resetForm = () => {
        setSelectedResource({
            slug: '',
            title: '',
            subtitle: '',
            category: 'Key Documents',
            layout: 'document-list',
            description: '',
            documents: [],
            videos: [],
            stats: [],
            recentWinners: []
        });
        setIsEditing(true);
    };

    const handleEdit = (resource: any) => {
        setSelectedResource(JSON.parse(JSON.stringify(resource)));
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving resource...');

        const method = selectedResource._id ? 'PATCH' : 'POST';
        const url = selectedResource._id ? `/api/resources/${selectedResource._id}` : '/api/resources';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedResource),
            });

            if (res.ok) {
                toast.success(`Resource ${selectedResource._id ? 'updated' : 'created'} successfully!`, { id: loadToast });
                setIsEditing(false);
                fetchResources();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to save resource.', { id: loadToast });
            }
        } catch (err) {
            toast.error('Connection error', { id: loadToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        const loadToast = toast.loading('Deleting...');
        const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' });

        if (res.ok) {
            toast.success('Resource removed', { id: loadToast });
            fetchResources();
        } else {
            toast.error('Failed to delete.', { id: loadToast });
        }
    };

    const addListItem = (field: string) => {
        const newData = { ...selectedResource };
        if (!newData[field]) newData[field] = [];
        
        const templates: Record<string, any> = {
            documents: { name: 'New Document', type: 'PDF', size: '0.0 MB', date: new Date().toLocaleDateString(), icon: 'fa-file-pdf', url: '' },
            videos: { thumbnail: '/assets/images/gallery/gallery-1.png', title: 'New Video', duration: '0:00', author: 'Staff', url: '' },
            stats: { label: 'New Stat', value: '0', icon: 'fa-star' },
            recentWinners: { year: '2026', championName: 'Player Name', category: 'Gold Medal' }
        };

        newData[field].push(templates[field]);
        setSelectedResource(newData);
    };

    const removeListItem = (field: string, index: number) => {
        const newData = { ...selectedResource };
        newData[field].splice(index, 1);
        setSelectedResource(newData);
    };

    const updateListItem = (field: string, index: number, subfield: string, value: any) => {
        const newData = { ...selectedResource };
        newData[field][index][subfield] = value;
        setSelectedResource(newData);
    };

    const runSeed = async () => {
        if(!confirm("This will reset all resources to defaults. Continue?")) return;
        const loadToast = toast.loading('Reseting to defaults...');
        const res = await fetch('/api/seed/resources');
        if(res.ok) {
            toast.success('Reset complete', { id: loadToast });
            fetchResources();
        } else {
            toast.error('Reset failed', { id: loadToast });
        }
    }

    if (loading && !isEditing) return <div className="ptb-120 text-center"><h2 className="text-white">Loading Resources...</h2></div>;

    return (
        <>
            <InnerBanner title="RESOURCES ENGINE" subtitle="ADMIN" bgImage="/assets/images/bg/bg-12.png" activePage="Resources Manager" />

            <section className="admin-resources-section ptb-120" style={{ backgroundColor: '#000' }}>
                <div className="container" style={{ maxWidth: '1400px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-60 flex-wrap gap-4">
                        <div className="section-header mb-0 text-left">
                            <h2 className="section-title">Resource <span>Library</span> Manager</h2>
                        </div>
                        <div className="d-flex gap-3">
                            <button onClick={resetForm} className="btn--base">
                                <i className="fas fa-plus mr-2"></i> Create New Resource
                            </button>
                            <button onClick={runSeed} className="btn--base bg-danger">
                                <i className="fas fa-sync mr-2"></i> Reset Default Data
                            </button>
                            <Link href="/admin" className="btn--base bg-dark">Dashboard</Link>
                        </div>
                    </div>

                    {!isEditing ? (
                        <div className="row g-4">
                            {resources.map((res) => (
                                <div className="col-xl-4 col-lg-6" key={res.slug}>
                                    <div className="card h-100 p-4 shadow-lg border-0" style={{ backgroundColor: '#111', borderRadius: '15px', borderLeft: '5px solid #3ee80f' }}>
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <span className="badge mb-2" style={{ backgroundColor: 'rgba(62,232,15,0.2)', color: '#3ee80f' }}>{res.category}</span>
                                                <h4 className="text-white mb-0">{res.title}</h4>
                                            </div>
                                            <span className="badge bg-secondary" style={{ fontSize: '10px' }}>{res.layout}</span>
                                        </div>
                                        <p className="text-white-50 small mb-2">Slug: <code style={{ color: '#3ee80f' }}>{res.slug}</code></p>
                                        <p className="text-white-50 small mb-4 line-clamp-2" style={{ height: '40px', overflow: 'hidden' }}>{res.description}</p>

                                        <div className="d-flex gap-3 mt-auto pt-3 border-top border-secondary">
                                            <button onClick={() => handleEdit(res)} className="btn btn-sm btn-outline-light w-100">
                                                <i className="fas fa-edit mr-2"></i> Edit
                                            </button>
                                            <button onClick={() => handleDelete(res._id)} className="btn btn-sm btn-outline-success w-100" style={{ borderColor: '#3ee80f', color: '#3ee80f' }}>
                                                <i className="fas fa-trash mr-2"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="edit-form-area p-5 rounded" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                            <div className="d-flex justify-content-between mb-5 border-bottom border-secondary pb-4">
                                <h3 className="text-white">Editing: <span style={{ color: '#3ee80f' }}>{selectedResource.title || 'New Resource'}</span></h3>
                                <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-light">Cancel & Close</button>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="row g-4">
                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2 font-weight-bold">Target Resource Link (Navigation)</label>
                                        <select 
                                            className="form--control text-white" 
                                            style={{ background: '#222' }} 
                                            value={selectedResource.slug} 
                                            onChange={(e) => onSlugChange(e.target.value)} 
                                            required
                                        >
                                            <option value="">-- Select Destination Page --</option>
                                            {RESOURCE_LINKS.map(group => (
                                                <optgroup label={group.category} key={group.category} style={{ color: '#3ee80f', fontStyle: 'normal' }}>
                                                    {group.links.map(link => (
                                                        <option value={link.value} key={link.value} style={{ color: '#fff' }}>{link.label}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2 font-weight-bold">Page Title (Display)</label>
                                        <input type="text" className="form--control" placeholder="Resource Title" value={selectedResource.title} onChange={(e) => setSelectedResource({ ...selectedResource, title: e.target.value })} required />
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2 font-weight-bold">Page Subtitle</label>
                                        <input type="text" className="form--control" placeholder="Tagline" value={selectedResource.subtitle} onChange={(e) => setSelectedResource({ ...selectedResource, subtitle: e.target.value })} />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2 font-weight-bold">Category (Internal Grouping)</label>
                                        <select className="form--control text-white" style={{ background: '#222' }} value={selectedResource.category} onChange={(e) => setSelectedResource({ ...selectedResource, category: e.target.value })}>
                                            <option value="Key Documents">Key Documents</option>
                                            <option value="Training Materials">Training Materials</option>
                                            <option value="Statistics">Statistics</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="text-white-50 mb-2 font-weight-bold">Visual Layout</label>
                                        <select className="form--control text-white" style={{ background: '#222' }} value={selectedResource.layout} onChange={(e) => setSelectedResource({ ...selectedResource, layout: e.target.value })}>
                                            <option value="document-list">Document List (PDFs/Files)</option>
                                            <option value="video-grid">Video Grid (YouTube/Seminars)</option>
                                            <option value="data-stats">Data & Stats (Medals/History)</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <label className="text-white-50 mb-2 font-weight-bold">Resource Description</label>
                                        <textarea className="form--control" style={{ height: '80px' }} value={selectedResource.description} onChange={(e) => setSelectedResource({ ...selectedResource, description: e.target.value })} />
                                    </div>

                                    {/* Layout Specific Sections */}
                                    <div className="col-12 mt-5 border-top pt-5 border-secondary">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h4 className="text-white">Content Items for <span className="text-success">{selectedResource.layout.toUpperCase()}</span></h4>
                                            
                                            <div className="d-flex gap-2">
                                                {selectedResource.layout === 'document-list' && <button type="button" onClick={() => addListItem('documents')} className="btn btn-sm btn-outline-success">+ Add Document</button>}
                                                {selectedResource.layout === 'video-grid' && <button type="button" onClick={() => addListItem('videos')} className="btn btn-sm btn-outline-success">+ Add Video</button>}
                                                {selectedResource.layout === 'data-stats' && (
                                                    <>
                                                        <button type="button" onClick={() => addListItem('stats')} className="btn btn-sm btn-outline-success">+ Add Stat</button>
                                                        <button type="button" onClick={() => addListItem('recentWinners')} className="btn btn-sm btn-outline-success">+ Add Winner</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Document List Editor */}
                                        {selectedResource.layout === 'document-list' && (
                                            <div className="row g-3">
                                                {selectedResource.documents?.map((doc: any, i: number) => (
                                                    <div className="col-12 border border-secondary p-3 rounded" key={i}>
                                                        <div className="row g-3">
                                                            <div className="col-md-3">
                                                                <input type="text" className="form--control" placeholder="Doc Name" value={doc.name} onChange={(e) => updateListItem('documents', i, 'name', e.target.value)} />
                                                            </div>
                                                            <div className="col-md-1">
                                                                <input type="text" className="form--control" placeholder="PDF" value={doc.type} onChange={(e) => updateListItem('documents', i, 'type', e.target.value)} />
                                                            </div>
                                                            <div className="col-md-1">
                                                                <input type="text" className="form--control" placeholder="Size" value={doc.size} onChange={(e) => updateListItem('documents', i, 'size', e.target.value)} />
                                                            </div>
                                                            <div className="col-md-2">
                                                                <input type="text" className="form--control" placeholder="Date" value={doc.date} onChange={(e) => updateListItem('documents', i, 'date', e.target.value)} />
                                                            </div>
                                                            <div className="col-md-2">
                                                                <IconPicker value={doc.icon} onChange={(icon) => updateListItem('documents', i, 'icon', icon)} />
                                                            </div>
                                                            <div className="col-md-2">
                                                                <MediaPicker 
                                                                    label="Select File" 
                                                                    value={doc.url} 
                                                                    type="document" 
                                                                    onSelectMedia={(media) => {
                                                                        const newData = { ...selectedResource };
                                                                        const sizeMB = media.size ? (media.size / (1024 * 1024)).toFixed(2) + ' MB' : '0.0 MB';
                                                                        newData.documents[i].size = sizeMB;
                                                                        newData.documents[i].name = newData.documents[i].name === 'New Document' ? media.filename : newData.documents[i].name;
                                                                        setSelectedResource(newData);
                                                                    }}
                                                                    onChange={(url) => {
                                                                        const ext = url.split('.').pop()?.toUpperCase() || 'PDF';
                                                                        const newData = { ...selectedResource };
                                                                        newData.documents[i].url = url;
                                                                        newData.documents[i].type = ext;
                                                                        // Auto set icon based on extension
                                                                        if (ext === 'PDF') newData.documents[i].icon = 'fa-file-pdf';
                                                                        else if (['DOC', 'DOCX'].includes(ext)) newData.documents[i].icon = 'fa-file-word';
                                                                        else if (['XLS', 'XLSX'].includes(ext)) newData.documents[i].icon = 'fa-file-excel';
                                                                        else if (['PPT', 'PPTX'].includes(ext)) newData.documents[i].icon = 'fa-file-powerpoint';
                                                                        setSelectedResource(newData);
                                                                    }} 
                                                                />
                                                            </div>
                                                            <div className="col-md-1">
                                                                <button type="button" onClick={() => removeListItem('documents', i)} className="btn btn-danger w-100">&times;</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Video Grid Editor */}
                                        {selectedResource.layout === 'video-grid' && (
                                            <div className="row g-4">
                                                {selectedResource.videos?.map((vid: any, i: number) => (
                                                    <div className="col-md-6 border border-secondary p-4 rounded bg-dark" key={i}>
                                                        <div className="d-flex justify-content-between mb-3">
                                                            <h5 className="text-white">Video #{i+1}</h5>
                                                            <button type="button" onClick={() => removeListItem('videos', i)} className="btn btn-xs btn-danger">Remove</button>
                                                        </div>
                                                        <div className="row g-3">
                                                            <div className="col-md-6">
                                                                <MediaPicker label="Thumbnail" value={vid.thumbnail} onChange={(url) => updateListItem('videos', i, 'thumbnail', url)} type="image" />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small text-white-50">Title</label>
                                                                <input type="text" className="form--control mb-2" value={vid.title} onChange={(e) => updateListItem('videos', i, 'title', e.target.value)} />
                                                                <label className="small text-white-50">Duration</label>
                                                                <input type="text" className="form--control mb-2" value={vid.duration} onChange={(e) => updateListItem('videos', i, 'duration', e.target.value)} />
                                                                <label className="small text-white-50">Author</label>
                                                                <input type="text" className="form--control mb-2" value={vid.author} onChange={(e) => updateListItem('videos', i, 'author', e.target.value)} />
                                                                <label className="small text-white-50">Video Link</label>
                                                                <input type="text" className="form--control" value={vid.url} onChange={(e) => updateListItem('videos', i, 'url', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Data Stats Editor */}
                                        {selectedResource.layout === 'data-stats' && (
                                            <div className="row g-4">
                                                <div className="col-lg-6">
                                                    <h5 className="text-white mb-3">Counter Stats</h5>
                                                    {selectedResource.stats?.map((stat: any, i: number) => (
                                                        <div className="d-flex gap-2 mb-2 p-3 border border-secondary rounded" key={i}>
                                                            <IconPicker value={stat.icon} onChange={(icon) => updateListItem('stats', i, 'icon', icon)} />
                                                            <input type="text" className="form--control" placeholder="Label" value={stat.label} onChange={(e) => updateListItem('stats', i, 'label', e.target.value)} />
                                                            <input type="text" className="form--control" placeholder="Value" value={stat.value} onChange={(e) => updateListItem('stats', i, 'value', e.target.value)} />
                                                            <button type="button" onClick={() => removeListItem('stats', i)} className="btn btn-danger">&times;</button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5 className="text-white mb-3">Winners / History Table</h5>
                                                    {selectedResource.recentWinners?.map((win: any, i: number) => (
                                                        <div className="d-flex gap-2 mb-2 p-3 border border-secondary rounded" key={i}>
                                                            <input type="text" className="form--control" style={{width: '80px'}} placeholder="Year" value={win.year} onChange={(e) => updateListItem('recentWinners', i, 'year', e.target.value)} />
                                                            <input type="text" className="form--control" placeholder="Name" value={win.championName} onChange={(e) => updateListItem('recentWinners', i, 'championName', e.target.value)} />
                                                            <input type="text" className="form--control" placeholder="Achievement" value={win.category} onChange={(e) => updateListItem('recentWinners', i, 'category', e.target.value)} />
                                                            <button type="button" onClick={() => removeListItem('recentWinners', i)} className="btn btn-danger">&times;</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 mt-5 text-center">
                                        <button type="submit" className="btn--base px-5 py-3 font-weight-bold" style={{ fontSize: '18px' }}>
                                            <i className="fas fa-save mr-2"></i> UPDATE RESOURCE DATABASE
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
