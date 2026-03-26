import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
    name: string;
    role: string;
    desc: string;
    image: string;
    category: 'founding' | 'executive';
    order: number;
}

const MemberSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, enum: ['founding', 'executive'], required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);
