import type { Metadata } from 'next';
import { Inter, Hind_Siliguri } from 'next/font/google';
import { site } from '@/constants/site';
import { Header } from '@/components/layout/Header';
import { PrayerBar } from '@/components/layout/PrayerBar';
import { Footer } from '@/components/layout/Footer';
import { ScrollTopButton } from '@/components/common/ScrollTopButton';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/components/common/SEO';
import { getAllCategories } from '@/lib/sanity/categories';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bangla',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.nameEn}`,
  },
  description: site.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Categories power both Header nav and Footer links — fetched once here
  // rather than separately in each component.
  const categories = await getAllCategories();

  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        {/* Organization + WebSite (with SearchAction) schemas belong site-wide,
            not per-page, so they live here rather than being repeated in
            Home's own JSON-LD (which only adds page-specific schemas). */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header categories={categories} />
        <PrayerBar />
        <div className="flex-1">{children}</div>
        <Footer categories={categories} />
        <ScrollTopButton />
      </body>
    </html>
  );
}
