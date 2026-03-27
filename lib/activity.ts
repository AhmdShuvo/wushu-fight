import { headers } from 'next/headers';
import dbConnect from './db';
import ActivityLog from '@/models/ActivityLog';
import { getAuthSession } from './auth';

/**
 * Logs an activity to the database.
 * @param action - Human readable action (e.g. "Updated Profile", "Submitted Testimonial")
 * @param request - Next.js Request object (optional)
 * @param details - JSON details of the action (optional)
 */
export async function logActivity(action: string, request?: Request, details?: any) {
    try {
        await dbConnect();
        const session = await getAuthSession();
        const headerList = await headers();
        
        const ip = headerList.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headerList.get('user-agent') || 'Unknown';
        
        let endpoint = 'Unknown';
        let method = 'Unknown';
        
        if (request) {
            const url = new URL(request.url);
            endpoint = url.pathname;
            method = request.method;
        }

        await ActivityLog.create({
            user: session?.user?.name || 'Anonymous',
            email: session?.user?.email || 'N/A',
            action,
            method,
            endpoint,
            details: details ? JSON.stringify(details) : undefined,
            ip,
            userAgent
        });
    } catch (error) {
        console.error("FAILED TO LOG ACTIVITY:", error);
    }
}
