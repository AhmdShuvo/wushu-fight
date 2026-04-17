import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Member from '@/models/Member';
import Gallery from '@/models/Gallery';
import Testimonial from '@/models/Testimonial';
import ActivityLog from '@/models/ActivityLog';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        const [users, members, gallery, testimonials, recentLogs] = await Promise.all([
            User.countDocuments(),
            Member.countDocuments(),
            Gallery.countDocuments(),
            Testimonial.countDocuments({ status: 'pending' }),
            ActivityLog.find().sort({ createdAt: -1 }).limit(5)
        ]);

        return NextResponse.json({
            stats: [
                { name: 'System Users', value: users, icon: 'fa-users', color: '#4e73df' },
                { name: 'Society Members', value: members, icon: 'fa-user-tie', color: '#1cc88a' },
                { name: 'Gallery Items', value: gallery, icon: 'fa-images', color: '#36b9cc' },
                { name: 'Pending Testimonials', value: testimonials, icon: 'fa-comment-dots', color: '#f6c23e' },
            ],
            recentActivity: recentLogs
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
