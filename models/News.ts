import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
    title: string;
    slug: string;
    date: string;
    author: string;
    category: string;
    img: string;
    content: string;
    order: number;
}

const NewsSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    content: { type: String, default: '' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
