import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getCompanyInfo } from '@/lib/api/company';
import { getOrganizationJsonLd } from '@/lib/seo/jsonld';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#0d9488', // Match primary brand color (teal-600)
};

export const metadata: Metadata = {
  title: {
    template: '%s | Apex GeoConsulting',
    default: 'Apex GeoConsulting | Geological Surveys & Environmental Engineering',
  },
  description: 'Specialized corporate engineering and environmental consultancy services.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com'),
  applicationName: 'Apex GeoConsulting',
  authors: [{ name: 'Apex GeoConsulting Engineering Team' }],
  openGraph: {
    title: 'Apex GeoConsulting',
    description: 'Geological Surveys & Environmental Engineering',
    url: 'https://apexgeoconsulting.com',
    siteName: 'Apex GeoConsulting',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex GeoConsulting',
    description: 'Geological Surveys & Environmental Engineering',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompanyInfo();
  const orgJsonLd = getOrganizationJsonLd(company);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 font-sans">
        <Header company={company} />
        <div className="flex-grow flex flex-col">{children}</div>
        <Footer company={company} />
      </body>
    </html>
  );
}
