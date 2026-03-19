import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://cego-ceramics.com/en', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://cego-ceramics.com/th', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];
}
