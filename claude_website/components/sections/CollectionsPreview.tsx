'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { COLLECTIONS } from '@/content/collections';

export default function CollectionsPreview() {
  const t = useTranslations('collectionsPreview');
  const locale = useLocale();
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.hdr') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(listRef.current?.querySelectorAll('.row') ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;
    if (hovered !== null) {
      gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(imgRef.current, { opacity: 0, scale: 0.97, duration: 0.4, ease: 'power2.in' });
    }
  }, [hovered]);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8]">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-20 pb-12">
        <div className="flex items-end justify-between gap-8 mb-2">
          <div>
            <p className="hdr text-[10px] tracking-[0.5em] uppercase text-[#B8914F] mb-3">{t('label')}</p>
            <h2 className="hdr font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1512] leading-tight">{t('heading')}</h2>
          </div>
          <Link href={`/${locale}/collections`}
            className="hdr hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B5E52] hover:text-[#B8914F] transition-colors duration-300 flex-shrink-0 mb-1">
            {t('viewAll')} <span className="text-base">→</span>
          </Link>
        </div>
        <span className="hdr block h-px bg-[#DDD6CC] mt-6" />
      </div>

      {/* Two-column: list + floating image preview */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0 lg:gap-12 items-start">

        {/* List */}
        <div ref={listRef}>
          {COLLECTIONS.map(({ slug, nameKey, accent }, idx) => (
            <Link
              key={slug}
              href={`/${locale}/collections/${slug}`}
              data-track={`coll-list-${slug}`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="row group flex items-center gap-5 py-5 border-b border-[#DDD6CC] hover:pl-2 transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.4em] text-[#B8914F] w-7 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
              <span className="w-4 h-px flex-shrink-0 transition-all duration-300" style={{ backgroundColor: hovered === idx ? accent : '#DDD6CC', width: hovered === idx ? '24px' : '16px' }} />
              <span className="flex-1 font-serif text-xl md:text-2xl font-light text-[#1A1512] group-hover:text-[#B8914F] transition-colors duration-300">
                {t(`items.${nameKey}.name`)}
              </span>
              <span className="hidden md:block text-[11px] text-[#6B5E52] max-w-[200px] leading-relaxed">
                {t(`items.${nameKey}.desc`)}
              </span>
              <span className="text-[#DDD6CC] group-hover:text-[#B8914F] group-hover:translate-x-1 transition-all duration-300 text-lg">→</span>
            </Link>
          ))}

          <Link href={`/${locale}/collections`}
            className="md:hidden mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B5E52] hover:text-[#B8914F] transition-colors duration-300">
            {t('viewAll')} →
          </Link>
        </div>

        {/* Floating image — desktop only */}
        <div className="hidden lg:block sticky top-24">
          <div ref={imgRef} className="relative aspect-[3/4] overflow-hidden opacity-0">
            {hovered !== null && (
              <Image
                key={COLLECTIONS[hovered].slug}
                src={COLLECTIONS[hovered].heroImage}
                alt={t(`items.${COLLECTIONS[hovered].nameKey}.name`)}
                fill
                className="object-cover"
                sizes="340px"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
