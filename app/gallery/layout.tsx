import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Gallery',
  description: 'Explore the visual journey of Bangladesh Wushu Federation. Photos and videos of national championships, training camps, and international appearances.',
  keywords: ['wushu photos', 'wushu videos', 'bangladesh wushu gallery', 'martial arts media'],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
