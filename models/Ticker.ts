import mongoose, { Schema, Document } from 'mongoose';

export interface ITicker extends Document {
    updatesText: string;
    resourcesText: string;
    active: boolean;
}

const TickerSchema: Schema = new Schema({
    updatesText: { type: String, required: true },
    resourcesText: { type: String, required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Ticker || mongoose.model<ITicker>('Ticker', TickerSchema);
