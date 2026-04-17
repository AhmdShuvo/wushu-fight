import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tournament & Events',
  description: 'Stay updated with the latest Wushu tournaments, national championships, and international events organized by the Bangladesh Wushu Federation.',
  keywords: ['wushu events', 'wushu tournaments', 'bangladesh wushu competition', 'sanda events', 'taolu competitions'],
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
