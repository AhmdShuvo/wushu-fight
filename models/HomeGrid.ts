import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeGrid extends Document {
    president: {
        title: string;
        content: string;
        image: string;
    };
    history: {
        title: string;
        content: string;
    };
    about: {
        title: string;
        content: string;
    };
    secretary: {
        title: string;
        content: string;
        image: string;
    };
}

const HomeGridSchema: Schema = new Schema({
    president: {
        title: { type: String, default: 'Message from the President' },
        content: { type: String, required: true },
        image: { type: String, default: '/assets/images/president.png' }
    },
    history: {
        title: { type: String, default: 'History of Wushu' },
        content: { type: String, required: true }
    },
    about: {
        title: { type: String, default: 'About BWUF' },
        content: { type: String, required: true }
    },
    secretary: {
        title: { type: String, default: 'Message from the General Secretary' },
        content: { type: String, required: true },
        image: { type: String, default: '/assets/images/secretary.png' }
    }
}, { timestamps: true });

export default mongoose.models.HomeGrid || mongoose.model<IHomeGrid>('HomeGrid', HomeGridSchema);
