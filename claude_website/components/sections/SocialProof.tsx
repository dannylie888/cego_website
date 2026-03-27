'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const badges = ['foodSafe', 'leadFree', 'dishwasherSafe', 'oemReady', 'exportReady', 'madeInThailand'] as const;

export default function SocialProof() {
  const t = useTranslations('socialProof');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.enter') ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#FAF7F2] border-y border-[#DDD6CC]">
      {/* Label bar */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
        <span className="enter text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
        <span className="enter flex-1 h-px bg-[#DDD6CC]" />
        <span className="enter text-[10px] tracking-[0.3em] uppercase text-[#6B5E52]">{t('heading')}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-12 md:py-16">
        {/* Credential band */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#DDD6CC] mb-10">
          {badges.map((key) => (
            <div key={key} className="enter bg-[#FAF7F2] flex flex-col items-center justify-center text-center py-6 px-4 hover:bg-[#F5F0E8] transition-colors duration-300 group">
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#6B5E52] group-hover:text-[#B8914F] transition-colors duration-300 leading-[1.6]">
                {t(`badges.${key}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Export destinations */}
        <div className="enter flex flex-col sm:flex-row items-center gap-4 justify-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B8914F]">{t('destinations')}</span>
          <span className="h-px w-6 bg-[#DDD6CC]" />
          <span className="text-sm text-[#6B5E52] tracking-wider">{t('destList')}</span>
        </div>
      </div>
    </section>
  );
}
