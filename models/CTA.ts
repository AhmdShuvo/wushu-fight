import mongoose, { Schema, Document } from 'mongoose';

export interface ICTA extends Document {
    title: string;
    subTitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    bgImage: string;
}

const CTASchema: Schema = new Schema({
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    bgImage: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.CTA || mongoose.model<ICTA>('CTA', CTASchema);
