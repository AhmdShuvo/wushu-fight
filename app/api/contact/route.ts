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
            // Proactively migrate legacy documents to ensure all new fields exist
            const obj = contact.toObject();
            const defaults = new Contact().toObject();
            let needsSave = false;
            
            if (!obj.footer) {
                contact.footer = defaults.footer;
                needsSave = true;
            }
            if (!obj.contactPage) {
                contact.contactPage = defaults.contactPage;
                needsSave = true;
            }
            if (obj.address?.line1 && !obj.address?.room) {
                contact.address = { ...defaults.address, ...obj.address };
                needsSave = true;
            }
            
            if (needsSave) await contact.save();
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
            // Handle nested updates for safety
            if (body.address) contact.address = { ...contact.address.toObject(), ...body.address };
            if (body.phone) contact.phone = { ...contact.phone.toObject(), ...body.phone };
            if (body.socials) contact.socials = { ...contact.socials.toObject(), ...body.socials };
            if (body.contactPage) contact.contactPage = { ...contact.contactPage.toObject(), ...body.contactPage };
            if (body.footer) contact.footer = { ...contact.footer.toObject(), ...body.footer };
            if (body.email) contact.email = body.email;
            if (body.quickLinks) contact.quickLinks = body.quickLinks;
        }
        await contact.save();
        
        return NextResponse.json({ message: "Contact information updated successfully", contact });
    } catch (error: any) {

        console.error("CONTACT POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
