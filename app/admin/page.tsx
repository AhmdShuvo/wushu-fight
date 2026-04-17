'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<any[]>([]);
    const [activity, setActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const res = await fetch('/api/admin/stats');
            const data = await res.json();
            if (data.stats) setStats(data.stats);
            if (data.recentActivity) setActivity(data.recentActivity);
        } catch (error) {
            toast.error('Failed to load dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const quickActions = [
        { name: 'Update Banner', href: '/admin/banner', icon: 'fa-images', color: '#3ee80f' },
        { name: 'Manage Members', href: '/admin/members', icon: 'fa-user-tie', color: '#3ee80f' },
        { name: 'Photo Gallery', href: '/admin/gallery', icon: 'fa-photo-video', color: '#3ee80f' },
        { name: 'Ticker Alerts', href: '/admin/ticker', icon: 'fa-bell', color: '#3ee80f' },
    ];

    if (loading) {
        return <div className="p-5 text-center"><div className="spinner-border text-success"></div></div>;
    }

    return (
        <div className="admin-dashboard-wrapper">
            <div className="row g-4 mb-5">
                {stats.map((stat, idx) => (
                    <div key={idx} className="col-xl-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100 py-2" style={{ borderLeft: `4px solid ${stat.color}` }}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: stat.color, fontSize: '11px' }}>
                                            {stat.name}
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{stat.value}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className={`fas ${stat.icon} fa-2x text-gray-300`} style={{ opacity: 0.3 }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mb-5">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-bottom-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <h6 className="m-0 font-weight-bold text-dark">Recent System Activity</h6>
                            <Link href="/admin/activity" className="text-success small text-decoration-none">View All Logs</Link>
                        </div>
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="border-0 small text-uppercase" style={{ fontSize: '10px' }}>User</th>
                                            <th className="border-0 small text-uppercase" style={{ fontSize: '10px' }}>Action</th>
                                            <th className="border-0 small text-uppercase" style={{ fontSize: '10px' }}>Module</th>
                                            <th className="border-0 small text-uppercase text-end" style={{ fontSize: '10px' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activity.length > 0 ? activity.map((log) => (
                                            <tr key={log._id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center sm-avatar" style={{ width: '24px', height: '24px', fontSize: '10px' }}>
                                                            {log.user_email?.[0].toUpperCase() || 'S'}
                                                        </div>
                                                        <span className="small">{log.user_email}</span>
                                                    </div>
                                                </td>
                                                <td><span className="badge rounded-pill bg-light text-dark border">{log.action}</span></td>
                                                <td className="small text-muted">{log.module}</td>
                                                <td className="text-end small text-muted">
                                                    {new Date(log.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={4} className="text-center py-4 text-muted">No recent activity</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100 bg-dark text-white overflow-hidden" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
                            <h5 className="font-weight-bold mb-4">Quick Actions</h5>
                            <div className="d-grid gap-3">
                                {quickActions.map((action, i) => (
                                    <Link key={i} href={action.href} className="btn btn-outline-light text-start p-3 d-flex align-items-center gap-3 border-secondary hover-bg-success">
                                        <i className={`fas ${action.icon}`} style={{ color: action.color }}></i>
                                        <span>{action.name}</span>
                                    </Link>
                                ))}
                            </div>

                            {session?.user?.role === 'super_admin' && (
                                <div className="mt-5 pt-4 border-top border-secondary">
                                    <p className="small text-muted mb-3 italic">Advanced Tools</p>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm("This will overwrite all your current changes. Are you sure?")) {
                                                const loading = toast.loading('Resetting database...');
                                                try {
                                                    const res = await fetch('/api/seed/banner');
                                                    const data = await res.json();
                                                    toast.success(data.message, { id: loading });
                                                    setTimeout(() => window.location.reload(), 1500);
                                                } catch (error) {
                                                    toast.error('Reset failed', { id: loading });
                                                }
                                            }
                                        }}
                                        className="btn btn-danger btn-sm w-100"
                                    >
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        Reset/Seed Database
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Decorative background circle */}
                        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(62, 232, 15, 0.05)', borderRadius: '50%', zIndex: 0 }}></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover-bg-success:hover {
                    background-color: #3ee80f !important;
                    border-color: #3ee80f !important;
                    color: #000 !important;
                }
                .hover-bg-success:hover i {
                    color: #000 !important;
                }
                .italic { font-style: italic; }
            `}</style>
        </div>
    );
}

