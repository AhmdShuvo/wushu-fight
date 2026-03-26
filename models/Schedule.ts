import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule extends Document {
    day: string;
    col10am: { text: string; subText: string; isBlank: boolean; isActive: boolean };
    col12pm: { text: string; subText: string; isBlank: boolean; isActive: boolean };
    col02pm: { text: string; subText: string; isBlank: boolean; isActive: boolean };
    col05pm: { text: string; subText: string; isBlank: boolean; isActive: boolean };
    col07pm: { text: string; subText: string; isBlank: boolean; isActive: boolean };
    order: number;
}

const SlotSchema = {
    text: { type: String, default: '' },
    subText: { type: String, default: '' },
    isBlank: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
};

const ScheduleSchema: Schema = new Schema({
    day: { type: String, required: true },
    col10am: SlotSchema,
    col12pm: SlotSchema,
    col02pm: SlotSchema,
    col05pm: SlotSchema,
    col07pm: SlotSchema,
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
