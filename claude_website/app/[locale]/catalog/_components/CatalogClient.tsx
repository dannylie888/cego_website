'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import LightboxModal from '@/components/ui/LightboxModal';
import { PRODUCTS } from '@/content/products';

type FilterKey = 'all' | 'blueWhite' | 'mattBrown' | 'dustyIron' | 'twoTone' | 'brush' | 'bpgp';

const SLUG_TO_FILTER: Record<string, FilterKey> = {
  'blue-white': 'blueWhite', 'matt-brown': 'mattBrown', 'dusty-iron': 'dustyIron',
  'two-tone': 'twoTone', 'brush': 'brush', 'bpgp': 'bpgp',
};

const filters: FilterKey[] = ['all', 'blueWhite', 'mattBrown', 'dustyIron', 'twoTone', 'brush', 'bpgp'];
const PAGE_SIZE = 12;

export default function CatalogClient({ locale }: { locale: string }) {
  const t = useTranslations('catalogPage');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const allItems = PRODUCTS.map((p) => ({ ...p, filter: SLUG_TO_FILTER[p.collectionSlug] ?? 'all' as FilterKey }));
  const filtered = activeFilter === 'all' ? allItems : allItems.filter((i) => i.filter === activeFilter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleFilter = (f: FilterKey) => {
    if (f === activeFilter) return;
    gsap.to(gridRef.current, { opacity: 0, y: 8, duration: 0.18, onComplete: () => { setActiveFilter(f); setPage(0); } });
  };

  const handlePage = useCallback((dir: 1 | -1) => {
    const next = page + dir;
    if (next < 0 || next >= totalPages) return;
    gsap.to(gridRef.current, { opacity: 0, duration: 0.18, onComplete: () => setPage(next) });
  }, [page, totalPages]);

  useEffect(() => {
    gsap.fromTo(gridRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
  }, [activeFilter, page]);

  return (
    <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10 pb-24">

      {/* Toolbar: filters + download */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => handleFilter(f)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 border ${
                activeFilter === f
                  ? 'border-[#1A1512] bg-[#1A1512] text-[#F5F0E8]'
                  : 'border-[#DDD6CC] text-[#6B5E52] hover:border-[#B8914F] hover:text-[#B8914F]'
              }`}>
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <a href="/catalog.pdf" download data-track="catalog-page-download"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#6B5E52] hover:text-[#B8914F] transition-colors duration-300">
            ↓ {t('downloadCatalog')}
          </a>
          <span className="text-[#DDD6CC] text-xs">|</span>
          <Link href={`/${locale}/contact`}
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#6B5E52] hover:text-[#B8914F] transition-colors duration-300">
            {t('requestInquiry')} →
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#DDD6CC]">
        {currentItems.map((item, idx) => (
          <div key={`${item.id}-${page}`}
            className="group relative bg-[#EDE8DF] overflow-hidden cursor-pointer"
            style={{ aspectRatio: idx % 7 === 0 ? '1/1.2' : '1/1' }}
            onClick={() => setLightbox({ open: true, index: page * PAGE_SIZE + idx })}>
            <Image src={item.image} alt={item.name} fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-[#1A1512]/0 group-hover:bg-[#1A1512]/25 transition-colors duration-500" />
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <span className="bg-[#F5F0E8]/90 text-[#1A1512] text-[9px] tracking-[0.3em] uppercase px-2.5 py-1">{t('viewItem')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Count + pagination */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-[11px] text-[#6B5E52]/60">
          {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} / {filtered.length}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-3">
            <button onClick={() => handlePage(-1)} disabled={page === 0}
              className="w-9 h-9 border border-[#DDD6CC] text-[#6B5E52] flex items-center justify-center hover:border-[#B8914F] hover:text-[#B8914F] disabled:opacity-30 transition-colors text-sm">‹</button>
            <span className="text-[11px] text-[#6B5E52]">{page + 1} / {totalPages}</span>
            <button onClick={() => handlePage(1)} disabled={page === totalPages - 1}
              className="w-9 h-9 border border-[#DDD6CC] text-[#6B5E52] flex items-center justify-center hover:border-[#B8914F] hover:text-[#B8914F] disabled:opacity-30 transition-colors text-sm">›</button>
          </div>
        )}
      </div>

      {lightbox.open && (
        <LightboxModal
          images={filtered.map((i) => i.image)}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox((p) => ({ ...p, index: (p.index - 1 + filtered.length) % filtered.length }))}
          onNext={() => setLightbox((p) => ({ ...p, index: (p.index + 1) % filtered.length }))}
        />
      )}
    </div>
  );
}
