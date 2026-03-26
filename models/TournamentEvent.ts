import mongoose, { Schema, Document } from 'mongoose';

export interface ITournamentEvent extends Document {
    title: string;
    description: string;
    image: string;
    videoUrl?: string;
    pdfUrl?: string;
    date: string;
    location: string;
    type: 'national' | 'international';
    gridSize: 'small' | 'medium' | 'large';
    order: number;
}

const TournamentEventSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    videoUrl: { type: String },
    pdfUrl: { type: String },
    date: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['national', 'international'], required: true },
    gridSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.TournamentEvent || mongoose.model<ITournamentEvent>('TournamentEvent', TournamentEventSchema);
