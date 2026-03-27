'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import LightboxModal from '@/components/ui/LightboxModal';
import type { Collection } from '@/content/collections';

export default function CollectionDetailClient({ collection, locale }: { collection: Collection; locale: string }) {
  const t = useTranslations('collectionDetail');
  const ti = useTranslations('collectionsPreview.items');
  const galleryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const name = ti(`${collection.nameKey}.name`);
  const story = t(`stories.${collection.slug}`);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.querySelectorAll('.reveal') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );
      gsap.fromTo(galleryRef.current?.querySelectorAll('.gallery-item') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FAF7F2] pt-[72px]">

      {/* Breadcrumb bar */}
      <div className="border-b border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-4 flex items-center gap-3">
          <Link href={`/${locale}/collections`}
            className="text-[10px] tracking-[0.3em] uppercase text-[#B8914F] hover:opacity-70 transition-opacity">
            ← {t('back')}
          </Link>
          <span className="h-3 w-px bg-[#DDD6CC]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B5E52]">{name}</span>
        </div>
      </div>

      {/* Hero — split: image left, text right */}
      <div ref={headerRef} className="max-w-[1440px] mx-auto px-8 sm:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
          <Image src={collection.heroImage} alt={name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute top-5 left-5 bg-[#FAF7F2]/90 px-4 py-2 border border-[#DDD6CC]">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#B8914F]">Collection</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="block w-8 h-px" style={{ backgroundColor: collection.accent }} />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#B8914F]">{t('availableItemsLabel')}</span>
          </div>
          <h1 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1512] leading-tight mb-6">{name}</h1>
          <p className="reveal text-[#6B5E52] leading-[1.85] mb-10">{story}</p>

          {/* Item types */}
          <ul className="reveal space-y-2 mb-10">
            {collection.itemTypes.map((type) => (
              <li key={type} className="flex items-center gap-3 text-sm text-[#1A1512]">
                <span className="w-4 h-px bg-[#B8914F] flex-shrink-0" />
                {t(`itemTypes.${type}`)}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="reveal flex flex-wrap gap-4">
            <Link href={`/${locale}/contact?type=catalog`}
              data-track={`collection-detail-catalog-cta-${collection.slug}`}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300">
              {t('requestCatalog')} <span className="text-base">→</span>
            </Link>
            <Link href={`/${locale}/contact?type=oem`}
              data-track={`collection-detail-quote-cta-${collection.slug}`}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B5E52] border-b border-[#DDD6CC] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300">
              {t('requestQuote')} <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Gallery section */}
      <div className="border-t border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('galleryLabel')}</span>
          <span className="flex-1 h-px bg-[#DDD6CC]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B5E52]">{collection.images.length} pieces</span>
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10">
          <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#DDD6CC]">
            {collection.images.map((src, idx) => (
              <div key={src}
                className="gallery-item group relative bg-[#EDE8DF] overflow-hidden cursor-pointer"
                style={{ aspectRatio: idx % 5 === 0 ? '1/1.2' : '1/1' }}
                onClick={() => setLightbox({ open: true, index: idx })}>
                <Image src={src} alt={`${name} ${idx + 1}`} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-[#1A1512]/0 group-hover:bg-[#1A1512]/25 transition-colors duration-500" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="bg-[#F5F0E8]/90 text-[#1A1512] text-[9px] tracking-[0.3em] uppercase px-2.5 py-1">View ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="border-t border-[#DDD6CC] bg-[#F5F0E8]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-sm text-[#6B5E52]">{t('viewFullCatalog')}</p>
          <Link href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300">
            Browse All Products <span className="text-base">→</span>
          </Link>
        </div>
      </div>

      {lightbox.open && (
        <LightboxModal
          images={collection.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox((p) => ({ ...p, index: (p.index - 1 + collection.images.length) % collection.images.length }))}
          onNext={() => setLightbox((p) => ({ ...p, index: (p.index + 1) % collection.images.length }))}
        />
      )}
    </div>
  );
}
