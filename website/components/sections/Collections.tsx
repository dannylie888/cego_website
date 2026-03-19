'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import MarqueeText from '@/components/ui/MarqueeText';

const collectionsData = [
  { key: 'blueWhite',  image: '/images/collections/blue-white/bw-01.jpg',    accent: '#2C4A7C' },
  { key: 'mattBrown',  image: '/images/collections/matt-brown/mb-01.jpg',    accent: '#8B6355' },
  { key: 'dustyIron',  image: '/images/collections/dusty-iron/di-01.jpg',    accent: '#6B5E52' },
  { key: 'twoTone',    image: '/images/collections/two-tone/tt-01.jpg',      accent: '#C8A96E' },
  { key: 'brush',      image: '/images/collections/brush/br-01.jpg',         accent: '#8B6355' },
  { key: 'bpgp',       image: '/images/collections/bpgp/bpgp-01.jpg',        accent: '#C8A96E' },
  { key: 'halfWhite',  image: '/images/collections/blue-white/bw-02.jpg',    accent: '#E8E3DA' },
  { key: 'whitePearl', image: '/images/collections/matt-brown/mb-02.jpg',    accent: '#FAFAF8' },
];

export default function Collections() {
  const t  = useTranslations('collections');
  const tc = useTranslations('collections.items');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lines wipe in from centre
      gsap.fromTo(titleRef.current?.querySelectorAll('.title-line') ?? [],
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(titleRef.current?.querySelectorAll('.reveal-text') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 78%' } }
      );
      gsap.fromTo(gridRef.current?.querySelectorAll('.collection-card') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={sectionRef} className="py-24 md:py-32 bg-[#1A1512]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Centred title block */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="reveal-text text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-5">
            {t('label')}
          </p>
          <div className="flex items-center justify-center gap-5 mb-5">
            <span className="title-line hidden sm:block h-px bg-[#C8A96E] w-16 origin-right" />
            <h2 className="reveal-text text-3xl md:text-5xl font-serif text-[#F4EFE4] whitespace-nowrap">
              {t('heading')}
            </h2>
            <span className="title-line hidden sm:block h-px bg-[#C8A96E] w-16 origin-left" />
          </div>
          <p className="reveal-text text-[#F4EFE4]/55 max-w-xl mx-auto text-sm leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* 4-col grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collectionsData.map(({ key, image, accent }) => (
            <div
              key={key}
              className="collection-card group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              <Image
                src={image}
                alt={tc(`${key}.name`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512]/90 via-[#1A1512]/10 to-transparent
                              opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5
                              translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <span className="block w-5 h-px mb-3" style={{ backgroundColor: accent }} />
                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#F4EFE4] mb-1 truncate">
                  {tc(`${key}.name`)}
                </h3>
                <p className="text-[10px] text-[#F4EFE4]/55 leading-relaxed
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100
                               line-clamp-2">
                  {tc(`${key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee band */}
      <div className="mt-20 py-5 border-y border-[#F4EFE4]/10">
        <MarqueeText
          text="ARTISAN · HANDCRAFTED · TIMELESS · CERAMIC · THAILAND"
          className="text-xl md:text-2xl font-serif text-[#F4EFE4]/15 tracking-widest"
        />
      </div>
    </section>
  );
}
