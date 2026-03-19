'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const featureIcons: Record<string, string> = {
  craft:   '🏺',
  eco:     '🌿',
  safe:    '✅',
  custom:  '🎨',
  export:  '🚢',
  durable: '♻️',
};
const featureKeys = ['craft', 'eco', 'safe', 'custom', 'export', 'durable'];

export default function WhyCego() {
  const t  = useTranslations('whyCego');
  const tf = useTranslations('whyCego.features');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.whycego-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      const rows = sectionRef.current?.querySelectorAll('.feature-row');
      rows?.forEach((row, i) => {
        gsap.fromTo(row,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 82%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-cego" ref={sectionRef} className="py-24 md:py-32 bg-[#1A1512] relative overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Centred header */}
        <div className="text-center mb-16">
          <p className="whycego-title text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-5">{t('label')}</p>
          <h2 className="whycego-title text-3xl md:text-5xl font-serif text-[#F4EFE4] mb-5 max-w-2xl mx-auto leading-tight">
            {t('heading')}
          </h2>
          <div className="whycego-title w-12 h-px bg-[#C8A96E] mx-auto mb-5" />
          <p className="whycego-title text-[#F4EFE4]/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* 2-col feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureKeys.map((key) => (
            <div
              key={key}
              className="feature-row group flex gap-5 p-6 md:p-8 border border-[#F4EFE4]/10
                         hover:border-[#C8A96E]/50 transition-all duration-500
                         bg-[#F4EFE4]/[0.04] hover:bg-[#F4EFE4]/[0.07]"
            >
              <span className="text-3xl flex-shrink-0 mt-0.5">{featureIcons[key]}</span>
              <div>
                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2
                                group-hover:text-[#F4EFE4] transition-colors duration-300">
                  {tf(`${key}.title`)}
                </h3>
                <p className="text-[#F4EFE4]/50 text-sm leading-relaxed">
                  {tf(`${key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
