import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
    title: string;
    spanTitle: string;
    description: string;
    bgImage: string;
    logoText: string;
    mainImage: string;
    signatureImage: string;
    instructorTitle: string;
    videoLink: string;
    items: {
        icon: string;
        title: string;
        description: string;
    }[];
}

const AboutSchema: Schema = new Schema({
    title: { type: String, required: true },
    spanTitle: { type: String, required: true },
    description: { type: String, required: true },
    bgImage: { type: String, required: true },
    logoText: { type: String, required: true },
    mainImage: { type: String, required: true },
    signatureImage: { type: String, required: true },
    instructorTitle: { type: String, required: true },
    videoLink: { type: String, required: true },
    items: [
        {
            icon: { type: String },
            title: { type: String },
            description: { type: String },
        }
    ],
}, { timestamps: true });

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
