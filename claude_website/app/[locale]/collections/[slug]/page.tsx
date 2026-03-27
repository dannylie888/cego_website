import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { COLLECTIONS, getCollectionBySlug } from '@/content/collections';
import CollectionDetailClient from './_components/CollectionDetailClient';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  const t = await getTranslations({ locale, namespace: 'collectionsPreview.items' });
  const name = t(`${collection.nameKey}.name`);
  return {
    title: `${name} | Cego Ceramics`,
    description: t(`${collection.nameKey}.desc`),
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  return <CollectionDetailClient collection={collection} locale={locale} />;
}
