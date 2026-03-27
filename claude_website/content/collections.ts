export type Collection = {
  slug: string;
  nameKey: string;
  accent: string;
  heroImage: string;
  images: string[];
  itemTypes: string[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: 'blue-white',
    nameKey: 'blueWhite',
    accent: '#2C4A7C',
    heroImage: '/images/collections/blue-white/bw-01.jpg',
    images: [
      '/images/collections/blue-white/bw-01.jpg',
      '/images/collections/blue-white/bw-02.jpg',
      '/images/collections/blue-white/bw-03.jpg',
      '/images/collections/blue-white/bw-04.jpg',
      '/images/collections/blue-white/bw-05.jpg',
      '/images/collections/blue-white/bw-06.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'mug', 'cupSaucer', 'servingPlatter'],
  },
  {
    slug: 'matt-brown',
    nameKey: 'mattBrown',
    accent: '#8B6355',
    heroImage: '/images/collections/matt-brown/mb-01.jpg',
    images: [
      '/images/collections/matt-brown/mb-01.jpg',
      '/images/collections/matt-brown/mb-02.jpg',
      '/images/collections/matt-brown/mb-03.jpg',
      '/images/collections/matt-brown/mb-04.jpg',
      '/images/collections/matt-brown/mb-05.jpg',
      '/images/collections/matt-brown/mb-06.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'smallBowl', 'mug', 'servingPlatter'],
  },
  {
    slug: 'dusty-iron',
    nameKey: 'dustyIron',
    accent: '#6B5E52',
    heroImage: '/images/collections/dusty-iron/di-01.jpg',
    images: [
      '/images/collections/dusty-iron/di-01.jpg',
      '/images/collections/dusty-iron/di-02.jpg',
      '/images/collections/dusty-iron/di-03.jpg',
      '/images/collections/dusty-iron/di-04.jpg',
      '/images/collections/dusty-iron/di-05.jpg',
      '/images/collections/dusty-iron/di-06.jpg',
    ],
    itemTypes: ['dinnerPlate', 'bowl', 'ramenBowl', 'mug', 'servingPlatter'],
  },
  {
    slug: 'two-tone',
    nameKey: 'twoTone',
    accent: '#C8A96E',
    heroImage: '/images/collections/two-tone/tt-01.jpg',
    images: [
      '/images/collections/two-tone/tt-01.jpg',
      '/images/collections/two-tone/tt-02.jpg',
      '/images/collections/two-tone/tt-03.jpg',
      '/images/collections/two-tone/tt-04.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'mug', 'cupSaucer'],
  },
  {
    slug: 'brush',
    nameKey: 'brush',
    accent: '#8B6355',
    heroImage: '/images/collections/brush/br-01.jpg',
    images: [
      '/images/collections/brush/br-01.jpg',
      '/images/collections/brush/br-02.jpg',
      '/images/collections/brush/br-03.jpg',
      '/images/collections/brush/br-04.jpg',
      '/images/collections/brush/br-05.jpg',
      '/images/collections/brush/br-06.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'mug', 'servingPlatter'],
  },
  {
    slug: 'bpgp',
    nameKey: 'bpgp',
    accent: '#C8A96E',
    heroImage: '/images/collections/bpgp/bpgp-01.jpg',
    images: [
      '/images/collections/bpgp/bpgp-01.jpg',
      '/images/collections/bpgp/bpgp-02.jpg',
      '/images/collections/bpgp/bpgp-03.jpg',
      '/images/collections/bpgp/bpgp-04.jpg',
      '/images/collections/bpgp/bpgp-05.jpg',
      '/images/collections/bpgp/bpgp-06.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'cupSaucer', 'servingPlatter'],
  },
  {
    slug: 'half-white',
    nameKey: 'halfWhite',
    accent: '#E8E3DA',
    heroImage: '/images/collections/blue-white/bw-02.jpg',
    images: [
      '/images/collections/blue-white/bw-02.jpg',
      '/images/collections/blue-white/bw-04.jpg',
      '/images/collections/matt-brown/mb-03.jpg',
      '/images/collections/matt-brown/mb-05.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'mug', 'cupSaucer'],
  },
  {
    slug: 'white-pearl',
    nameKey: 'whitePearl',
    accent: '#FAFAF8',
    heroImage: '/images/collections/matt-brown/mb-02.jpg',
    images: [
      '/images/collections/matt-brown/mb-02.jpg',
      '/images/collections/matt-brown/mb-04.jpg',
      '/images/collections/matt-brown/mb-06.jpg',
      '/images/collections/dusty-iron/di-02.jpg',
    ],
    itemTypes: ['dinnerPlate', 'sidePlate', 'bowl', 'cupSaucer', 'servingPlatter'],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
