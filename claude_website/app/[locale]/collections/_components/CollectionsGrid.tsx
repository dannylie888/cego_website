'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { COLLECTIONS } from '@/content/collections';

export default function CollectionsGrid({ locale }: { locale: string }) {
  const t = useTranslations('collectionsPreview.items');
  const tg = useTranslations('collectionsPage.grid');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current?.querySelectorAll('.coll-item') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pb-24">
      {/* Gap-px grid technique — borders from background color */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDD6CC]">
        {COLLECTIONS.map(({ slug, nameKey, heroImage, accent }, idx) => (
          <Link
            key={slug}
            href={`/${locale}/collections/${slug}`}
            data-track={`collections-grid-${slug}`}
            className="coll-item group relative bg-[#FAF7F2] overflow-hidden block"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={heroImage}
                alt={t(`${nameKey}.name`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#1A1512]/0 group-hover:bg-[#1A1512]/20 transition-colors duration-500" />
              {/* Index badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] tracking-[0.3em] text-[#F5F0E8]/70">{String(idx + 1).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Label row */}
            <div className="px-5 py-4 border-t border-[#DDD6CC] flex items-center justify-between gap-3">
              <div>
                <span className="block w-4 h-px mb-2" style={{ backgroundColor: accent }} />
                <h2 className="font-serif text-base font-light text-[#1A1512] group-hover:text-[#B8914F] transition-colors duration-300">
                  {t(`${nameKey}.name`)}
                </h2>
              </div>
              <span className="text-[#DDD6CC] group-hover:text-[#B8914F] group-hover:translate-x-0.5 transition-all duration-300 text-sm flex-shrink-0">→</span>
            </div>

            {/* Description — revealed on hover via max-h trick */}
            <div className="overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500 ease-in-out px-5">
              <p className="text-[11px] text-[#6B5E52] leading-relaxed pb-4 line-clamp-2">
                {tg('viewCollection')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
