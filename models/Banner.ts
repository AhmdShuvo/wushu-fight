import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
    subTitle: string;
    title: string;
    innerTitle: string;
    description: string;
    backgroundImage: string;
    bannerThumb?: string;
    widgetText?: string;
    widgetTextCount?: string;
    buttonText: string;
    buttonLink: string;
    order: number;
    elements?: any;
}

const BannerSchema: Schema = new Schema({
    subTitle: { type: String, required: true },
    title: { type: String, required: true },
    innerTitle: { type: String, required: true },
    description: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    bannerThumb: { type: String },
    widgetText: { type: String },
    widgetTextCount: { type: String },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    order: { type: Number, default: 0 },
    elements: { type: Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema);
