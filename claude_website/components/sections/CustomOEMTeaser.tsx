'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

export default function CustomOEMTeaser() {
  const t = useTranslations('customTeaser');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.reveal') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] border-t border-[#DDD6CC]">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
        <span className="flex-1 h-px bg-[#DDD6CC]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image — full bleed left on desktop */}
        <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
          <Image src="/images/collections/bpgp/bpgp-01.jpg" alt="Custom OEM ceramic" fill
            className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          {/* Inset label */}
          <div className="absolute top-5 left-5 bg-[#F5F0E8]/90 px-4 py-2 border border-[#DDD6CC]">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#B8914F]">OEM Available</span>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1512] leading-tight mb-6">
            {t('heading')}
          </h2>
          <span className="reveal block w-8 h-px bg-[#B8914F] mb-8" />
          <p className="reveal text-[#6B5E52] leading-[1.8] max-w-md mb-10">{t('desc')}</p>

          {/* Feature pills */}
          <div className="reveal flex flex-wrap gap-2 mb-10">
            {['Custom Shapes', 'Bespoke Glazes', 'Brand Engraving', 'Custom Packaging'].map((item) => (
              <span key={item} className="text-[10px] tracking-[0.25em] uppercase border border-[#DDD6CC] px-3 py-1.5 text-[#6B5E52]">
                {item}
              </span>
            ))}
          </div>

          <div className="reveal">
            <Link href={`/${locale}/custom`} data-track="custom-teaser-cta"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300">
              {t('cta')} <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
