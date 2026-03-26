import { NextResponse } from 'next/server';
import { writeFile, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import dbConnect from '../../../lib/db';
import Media from '../../../models/Media';

export async function POST(request: Request) {
    try {
        await dbConnect();
        
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Unique filename to prevent overwrites
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filename = `${timestamp}-${originalName}`;
        
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = join(uploadDir, filename);
        await writeFile(filePath, buffer);

        const url = `/uploads/${filename}`;
        
        // Categorize file
        let type: 'image' | 'video' | 'pdf' | 'other' = 'other';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'pdf';

        // Save to DB
        const media = await Media.create({
            url,
            filename: originalName,
            type,
            size: file.size
        });

        return NextResponse.json({ url, media });
    } catch (e: any) {
        console.error("UPLOAD ERROR", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
