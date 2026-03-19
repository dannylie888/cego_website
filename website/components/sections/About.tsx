'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.querySelector('.counter-value');
    if (!el) return;
    const numericPart = parseInt(target.replace(/\D/g, ''), 10);
    const suffix = target.replace(/[0-9]/g, '');
    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: numericPart, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        onUpdate: () => { if (el) el.textContent = Math.round(proxy.val) + suffix; },
      });
    });
    return () => ctx.revert();
  }, [target]);

  return (
    <div ref={ref} className="text-center py-10 px-6 border border-[#C8A96E]/25 bg-white/60">
      <div className="text-4xl md:text-5xl font-serif font-bold text-[#C8A96E] mb-2 counter-value">0</div>
      <div className="text-[11px] tracking-widest uppercase text-[#6B5E52]">{label}</div>
    </div>
  );
}

export default function About() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.reveal-line') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(imagesRef.current?.querySelectorAll('.reveal-img') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: imagesRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-[#F4EFE4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Centered section header */}
        <div className="text-center mb-16">
          <p className="reveal-line text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-5">{t('label')}</p>
          <h2 className="reveal-line text-3xl md:text-5xl font-serif text-[#1A1512] leading-tight max-w-2xl mx-auto mb-6">
            {t('heading')}
          </h2>
          <div className="reveal-line w-12 h-px bg-[#C8A96E] mx-auto" />
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start mb-20">
          {/* Text — centered */}
          <div className="text-center flex flex-col items-center">
            <p className="reveal-line text-[#6B5E52] leading-relaxed mb-6 text-base max-w-prose">
              {t('p1')}
            </p>
            <p className="reveal-line text-[#6B5E52] leading-relaxed text-base max-w-prose">
              {t('p2')}
            </p>
          </div>

          {/* Image collage */}
          <div ref={imagesRef} className="grid grid-cols-2 gap-3">
            <div className="reveal-img col-span-2 aspect-[16/9] relative overflow-hidden">
              <Image
                src="/images/collections/blue-white/bw-01.jpg"
                alt="Blue and White ceramic"
                fill className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="reveal-img aspect-square relative overflow-hidden">
              <Image src="/images/collections/matt-brown/mb-01.jpg" alt="Matt brown ceramic" fill
                className="object-cover hover:scale-105 transition-transform duration-700" sizes="25vw" />
            </div>
            <div className="reveal-img aspect-square relative overflow-hidden">
              <Image src="/images/collections/dusty-iron/di-01.jpg" alt="Dusty iron ceramic" fill
                className="object-cover hover:scale-105 transition-transform duration-700" sizes="25vw" />
            </div>
          </div>
        </div>

        {/* Stats — always centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnimatedCounter target={t('stat1.value')} label={t('stat1.label')} />
          <AnimatedCounter target={t('stat2.value')} label={t('stat2.label')} />
          <AnimatedCounter target={t('stat3.value')} label={t('stat3.label')} />
        </div>
      </div>
    </section>
  );
}
