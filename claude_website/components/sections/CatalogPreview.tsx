'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import LightboxModal from '@/components/ui/LightboxModal';
import { PRODUCTS } from '@/content/products';

type FilterKey = 'all' | 'blueWhite' | 'mattBrown' | 'dustyIron' | 'twoTone' | 'brush' | 'bpgp';

const SLUG_TO_FILTER: Record<string, FilterKey> = {
  'blue-white': 'blueWhite', 'matt-brown': 'mattBrown', 'dusty-iron': 'dustyIron',
  'two-tone': 'twoTone', 'brush': 'brush', 'bpgp': 'bpgp',
};

const filters: FilterKey[] = ['all', 'blueWhite', 'mattBrown', 'dustyIron', 'twoTone', 'brush', 'bpgp'];
const PAGE_SIZE = 6;

export default function CatalogPreview() {
  const t = useTranslations('catalogPreview');
  const locale = useLocale();
  const [active, setActive] = useState<FilterKey>('all');
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allItems = PRODUCTS.map((p) => ({ src: p.image, filter: SLUG_TO_FILTER[p.collectionSlug] ?? 'all' as FilterKey }));
  const filtered = active === 'all' ? allItems : allItems.filter((i) => i.filter === active);
  const total = Math.ceil(filtered.length / PAGE_SIZE);
  const current = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const changeFilter = (f: FilterKey) => {
    if (f === active) return;
    gsap.to(gridRef.current, { opacity: 0, y: 8, duration: 0.18, onComplete: () => { setActive(f); setPage(0); } });
  };

  const changePage = useCallback((dir: 1 | -1) => {
    const next = page + dir;
    if (next < 0 || next >= total) return;
    gsap.to(gridRef.current, { opacity: 0, duration: 0.18, onComplete: () => setPage(next) });
  }, [page, total]);

  useEffect(() => {
    gsap.fromTo(gridRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
  }, [active, page]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.hdr') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FAF7F2] border-y border-[#DDD6CC]">
      {/* Header bar */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="hdr text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
          <span className="hdr h-px w-8 bg-[#DDD6CC]" />
          <h2 className="hdr font-serif text-xl font-light text-[#1A1512]">{t('heading')}</h2>
        </div>
        <div className="flex items-center gap-3">
          <a href="/catalog.pdf" download data-track="catalog-preview-download"
            className="hdr text-[10px] tracking-[0.3em] uppercase text-[#6B5E52] hover:text-[#B8914F] transition-colors flex items-center gap-1.5">
            ↓ {t('downloadCatalog')}
          </a>
          <span className="text-[#DDD6CC]">|</span>
          <Link href={`/${locale}/catalog`}
            className="hdr text-[10px] tracking-[0.3em] uppercase text-[#6B5E52] hover:text-[#B8914F] transition-colors">
            {t('viewFullCatalog')} →
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10">
        {/* Filter pills */}
        <div className="hdr flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button key={f} onClick={() => changeFilter(f)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 border ${
                active === f
                  ? 'border-[#1A1512] bg-[#1A1512] text-[#F5F0E8]'
                  : 'border-[#DDD6CC] text-[#6B5E52] hover:border-[#B8914F] hover:text-[#B8914F]'
              }`}>
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        {/* Grid — 3 col masonry-feel */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {current.map((item, idx) => (
            <div key={`${item.src}-${page}`}
              onClick={() => setLightbox({ open: true, index: page * PAGE_SIZE + idx })}
              className="group relative overflow-hidden cursor-pointer bg-[#EDE8DF]"
              style={{ aspectRatio: idx === 0 ? '1/1.3' : idx === 1 ? '1/1' : '1/1.1' }}>
              <Image src={item.src} alt={`Product ${page * PAGE_SIZE + idx + 1}`} fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-[#1A1512]/0 group-hover:bg-[#1A1512]/25 transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="bg-[#F5F0E8]/90 text-[#1A1512] text-[9px] tracking-[0.3em] uppercase px-2.5 py-1">View</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => changePage(-1)} disabled={page === 0}
              className="w-9 h-9 border border-[#DDD6CC] text-[#6B5E52] flex items-center justify-center hover:border-[#B8914F] hover:text-[#B8914F] disabled:opacity-30 transition-colors text-sm">‹</button>
            <span className="text-[11px] text-[#6B5E52]">{page + 1} / {total}</span>
            <button onClick={() => changePage(1)} disabled={page === total - 1}
              className="w-9 h-9 border border-[#DDD6CC] text-[#6B5E52] flex items-center justify-center hover:border-[#B8914F] hover:text-[#B8914F] disabled:opacity-30 transition-colors text-sm">›</button>
          </div>
        )}
      </div>

      {lightbox.open && (
        <LightboxModal
          images={filtered.map((i) => i.src)}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox((p) => ({ ...p, index: (p.index - 1 + filtered.length) % filtered.length }))}
          onNext={() => setLightbox((p) => ({ ...p, index: (p.index + 1) % filtered.length }))}
        />
      )}
    </section>
  );
}
