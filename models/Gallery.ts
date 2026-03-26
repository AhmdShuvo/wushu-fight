import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
    imageUrl: string;
    title: string;
    category: string;
    order: number;
}

const GallerySchema: Schema = new Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: false },
    category: { type: String, required: false },
    order: { type: Number, required: false, default: 0 },

}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
