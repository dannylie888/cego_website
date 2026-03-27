'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.querySelector('.val');
    if (!el) return;
    const num = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/[0-9]/g, '');
    const proxy = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        v: num, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        onUpdate: () => { if (el) el.textContent = Math.round(proxy.v) + suffix; },
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={ref} className="py-8 px-6 text-center">
      <p className="font-serif text-4xl md:text-5xl font-light text-[#1A1512] leading-none mb-2 val">0</p>
      <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8914F]">{label}</p>
    </div>
  );
}

export default function BrandIntro() {
  const t = useTranslations('brandIntro');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.reveal') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FAF7F2] border-y border-[#DDD6CC]">
      {/* Label bar */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
        <span className="flex-1 h-px bg-[#DDD6CC]" />
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Heading side */}
        <div>
          <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#1A1512] mb-8">
            {t('heading')}
          </h2>
          <span className="reveal block w-8 h-px bg-[#B8914F] mb-8" />
          <p className="reveal text-[#6B5E52] leading-[1.8] mb-5">{t('p1')}</p>
          <p className="reveal text-[#6B5E52] leading-[1.8]">{t('p2')}</p>
        </div>

        {/* Stats side */}
        <div className="border border-[#DDD6CC] divide-y divide-[#DDD6CC]">
          <Stat value={t('stat1.value')} label={t('stat1.label')} />
          <Stat value={t('stat2.value')} label={t('stat2.label')} />
          <Stat value={t('stat3.value')} label={t('stat3.label')} />
        </div>
      </div>
    </section>
  );
}
