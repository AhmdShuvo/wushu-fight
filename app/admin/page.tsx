'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSession, signOut } from 'next-auth/react';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const sections = [
        { name: 'Banner Slides', href: '/admin/banner', icon: 'fa-images', category: 'HOME PAGE' },
        { name: 'Ticker Updates', href: '/admin/ticker', icon: 'fa-bell', category: 'HOME PAGE' },
        { name: 'Home Game Board', href: '/admin/home-grid', icon: 'fa-th-large', category: 'HOME PAGE' },
        { name: 'Yearly Calendar', href: '/admin/calendar', icon: 'fa-calendar-alt', category: 'HOME PAGE' },
        { name: 'Tournament Events', href: '/admin/tournament-events', icon: 'fa-trophy', category: 'HOME PAGE' },

        { name: 'Gallery Management', href: '/admin/gallery', icon: 'fa-photo-video', category: 'ASSETS' },

        { name: 'Contact & Socials', href: '/admin/contact', icon: 'fa-address-card', category: 'GLOBAL' },
        { name: 'Static Pages/Story', href: '/admin/pages', icon: 'fa-file-alt', category: 'GLOBAL' },
        { name: 'Admin/Team Members', href: '/admin/members', icon: 'fa-user-tie', category: 'GLOBAL' },
        { name: 'System Activity Logs', href: '/admin/activity', icon: 'fa-history', category: 'GLOBAL' },
        { name: 'Testimonial Moderation', href: '/admin/testimonials', icon: 'fa-comment-dots', category: 'GLOBAL' },
        { name: 'Resource Library', href: '/admin/resources', icon: 'fa-book', category: 'GLOBAL' },
        { name: 'Footer Quick Links', href: '/admin/contact#footer', icon: 'fa-link', category: 'GLOBAL' },

    ];




    return (
        <div className="p-5" style={{ background: '#f8f9fa', color: '#212529', minHeight: '100vh' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="text-dark m-0">Wushu Dashboard</h1>
                    <div className="d-flex align-items-center">
                        <span className="me-3 text-muted">Signed in as <strong>{session?.user?.name}</strong> ({session?.user?.role})</span>
                        <button onClick={() => signOut()} className="btn btn-dark">Sign Out</button>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Render Categories */}
                    {['HOME PAGE', 'ASSETS', 'GLOBAL'].map((cat) => (
                        <div key={cat} className="col-12 mt-5 first-child:mt-0">
                            <h4 className="text-secondary mb-3 border-bottom pb-2" style={{ letterSpacing: '2px', fontSize: '14px', fontWeight: 'bold' }}>
                                <i className={`fas ${cat === 'HOME PAGE' ? 'fa-home' : cat === 'ASSETS' ? 'fa-folder-open' : 'fa-globe'} me-2`}></i>
                                {cat}
                            </h4>
                            <div className="row g-4">
                                {sections.filter(s => s.category === cat).map((section) => (
                                    <div key={section.name} className="col-md-3">
                                        <Link href={section.href} className="text-decoration-none">
                                            <div className="p-4 text-center border border-light shadow-sm rounded hover-bg-light transition bg-white h-100">
                                                <i className={`fas ${section.icon} fa-2x mb-3`} style={{ color: '#3ee80f' }}></i>
                                                <h3 className="text-dark h6 m-0 font-weight-bold">{section.name}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>


                {session?.user?.role === 'super_admin' && (
                    <div className="mt-5 p-5 border rounded bg-white shadow-sm" style={{ borderColor: '#3ee80f' }}>
                        <h2 style={{ color: '#3ee80f' }}>System Tools</h2>
                        <p className="text-muted">Use the button below to reset all database content to the original template defaults.</p>
                        <button
                            onClick={async () => {
                                if (window.confirm("This will overwrite all your current changes. Are you sure?")) {
                                    const loading = toast.loading('Seeding database...');
                                    try {
                                        const res = await fetch('/api/seed/banner');
                                        const data = await res.json();
                                        toast.success(data.message, { id: loading });
                                        setTimeout(() => window.location.reload(), 1500);
                                    } catch (error) {
                                        toast.error('Seeding failed', { id: loading });
                                    }
                                }
                            }}
                            className="btn btn-outline-success btn-lg"
                            style={{ borderColor: '#3ee80f', color: '#3ee80f' }}
                        >
                            Reset/Seed Entire Database
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hover-bg-light:hover {
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                    border-color: #3ee80f !important;
                }
                .transition {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}
