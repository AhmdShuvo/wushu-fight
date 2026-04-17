'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Persist sidebar state in local storage
    useEffect(() => {
        const saved = localStorage.getItem('admin-sidebar-collapsed');
        if (saved !== null) {
            setIsCollapsed(JSON.parse(saved));
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState));
    };

    if (status === 'loading') {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#080808' }}>
                <div className="text-center">
                    <div className="spinner-border text-success mb-3" role="status"></div>
                    <p className="text-white font-weight-bold">Authenticating Admin...</p>
                </div>
            </div>
        );
    }

    if (!session || (session.user as any).role === 'user') {
        router.push('/login');
        return null;
    }

    return (
        <div className="admin-layout" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <AdminSidebar isCollapsed={isCollapsed} />
            
            <main style={{ 
                marginLeft: isCollapsed ? '80px' : '280px', 
                minHeight: '100vh', 
                transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}>
                {/* Top Navbar */}
                <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center sticky-top shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                        <button 
                            onClick={toggleSidebar}
                            className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}
                        >
                            <i className={`fas ${isCollapsed ? 'fa-indent' : 'fa-outdent'} text-success`} style={{ fontSize: '18px' }}></i>
                        </button>
                        <div>
                            <h5 className="m-0 text-dark font-weight-bold">Admin Workspace</h5>
                            <small className="text-muted">Bangladesh Wushu Federation Control Center</small>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="text-end d-none d-md-block">
                            <p className="m-0 font-weight-bold text-dark" style={{ lineHeight: 1 }}>{session.user?.name}</p>
                            <small className="text-success" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{(session.user as any).role}</small>
                        </div>
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center font-weight-bold shadow-sm" style={{ width: '40px', height: '40px', fontSize: '18px' }}>
                            {session.user?.name?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="p-4 animate-fade-in">
                    {children}
                </div>
            </main>

            <style jsx global>{`
                /* Hide public header/footer on admin pages when using this layout */
                header.header-section, footer.footer-section, .scroll-to-top {
                    display: none !important;
                }
                
                body {
                    overflow-x: hidden;
                }

                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Custom Scrollbar for global admin use */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: #3ee80f;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #2cb30a;
                }
            `}</style>
        </div>
    );
}
