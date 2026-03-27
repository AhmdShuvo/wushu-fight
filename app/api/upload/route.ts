import { NextResponse } from 'next/server';
import { writeFile, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import dbConnect from '../../../lib/db';
import Media from '../../../models/Media';
import { adminProtectedRoute } from '../../../lib/auth';
import { logActivity } from '../../../lib/activity';

const ALLOWED_MIME_TYPES = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 
    'application/pdf', 
    'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'
];

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf', 'mp4', 'webm', 'mov', 'avi'];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB default
const MAX_VIDEO_SIZE = 1000 * 1024 * 1024; // 1000MB for videos

export async function POST(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    try {
        await dbConnect();
        
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // VALIDATION: MIME Type
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return NextResponse.json({ error: `File type ${file.type} is not allowed` }, { status: 400 });
        }

        // VALIDATION: Extension
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            return NextResponse.json({ error: `File extension .${extension} is not allowed` }, { status: 400 });
        }

        // VALIDATION: Size
        const isVideo = file.type.startsWith('video/');
        const limit = isVideo ? MAX_VIDEO_SIZE : MAX_FILE_SIZE;
        if (file.size > limit) {
            return NextResponse.json({ 
                error: `File is too large. Max size for ${isVideo ? 'video' : 'this file type'} is ${limit / (1024 * 1024)}MB` 
            }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Unique filename to prevent overwrites & cross-directory traversal
        // Clean filename strictly
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const filename = `${timestamp}-${safeName}`;
        
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = join(uploadDir, filename);
        await writeFile(filePath, buffer);

        const url = `/uploads/${filename}`;
        
        // Categorize file for Model
        let type: 'image' | 'video' | 'pdf' | 'other' = 'other';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'pdf';

        // Save to DB
        const media = await Media.create({
            url,
            filename: file.name,
            type,
            size: file.size
        });

        // LOG ACTIVITY
        await logActivity("UPLOADED_FILE", request, { filename: file.name, url, size: file.size, type });

        return NextResponse.json({ url, media });
    } catch (e: any) {
        console.error("UPLOAD ERROR", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
