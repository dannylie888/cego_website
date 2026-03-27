import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CatalogClient from './_components/CatalogClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalogPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalogPage.hero' });

  return (
    <div className="bg-[#FAF7F2] pt-[72px]">
      {/* Ruled header bar */}
      <div className="border-b border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
          <span className="flex-1 h-px bg-[#DDD6CC]" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-14 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1512] leading-tight max-w-2xl mb-4">
          {t('heading')}
        </h1>
        <span className="block w-8 h-px bg-[#B8914F] mb-5" />
        <p className="text-[#6B5E52] leading-relaxed max-w-lg">{t('subheading')}</p>
      </div>

      <div className="border-t border-[#DDD6CC]">
        <CatalogClient locale={locale} />
      </div>
    </div>
  );
}
