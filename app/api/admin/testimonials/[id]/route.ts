import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { adminProtectedRoute } from '@/lib/auth';
import { logActivity } from '@/lib/activity';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { id } = await params;
    await dbConnect();
    try {
        const body = await request.json();
        const updated = await Testimonial.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // LOG ACTIVITY
        const action = body.isApproved === true ? "APPROVED_TESTIMONIAL" : 
                       body.isApproved === false ? "DISAPPROVED_TESTIMONIAL" : "UPDATED_TESTIMONIAL";
        await logActivity(action, request, { id, name: updated.name });

        return NextResponse.json({ message: "Updated successfully", testimonial: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await adminProtectedRoute();
    if (authError) return authError;

    const { id } = await params;
    await dbConnect();
    try {
        await Testimonial.findByIdAndDelete(id);
        
        // LOG ACTIVITY
        await logActivity("DELETED_TESTIMONIAL", request, { id });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
