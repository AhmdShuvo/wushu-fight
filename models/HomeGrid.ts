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
        image: string;
        subtitle: string;
    };
    about: {
        title: string;
        content: string;
        image: string;
        subtitle: string;
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
        subtitle: { type: String, default: 'ESTABLISHED 1986' },
        title: { type: String, default: 'History of Wushu' },
        content: { type: String, required: true },
        image: { type: String, default: '/assets/images/bg/bg-11.png' }
    },
    about: {
        subtitle: { type: String, default: 'OUR STORY' },
        title: { type: String, default: 'About BWUF' },
        content: { type: String, required: true },
        image: { type: String, default: '/assets/images/bg/bg-12.png' }
    },
    secretary: {
        title: { type: String, default: 'Message from the General Secretary' },
        content: { type: String, required: true },
        image: { type: String, default: '/assets/images/secretary.png' }
    }
}, { timestamps: true });

// Force re-registration in development to pick up schema changes
if (mongoose.models.HomeGrid) {
    delete mongoose.models.HomeGrid;
}

export default mongoose.model<IHomeGrid>('HomeGrid', HomeGridSchema);
