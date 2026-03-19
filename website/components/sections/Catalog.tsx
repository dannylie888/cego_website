'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import LightboxModal from '@/components/ui/LightboxModal';

type FilterKey = 'all' | 'blueWhite' | 'mattBrown' | 'dustyIron' | 'twoTone' | 'brush' | 'bpgp';
interface CatalogItem { src: string; collection: FilterKey; }

const catalogItems: CatalogItem[] = [
  { src: '/images/collections/blue-white/bw-01.jpg', collection: 'blueWhite' },
  { src: '/images/collections/blue-white/bw-02.jpg', collection: 'blueWhite' },
  { src: '/images/collections/blue-white/bw-03.jpg', collection: 'blueWhite' },
  { src: '/images/collections/blue-white/bw-04.jpg', collection: 'blueWhite' },
  { src: '/images/collections/blue-white/bw-05.jpg', collection: 'blueWhite' },
  { src: '/images/collections/blue-white/bw-06.jpg', collection: 'blueWhite' },
  { src: '/images/collections/matt-brown/mb-01.jpg', collection: 'mattBrown' },
  { src: '/images/collections/matt-brown/mb-02.jpg', collection: 'mattBrown' },
  { src: '/images/collections/matt-brown/mb-03.jpg', collection: 'mattBrown' },
  { src: '/images/collections/matt-brown/mb-04.jpg', collection: 'mattBrown' },
  { src: '/images/collections/matt-brown/mb-05.jpg', collection: 'mattBrown' },
  { src: '/images/collections/matt-brown/mb-06.jpg', collection: 'mattBrown' },
  { src: '/images/collections/dusty-iron/di-01.jpg', collection: 'dustyIron' },
  { src: '/images/collections/dusty-iron/di-02.jpg', collection: 'dustyIron' },
  { src: '/images/collections/dusty-iron/di-03.jpg', collection: 'dustyIron' },
  { src: '/images/collections/dusty-iron/di-04.jpg', collection: 'dustyIron' },
  { src: '/images/collections/dusty-iron/di-05.jpg', collection: 'dustyIron' },
  { src: '/images/collections/dusty-iron/di-06.jpg', collection: 'dustyIron' },
  { src: '/images/collections/two-tone/tt-01.jpg', collection: 'twoTone' },
  { src: '/images/collections/two-tone/tt-02.jpg', collection: 'twoTone' },
  { src: '/images/collections/two-tone/tt-03.jpg', collection: 'twoTone' },
  { src: '/images/collections/two-tone/tt-04.jpg', collection: 'twoTone' },
  { src: '/images/collections/brush/br-01.jpg', collection: 'brush' },
  { src: '/images/collections/brush/br-02.jpg', collection: 'brush' },
  { src: '/images/collections/brush/br-03.jpg', collection: 'brush' },
  { src: '/images/collections/brush/br-04.jpg', collection: 'brush' },
  { src: '/images/collections/brush/br-05.jpg', collection: 'brush' },
  { src: '/images/collections/brush/br-06.jpg', collection: 'brush' },
  { src: '/images/collections/bpgp/bpgp-01.jpg', collection: 'bpgp' },
  { src: '/images/collections/bpgp/bpgp-02.jpg', collection: 'bpgp' },
  { src: '/images/collections/bpgp/bpgp-03.jpg', collection: 'bpgp' },
  { src: '/images/collections/bpgp/bpgp-04.jpg', collection: 'bpgp' },
  { src: '/images/collections/bpgp/bpgp-05.jpg', collection: 'bpgp' },
  { src: '/images/collections/bpgp/bpgp-06.jpg', collection: 'bpgp' },
];

const filters: FilterKey[] = ['all', 'blueWhite', 'mattBrown', 'dustyIron', 'twoTone', 'brush', 'bpgp'];
const PAGE_SIZE = 6;

export default function Catalog() {
  const t = useTranslations('catalog');
  const tf = useTranslations('catalog.filters');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'all' ? catalogItems : catalogItems.filter(i => i.collection === activeFilter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleFilter = (f: FilterKey) => {
    if (f === activeFilter) return;
    gsap.to(carouselRef.current, {
      opacity: 0, y: 12, duration: 0.2,
      onComplete: () => { setActiveFilter(f); setPage(0); }
    });
  };

  const handlePage = useCallback((dir: 1 | -1) => {
    const next = page + dir;
    if (next < 0 || next >= totalPages) return;
    gsap.to(carouselRef.current, {
      opacity: 0, x: dir * -30, duration: 0.22,
      onComplete: () => setPage(next)
    });
  }, [page, totalPages]);

  useEffect(() => {
    if (!carouselRef.current) return;
    gsap.fromTo(carouselRef.current,
      { opacity: 0, x: 0, y: 10 },
      { opacity: 1, x: 0, y: 0, duration: 0.45, ease: 'power3.out' }
    );
  }, [activeFilter, page]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.querySelectorAll('.reveal') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePage(-1);
      if (e.key === 'ArrowRight') handlePage(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePage]);

  return (
    <section id="catalog" ref={sectionRef} className="py-24 md:py-32 bg-[#F4EFE4] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="reveal text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-4">{t('label')}</p>
          <h2 className="reveal text-3xl md:text-5xl font-serif text-[#1A1512] mb-5">{t('heading')}</h2>
          <div className="reveal w-12 h-px bg-[#C8A96E] mx-auto mb-5" />
          <p className="reveal text-[#6B5E52] max-w-md mx-auto text-sm leading-relaxed">{t('subheading')}</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-5 py-2.5 text-[11px] tracking-widest uppercase transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-[#1A1512] text-[#C8A96E] border border-[#1A1512]'
                  : 'border border-[#1A1512]/20 text-[#6B5E52] hover:border-[#C8A96E] hover:text-[#C8A96E]'
              }`}
            >
              {tf(f)}
            </button>
          ))}
        </div>

        {/* Square grid — all uniform 1:1 */}
        <div ref={carouselRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {currentItems.map((item, idx) => (
            <div
              key={`${item.src}-${page}`}
              className="group relative aspect-square overflow-hidden cursor-pointer bg-[#E8E3DA]"
              onClick={() => setLightbox({ open: true, index: page * PAGE_SIZE + idx })}
            >
              <Image
                src={item.src}
                alt={`Cego ceramic ${page * PAGE_SIZE + idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#1A1512]/0 group-hover:bg-[#1A1512]/45 transition-all duration-500 flex items-end justify-start p-4 sm:p-5">
                <span className="text-[#F4EFE4] text-[10px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  View ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => handlePage(-1)}
              disabled={page === 0}
              className="w-11 h-11 border border-[#1A1512]/20 text-[#1A1512] flex items-center justify-center hover:border-[#C8A96E] hover:text-[#C8A96E] disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-300 text-xl"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === page ? 'w-7 h-1.5 bg-[#C8A96E]' : 'w-1.5 h-1.5 bg-[#1A1512]/20 hover:bg-[#C8A96E]/60'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => handlePage(1)}
              disabled={page === totalPages - 1}
              className="w-11 h-11 border border-[#1A1512]/20 text-[#1A1512] flex items-center justify-center hover:border-[#C8A96E] hover:text-[#C8A96E] disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-300 text-xl"
            >
              →
            </button>
          </div>
        )}

        <p className="text-center text-[11px] tracking-widest uppercase text-[#1A1512]/30 mt-5">
          {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} / {filtered.length}
        </p>
      </div>

      {lightbox.open && (
        <LightboxModal
          images={filtered.map(i => i.src)}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }))}
          onNext={() => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }))}
        />
      )}
    </section>
  );
}
