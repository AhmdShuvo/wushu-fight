import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources & Downloads',
  description: 'Access official Wushu rulebooks, training manuals, and federation documents provided by the Bangladesh Wushu Federation.',
  keywords: ['wushu rulebook', 'wushu training manual', 'bwuf documents', 'martial arts resources'],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
