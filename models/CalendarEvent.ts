import mongoose, { Schema, Document } from 'mongoose';

export interface ICalendarEvent extends Document {
    month: string;
    event: string;
    location: string;
    date: string;
    order: number;
}

const CalendarEventSchema: Schema = new Schema({
    month: { type: String, required: true },
    event: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.CalendarEvent || mongoose.model<ICalendarEvent>('CalendarEvent', CalendarEventSchema);
