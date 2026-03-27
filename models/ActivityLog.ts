import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
    user: string;
    email: string;
    action: string;
    method: string;
    endpoint: string;
    details: string;
    ip: string;
    userAgent: string;
    createdAt: Date;
}

const ActivityLogSchema: Schema = new Schema({
    user: { type: String, default: 'Anonymous' },
    email: { type: String, default: 'N/A' },
    action: { type: String, required: true },
    method: { type: String, required: true },
    endpoint: { type: String, required: true },
    details: { type: String },
    ip: { type: String },
    userAgent: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
