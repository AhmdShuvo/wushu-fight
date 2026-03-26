import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import { adminProtectedRoute } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            contact = new Contact();
            await contact.save();
        } else {
            // Check if it's an old schema document (has line1, missing room)
            const obj = contact.toObject();
            if (obj.address?.line1 && !obj.address?.room) {
                // Migrate or just ensure room/etc are returned as defaults
                // Better: ensure the document in memory has the new fields
                const defaults = new Contact().toObject();
                contact.address = { ...defaults.address, ...obj.address };
            }
        }
        return NextResponse.json({ contact });
    } catch (error: any) {


        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    await dbConnect();
    try {
        const body = await request.json();
        
        let contact = await Contact.findOne();
        if (!contact) {
            contact = new Contact(body);
        } else {
            // Clean/Merge only schema fields
            Object.assign(contact, body);
            // Handle address nested update
            if (body.address) {
                contact.address = { ...contact.address.toObject(), ...body.address };
            }
        }
        await contact.save();
        
        return NextResponse.json({ message: "Contact information updated successfully", contact });
    } catch (error: any) {

        console.error("CONTACT POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
