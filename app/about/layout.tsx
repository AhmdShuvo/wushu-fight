import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the history, mission, and vision of the Bangladesh Wushu Federation. Discover the pioneers who built the foundation of Wushu in Bangladesh.',
  keywords: ['about wushu', 'bwuf history', 'bangladesh wushu federation team', 'wushu mission and vision'],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
