import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const credentialKeys = ['foodSafe', 'experience', 'exportReady', 'oemCapable'] as const;
  const manufacturingPoints = ['highFired', 'foodSafe', 'qualityControl', 'customCapable'] as const;

  return (
    <div className="bg-[#FAF7F2] pt-[72px]">

      {/* Ruled header */}
      <div className="border-b border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('hero.label')}</span>
          <span className="flex-1 h-px bg-[#DDD6CC]" />
        </div>
      </div>

      {/* Hero — full-width image with text overlay at bottom */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <Image src="/images/hero/hero-01.jpg" alt="About Cego Ceramics" fill
          className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512]/70 via-[#1A1512]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1440px] mx-auto px-8 sm:px-12 pb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light text-[#F5F0E8] leading-tight max-w-3xl">
            {t('hero.heading')}
          </h1>
        </div>
      </div>

      {/* Story — editorial 2-col */}
      <div className="border-b border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F] mb-5">{t('story.label')}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1A1512] leading-tight mb-4">
              {t('story.heading')}
            </h2>
            <span className="block w-8 h-px bg-[#B8914F] mb-8" />
            <div className="space-y-5 text-[#6B5E52] leading-[1.85]">
              <p>{t('story.p1')}</p>
              <p>{t('story.p2')}</p>
              <p>{t('story.p3')}</p>
            </div>
          </div>

          {/* Image mosaic */}
          <div className="grid grid-cols-2 gap-px bg-[#DDD6CC]">
            <div className="col-span-2 relative aspect-[16/9] overflow-hidden bg-[#EDE8DF]">
              <Image src="/images/collections/blue-white/bw-01.jpg" alt="Cego Ceramics craft" fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#EDE8DF]">
              <Image src="/images/collections/brush/br-01.jpg" alt="Brush collection" fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="25vw" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#EDE8DF]">
              <Image src="/images/collections/bpgp/bpgp-01.jpg" alt="BP GP collection" fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="25vw" />
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturing — dark bg, image right */}
      <div className="bg-[#1A1512]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#F5F0E8]/10 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('manufacturing.label')}</span>
          <span className="flex-1 h-px bg-[#F5F0E8]/10" />
        </div>
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
            <Image src="/images/collections/dusty-iron/di-01.jpg" alt="Manufacturing" fill
              className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#F5F0E8] leading-tight mb-4">
              {t('manufacturing.heading')}
            </h2>
            <span className="block w-8 h-px bg-[#B8914F] mb-6" />
            <p className="text-[#F5F0E8]/60 leading-[1.85] mb-8">{t('manufacturing.desc')}</p>
            <ul className="space-y-3">
              {manufacturingPoints.map((key) => (
                <li key={key} className="flex items-center gap-3 text-sm text-[#F5F0E8]/70">
                  <span className="w-4 h-px bg-[#B8914F] flex-shrink-0" />
                  {t(`manufacturing.points.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Credentials — gap-px grid */}
      <div className="border-y border-[#DDD6CC] bg-[#F5F0E8]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('credentials.label')}</span>
          <span className="flex-1 h-px bg-[#DDD6CC]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B5E52]">{t('credentials.heading')}</span>
        </div>
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDD6CC]">
            {credentialKeys.map((key) => (
              <div key={key} className="bg-[#F5F0E8] p-8 hover:bg-[#EDE8DF] transition-colors duration-300">
                <span className="block w-4 h-px bg-[#B8914F] mb-4" />
                <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#1A1512] font-medium mb-3">
                  {t(`credentials.items.${key}.title`)}
                </h3>
                <p className="text-sm text-[#6B5E52] leading-[1.8]">{t(`credentials.items.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image triptych */}
      <div className="grid grid-cols-3 h-56 md:h-80">
        {[
          '/images/collections/matt-brown/mb-01.jpg',
          '/images/collections/two-tone/tt-01.jpg',
          '/images/collections/bpgp/bpgp-01.jpg',
        ].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image src={src} alt="" fill
              className="object-cover hover:scale-[1.04] transition-transform duration-700"
              sizes="33vw" />
          </div>
        ))}
      </div>

    </div>
  );
}
