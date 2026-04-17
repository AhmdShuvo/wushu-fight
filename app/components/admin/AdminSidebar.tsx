'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const sections = [
    { 
        category: 'DASHBOARD',
        items: [
            { name: 'Admin Home', href: '/admin', icon: 'fa-tachometer-alt' },
        ]
    },
    { 
        category: 'CONTENT',
        items: [
            { name: 'Banner', href: '/admin/banner', icon: 'fa-images' },
            { name: 'Ticker', href: '/admin/ticker', icon: 'fa-bell' },
            { name: 'Home Grid', href: '/admin/home-grid', icon: 'fa-th-large' },
            { name: 'Calendar', href: '/admin/calendar', icon: 'fa-calendar-alt' },
            { name: 'Events', href: '/admin/tournament-events', icon: 'fa-trophy' },
        ]
    },
    { 
        category: 'ASSETS',
        items: [
            { name: 'Gallery', href: '/admin/gallery', icon: 'fa-photo-video' },
            { name: 'Resources', href: '/admin/resources', icon: 'fa-book' },
        ]
    },
    { 
        category: 'PEOPLE',
        items: [
            { name: 'Members', href: '/admin/members', icon: 'fa-user-tie' },
            { name: 'Testimonials', href: '/admin/testimonials', icon: 'fa-comment-dots' },
        ]
    },
    { 
        category: 'SYSTEM',
        items: [
            { name: 'Users', href: '/admin/users', icon: 'fa-users-cog' },
            { name: 'Activity', href: '/admin/activity', icon: 'fa-history' },
        ]
    }
];

interface AdminSidebarProps {
    isCollapsed: boolean;
}

export default function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{
            width: isCollapsed ? '88px' : '280px',
            background: 'linear-gradient(180deg, #0f0f0f 0%, #050505 100%)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1000,
            overflowY: 'auto',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
            boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
        }}>
            {/* Logo Area */}
            <Link href="/" className="text-decoration-none">
                <div className={`p-4 d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} style={{ minHeight: '90px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="logo-wrapper p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                        <img src="/assets/images/wushu_logo.png" height={32} width={40} alt="Logo" style={{ flexShrink: 0, objectFit: 'contain' }} />
                    </div>
                    {!isCollapsed && (
                        <div className="ms-3 animate-fade-in text-nowrap">
                            <h6 className="m-0 text-white font-weight-bold" style={{ fontSize: '14px', letterSpacing: '1px' }}>BWUF</h6>
                            <small className="text-muted" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>CONTROL CENTER</small>
                        </div>
                    )}
                </div>
            </Link>

            {/* Navigation Area */}
            <div className="flex-grow-1 py-4 scrollbar-hide" style={{ overflowX: 'hidden' }}>
                {sections.map((section, idx) => (
                    <div key={idx} className="mb-4">
                        {!isCollapsed ? (
                            <small className="px-5 text-muted font-weight-bold d-block mb-3 text-uppercase animate-fade-in" style={{ fontSize: '9px', letterSpacing: '2px', opacity: 0.5 }}>
                                {section.category}
                            </small>
                        ) : (
                            <div className="mx-auto my-3" style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        )}
                        <div className="nav flex-column gap-1">
                            {section.items.map((item) => (
                                <Link 
                                    key={item.href} 
                                    href={item.href}
                                    title={isCollapsed ? item.name : ''}
                                    className={`nav-link px-4 py-3 d-flex align-items-center gap-3 transition-all ${isActive(item.href) ? 'active-nav-link' : 'text-secondary-emphasis'}`}
                                    style={{ 
                                        fontSize: '14px', 
                                        position: 'relative',
                                        margin: isCollapsed ? '0 10px' : '0 20px',
                                        borderRadius: '12px',
                                        color: isActive(item.href) ? '#fff' : 'rgba(255,255,255,0.6)'
                                    }}
                                >
                                    <div className={`icon-box d-flex align-items-center justify-content-center ${isActive(item.href) ? 'icon-active' : ''}`} style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        flexShrink: 0,
                                        borderRadius: '10px',
                                        transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                        background: isActive(item.href) ? 'linear-gradient(135deg, #3ee80f 0%, #2cb30a 100%)' : 'rgba(255,255,255,0.03)'
                                    }}>
                                        <i className={`fas ${item.icon}`} style={{ 
                                            fontSize: '16px',
                                            color: isActive(item.href) ? '#000' : 'inherit'
                                        }}></i>
                                    </div>
                                    {!isCollapsed && <span className="animate-slide-in font-weight-medium">{item.name}</span>}
                                    
                                    {isActive(item.href) && !isCollapsed && (
                                        <div className="ms-auto" style={{ width: '6px', height: '6px', background: '#3ee80f', borderRadius: '50%', boxShadow: '0 0 10px #3ee80f' }}></div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout Area */}
            <div className="p-4 border-top border-light-subtle mt-auto bg-black-50" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <button 
                    onClick={() => signOut()} 
                    title="Terminate Session"
                    className={`btn-stylish d-flex align-items-center justify-content-center gap-2 ${isCollapsed ? 'collapsed-logout' : 'w-100'}`}
                >
                    <i className="fas fa-power-off"></i>
                    {!isCollapsed && <span className="font-weight-bold">SIGN OUT</span>}
                </button>
            </div>

            <style jsx>{`
                .nav-link:hover {
                    background: rgba(255,255,255,0.05) !important;
                    color: #fff !important;
                }
                .nav-link:hover .icon-box {
                    transform: scale(1.1);
                    background: rgba(255,255,255,0.08);
                }
                .active-nav-link {
                    background: rgba(62, 232, 15, 0.08) !important;
                    box-shadow: inset 0 0 0 1px rgba(62, 232, 15, 0.1);
                }
                .active-nav-link .icon-box {
                    box-shadow: 0 4px 15px rgba(62, 232, 15, 0.3);
                }
                .btn-stylish {
                    background: transparent;
                    border: 1px solid rgba(220, 53, 69, 0.2);
                    color: #dc3545;
                    padding: 12px;
                    border-radius: 14px;
                    transition: all 0.3s;
                    font-size: 13px;
                }
                .btn-stylish:hover {
                    background: #dc3545;
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
                    border-color: #dc3545;
                }
                .collapsed-logout {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    padding: 0;
                    margin: 0 auto;
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                
                .animate-slide-in {
                    animation: slideIn 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </aside>
    );
}
