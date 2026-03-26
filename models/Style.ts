import mongoose, { Schema, Document } from 'mongoose';

export interface IStyle extends Document {
    title: string;
    description: string;
    icon: string;
    bgImage: string;
    order: number;
}

const StyleSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    bgImage: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Style || mongoose.model<IStyle>('Style', StyleSchema);
