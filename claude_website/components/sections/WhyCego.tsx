'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const features = ['craft', 'eco', 'safe', 'custom', 'export', 'durable'] as const;

// Clean geometric glyphs — no emojis
const glyphs: Record<string, string> = {
  craft:   '◯',
  eco:     '△',
  safe:    '□',
  custom:  '◇',
  export:  '×',
  durable: '▽',
};

export default function WhyCego() {
  const t = useTranslations('whyCego');
  const tf = useTranslations('whyCego.features');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.hdr') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(sectionRef.current?.querySelectorAll('.card') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#1A1512]">
      {/* Top rule */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-5 border-b border-[#F5F0E8]/10 flex items-center gap-4 pb-5">
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
        <span className="flex-1 h-px bg-[#F5F0E8]/10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28">
        {/* Heading */}
        <div className="max-w-2xl mb-16">
          <h2 className="hdr font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#F5F0E8] leading-tight mb-6">
            {t('heading')}
          </h2>
          <p className="hdr text-[#F5F0E8]/50 leading-relaxed">{t('subheading')}</p>
        </div>

        {/* Feature grid — 3 cols, clean bordered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/10">
          {features.map((key) => (
            <div key={key} className="card group bg-[#1A1512] p-8 hover:bg-[#221C18] transition-colors duration-400">
              <div className="flex items-start gap-4 mb-5">
                <span className="font-serif text-2xl text-[#B8914F] opacity-60 group-hover:opacity-100 transition-opacity duration-300 leading-none mt-0.5">
                  {glyphs[key]}
                </span>
                <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#F5F0E8] font-medium leading-relaxed pt-1">
                  {tf(`${key}.title`)}
                </h3>
              </div>
              <p className="text-sm text-[#F5F0E8]/50 leading-[1.8] group-hover:text-[#F5F0E8]/70 transition-colors duration-300">
                {tf(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
