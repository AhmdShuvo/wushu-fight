import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Bangladesh Wushu Federation. Inquiries about training, memberships, and events are welcome.',
  keywords: ['contact wushu bangladesh', 'wushu federation address', 'bwuf contact number'],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
