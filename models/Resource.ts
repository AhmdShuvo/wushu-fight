import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    category: 'Key Documents' | 'Training Materials' | 'Statistics';
    layout: 'document-list' | 'video-grid' | 'data-stats';
    documents?: Array<{
        name: string;
        type: string;
        size: string;
        date: string;
        icon: string;
        url?: string;
    }>;
    videos?: Array<{
        thumbnail: string;
        title: string;
        duration: string;
        author: string;
        url?: string;
    }>;
    stats?: Array<{
        label: string;
        value: string;
        icon: string;
    }>;
    recentWinners?: Array<{
        year: string;
        championName: string;
        category: string;
    }>;
}

const ResourceSchema: Schema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    category: { 
        type: String, 
        required: true, 
        enum: ['Key Documents', 'Training Materials', 'Statistics'] 
    },
    layout: { 
        type: String, 
        required: true, 
        enum: ['document-list', 'video-grid', 'data-stats'] 
    },
    documents: [{
        name: { type: String },
        type: { type: String },
        size: { type: String },
        date: { type: String },
        icon: { type: String },
        url: { type: String }
    }],
    videos: [{
        thumbnail: { type: String },
        title: { type: String },
        duration: { type: String },
        author: { type: String },
        url: { type: String }
    }],
    stats: [{
        label: { type: String },
        value: { type: String },
        icon: { type: String }
    }],
    recentWinners: [{
        year: { type: String },
        championName: { type: String },
        category: { type: String }
    }]
}, { timestamps: true });

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);
