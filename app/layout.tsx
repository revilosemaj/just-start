import type { Metadata } from 'next';
import { Exo } from 'next/font/google';
import './globals.css';
import GridBackground from '@/components/GridBackground';
import { HERO, SOCIAL_LINKS } from '@/lib/content';

const exo = Exo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-exo',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ojaco.dev'),
  title: 'Oliver James Aco — Web Developer & Frontend Specialist',
  description: HERO.bio,
  keywords: [
    'web developer',
    'frontend developer',
    'Next.js',
    'React',
    'TypeScript',
    'Philippines',
  ],
  authors: [{ name: 'Oliver James Aco', url: 'https://ojaco.dev' }],
  alternates: {
    canonical: 'https://ojaco.dev',
  },
  openGraph: {
    type: 'website',
    url: 'https://ojaco.dev',
    title: 'Oliver James Aco — Web Developer & Frontend Specialist',
    description: HERO.bio,
    siteName: 'ojaco.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oliver James Aco — Web Developer & Frontend Specialist',
    description: HERO.bio,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Oliver James Aco',
  url: 'https://ojaco.dev',
  jobTitle: HERO.subtitle,
  description: HERO.bio,
  sameAs: SOCIAL_LINKS.filter((l) => l.href.startsWith('http')).map((l) => l.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${exo.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const saved = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (saved === 'dark' || (!saved && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GridBackground />
        {children}
      </body>
    </html>
  );
}
