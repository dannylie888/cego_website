import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CursorDot from '@/components/ui/CursorDot';

export const metadata: Metadata = {
  title: 'Cego Ceramics | Premium Ceramic Tableware & Ceramic Plating Manufacturer',
  description: 'Cego Ceramics crafts premium ceramic tableware for restaurants and hotels. Explore our ceramic plating collections — durable, food-safe, and beautifully designed in Thailand.',
  keywords: ['ceramic plating', 'ceramic tableware', 'จานเซรามิก', 'handcrafted ceramic plates', 'restaurant ceramic plates', 'ceramic dinnerware manufacturer Thailand'],
  openGraph: {
    title: 'Cego Ceramics | Premium Ceramic Tableware',
    description: 'Premium ceramic tableware crafted in Thailand for restaurants, hotels, and fine dining.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Cego Ceramics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cego Ceramics | Premium Ceramic Tableware',
    description: 'Premium ceramic tableware crafted in Thailand for restaurants, hotels, and fine dining.',
  },
  alternates: {
    canonical: 'https://cego-ceramics.com',
    languages: {
      'en': 'https://cego-ceramics.com/en',
      'th': 'https://cego-ceramics.com/th',
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'th')) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cego Ceramics',
    url: 'https://cego-ceramics.com',
    description: 'Premium ceramic tableware manufacturer in Thailand',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Ceramic Lane',
      addressLocality: 'Bangkok',
      postalCode: '10110',
      addressCountry: 'TH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+66-2-123-4567',
      contactType: 'customer service',
      availableLanguage: ['English', 'Thai'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        <SmoothScrollProvider>
          <CursorDot />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </NextIntlClientProvider>
    </>
  );
}
