import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
    url: string;
    filename: string;
    type: 'image' | 'video' | 'pdf' | 'document' | 'other';
    size: number;
    createdAt: Date;
}

const MediaSchema: Schema = new Schema({
    url: { type: String, required: true },
    filename: { type: String, required: true },
    type: { type: String, required: true, enum: ['image', 'video', 'pdf', 'document', 'other'] },
    size: { type: Number },
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);
