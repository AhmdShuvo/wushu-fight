import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    address: {
        room: string;
        floor: string;
        building: string;
        street: string;
        area: string;
        city: string;
        zip: string;
        country: string;
        mapLink: string;
        mapIframe: string;
    };

    phone: {
        telephone: string;
        mobile: string;
    };
    email: string;
    socials: {
        facebook: string;
        instagram: string;
        twitter: string;
        youtube: string;
        whatsapp: string;
    };
    contactPage: {
        title: string;
        subtitle: string;
        description: string;
    };
    quickLinks: {
        image: string;
        url: string;
    }[];
    footer: {
        logo: string;
        description: string;
    };
}


const ContactSchema: Schema = new Schema({
    address: {
        room: { type: String, default: 'Room: 32' },
        floor: { type: String, default: '2nd Floor' },
        building: { type: String, default: 'National Stadium' },
        street: { type: String, default: 'Purana Paltan' },
        area: { type: String, default: 'Dhaka' },
        city: { type: String, default: 'Dhaka' },
        zip: { type: String, default: '1000' },
        country: { type: String, default: 'Bangladesh' },
        mapLink: { type: String, default: 'https://maps.app.goo.gl/kJHSD23asEeUcN7b8' },
        mapIframe: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.5491012173534!2d90.41058117437461!3d23.727790789645827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9a18d0b0931%3A0xdab240983bb02610!2sNational%20Stadium%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1767015612952!5m2!1sen!2sbd' }
    },

    phone: {
        telephone: { type: String, default: '+88 02 9565503' },
        mobile: { type: String, default: '+88 01972182990' }
    },
    email: { type: String, default: 'wushubd@gmail.com' },
    socials: {
        facebook: { type: String, default: '#' },
        instagram: { type: String, default: '#' },
        twitter: { type: String, default: '#' },
        youtube: { type: String, default: '#' },
        whatsapp: { type: String, default: '#' }
    },
    contactPage: {
        title: { type: String, default: 'Ready to Get More Information' },
        subtitle: { type: String, default: 'Ready to Get More Information' },
        description: { type: String, default: 'There were twelve rules in all, and they specified that fights should be "a fair stand-up Wushu match" in a 24-foot-square or similar ring.' }
    },
    quickLinks: [
        {
            image: { type: String, default: '/assets/images/quicklinks/Picture4.png' },
            url: { type: String, default: '#' }
        },
        {
            image: { type: String, default: '/assets/images/quicklinks/Picture5.png' },
            url: { type: String, default: '#' }
        },
        {
            image: { type: String, default: '/assets/images/quicklinks/Picture6.png' },
            url: { type: String, default: '#' }
        },
        {
            image: { type: String, default: '/assets/images/quicklinks/Picture7.png' },
            url: { type: String, default: '#' }
        }
    ],
    footer: {
        logo: { type: String, default: '/assets/images/wushu_logo.png' },
        description: { type: String, default: 'Bangladesh Wushu Federation (BWUF) is the sole authority for Wushu in Bangladesh, dedicated to promoting martial arts excellence and discipline since 1986. We are affiliated with SAWUF, WFA, and IWUF.' }
    }
}, { timestamps: true });


export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
