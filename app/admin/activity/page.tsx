'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ActivityLog {
    _id: string;
    user: string;
    email: string;
    action: string;
    method: string;
    endpoint: string;
    ip: string;
    details?: string;
    createdAt: string;
}

export default function ActivityMonitor() {
    const { data: session } = useSession();
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ total: 0, pages: 1 });

    useEffect(() => {
        fetchLogs();
    }, [page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/activity?page=${page}&limit=20`);
            const data = await res.json();
            if (data.logs) {
                setLogs(data.logs);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error("Error fetching logs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (session?.user?.role !== 'admin' && session?.user?.role !== 'super_admin') {
        return <div className="p-5 text-center">Unauthorized</div>;
    }

    return (
        <div className="p-4" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container-fluid">
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <Link href="/admin" className="text-secondary text-decoration-none mb-2 d-inline-block">
                            <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
                        </Link>
                        <h1 className="h3">System Activity Logs</h1>
                        <p className="text-muted">Monitor all administrative and public POST actions.</p>
                    </div>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-4 py-3">Time</th>
                                        <th className="py-3">User</th>
                                        <th className="py-3">Action</th>
                                        <th className="py-3">Method / Endpoint</th>
                                        <th className="py-3">IP Address</th>
                                        <th className="py-3 text-end px-4">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={6} className="text-center py-5">Loading logs...</td></tr>
                                    ) : logs.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-5">No logs found</td></tr>
                                    ) : logs.map((log) => (
                                        <tr key={log._id}>
                                            <td className="px-4">
                                                <small className="text-muted">
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </small>
                                            </td>
                                            <td>
                                                <div className="fw-bold text-dark">{log.user}</div>
                                                <small className="text-muted">{log.email}</small>
                                            </td>
                                            <td>
                                                <span className={`badge ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <code className="me-2 text-primary">{log.method}</code>
                                                    <small className="text-muted">{log.endpoint}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <code className="text-dark bg-light p-1 rounded">{log.ip}</code>
                                            </td>
                                            <td className="text-end px-4">
                                                {log.details && (
                                                    <button 
                                                        className="btn btn-sm btn-outline-info"
                                                        onClick={() => alert(JSON.stringify(JSON.parse(log.details!), null, 2))}
                                                    >
                                                        <i className="fas fa-search-plus"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-4 d-flex justify-content-center">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(p => p - 1)}>Previous</button>
                            </li>
                            <li className="page-item active">
                                <span className="page-link">{page} of {pagination.pages}</span>
                            </li>
                            <li className={`page-item ${page >= pagination.pages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(p => p + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <style jsx>{`
                .container-fluid { max-width: 1400px; }
                .table th { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
            `}</style>
        </div>
    );
}

function getActionColor(action: string) {
    if (action.includes('SUBMITTED')) return 'bg-success text-white';
    if (action.includes('UPLOADED')) return 'bg-primary text-white';
    if (action.includes('DELETE')) return 'bg-danger text-white';
    if (action.includes('UPDATE')) return 'bg-warning text-dark';
    return 'bg-secondary text-white';
}
