import mongoose, { Schema, Document } from 'mongoose';

export interface IPageContent extends Document {
    slug: string;
    title: string;
    subtitle: string;
    layout: 'content-image' | 'cards-overlay' | 'team-grid' | 'organogram' | 'list-cards';
    content?: string | string[];
    description?: string;
    highlights?: Array<{ icon: string; title: string; text: string }>;
    cards?: Array<{ icon: string; title: string; text: string }>;
    items?: Array<{ title: string; desc: string }>;
    image?: string;
}

const PageContentSchema: Schema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    layout: { 
        type: String, 
        required: true, 
        enum: ['content-image', 'cards-overlay', 'team-grid', 'organogram', 'list-cards'],
        default: 'content-image'
    },
    content: { type: Schema.Types.Mixed }, // string or array
    description: { type: String },
    highlights: [{
        icon: { type: String },
        title: { type: String },
        text: { type: String }
    }],
    cards: [{
        icon: { type: String },
        title: { type: String },
        text: { type: String }
    }],
    items: [{
        title: { type: String },
        desc: { type: String }
    }],
    image: { type: String },
}, { timestamps: true });

export default mongoose.models.PageContent || mongoose.model<IPageContent>('PageContent', PageContentSchema);
