'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const leftRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Line grows in
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, transformOrigin: 'left' }, 0);

      // Left content staggers in
      tl.fromTo(leftRef.current?.querySelectorAll('.h-enter') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, 0.2
      );

      // Image slides in from right
      tl.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut' }, 0.1
      );

      // Subtle parallax on image
      gsap.to(imgRef.current?.querySelector('img') ?? null, {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: leftRef.current?.closest('section'), start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-[#F5F0E8] overflow-hidden">
      {/* Top rule with label */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-8 sm:px-12 pt-20 pb-4 flex items-center gap-6">
        <span ref={lineRef} className="block flex-1 h-px bg-[#DDD6CC] origin-left" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F] font-light whitespace-nowrap">{t('label')}</span>
      </div>

      {/* Split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55%_45%]">

        {/* LEFT — content */}
        <div ref={leftRef} className="flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-0 max-w-[1440px]">
          <div className="max-w-xl">
            <h1 className="h-enter font-serif text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.95] tracking-tight text-[#1A1512] mb-8">
              <em className="not-italic block">{t('headline1')}</em>
              <span className="block text-[#B8914F]">{t('headline2')}</span>
            </h1>

            <p className="h-enter text-[#6B5E52] text-base leading-relaxed max-w-sm mb-10">
              {t('subheadline')}
            </p>

            <div className="h-enter flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/collections`}
                data-track="hero-collections"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1512] text-[#F5F0E8] text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#B8914F] transition-colors duration-400"
              >
                {t('cta1')}
              </Link>
              <Link
                href={`/${locale}/contact?type=catalog`}
                data-track="hero-catalog"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1A1512]/30 text-[#1A1512] text-[11px] tracking-[0.3em] uppercase font-medium hover:border-[#B8914F] hover:text-[#B8914F] transition-colors duration-300"
              >
                {t('cta2')}
              </Link>
            </div>

            {/* Scroll cue */}
            <div className="h-enter flex items-center gap-4 mt-14 text-[#6B5E52]/60">
              <span className="text-[10px] tracking-[0.4em] uppercase">{t('scroll')}</span>
              <span className="block w-12 h-px bg-[#DDD6CC]" />
            </div>
          </div>
        </div>

        {/* RIGHT — hero image */}
        <div ref={imgRef} className="relative h-72 lg:h-auto overflow-hidden">
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="Cego Ceramics tableware"
            fill
            className="object-cover scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F5F0E8]/10" />

          {/* Collection count badge */}
          <div className="absolute bottom-8 left-8 bg-[#F5F0E8]/90 backdrop-blur-sm px-5 py-3 border border-[#DDD6CC]">
            <p className="font-serif text-2xl font-light text-[#1A1512] leading-none">8</p>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8914F] mt-1">Collections</p>
          </div>
        </div>
      </div>
    </section>
  );
}
