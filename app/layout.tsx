import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { hero, site } from "@/lib/data";
import { AppStateProvider } from "@/components/AppState";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import ScrollTop from "@/components/ScrollTop";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const url = `https://${site.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name, url }],
  keywords: ["web developer", "frontend developer", "Next.js", "React", "TypeScript", "Philippines"],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: site.title,
    description: site.description,
    siteName: site.domain,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url,
  jobTitle: hero.tagline,
  description: site.description,
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AppStateProvider>
          <SmoothScroll />
          <Preloader />
          <Header />
          {children}
          <ScrollTop />
        </AppStateProvider>
      </body>
    </html>
  );
}
