"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const loadToast = toast.loading('Signing in...');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                toast.error(res.error, { id: loadToast });
            } else {
                toast.success('Signed in successfully!', { id: loadToast });
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            toast.error('An error occurred during sign in', { id: loadToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                background: '#fff',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
            }}>
                <div className="text-center mb-4">
                    <h2 style={{ color: '#212529', fontWeight: 700 }}>Admin Login</h2>
                    <p style={{ color: '#6c757d' }}>Enter your credentials to access the console</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-dark">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-dark">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-danger w-100 py-2"
                        disabled={loading}
                        style={{ height: '50px', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
