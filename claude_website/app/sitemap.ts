import { MetadataRoute } from 'next';
import { COLLECTIONS } from '@/content/collections';

const BASE_URL = 'https://cego-ceramics.com';
const LOCALES = ['en', 'th'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/collections', '/catalog', '/custom', '/about', '/contact'];

  const staticEntries = LOCALES.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  const collectionEntries = LOCALES.flatMap((locale) =>
    COLLECTIONS.map((c) => ({
      url: `${BASE_URL}/${locale}/collections/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...collectionEntries];
}
