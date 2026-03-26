import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainer extends Document {
    name: string;
    role: string;
    image: string;
    socials: {
        facebook?: string;
        twitter?: string;
        googlePlus?: string;
        instagram?: string;
    };
    order: number;
}

const TrainerSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    socials: {
        facebook: { type: String },
        twitter: { type: String },
        googlePlus: { type: String },
        instagram: { type: String },
    },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Trainer || mongoose.model<ITrainer>('Trainer', TrainerSchema);
