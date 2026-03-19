'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { useLenisScroll } from '@/lib/lenis-context';

export default function Hero() {
  const t = useTranslations('hero');
  const scrollTo = useLenisScroll();
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Headline word reveal
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subheadline
      gsap.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
      );

      // CTAs
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.3 }
      );

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut',
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline1Words = t('headline1').split(' ');
  const headline2Words = t('headline2').split(' ');

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1512]"
    >
      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Cego Ceramics hero"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1512]/40 via-transparent to-[#1A1512]/80 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-6 font-light">
          Premium Ceramic Tableware
        </p>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#F4EFE4] leading-tight mb-6"
        >
          <span className="block">
            {headline1Words.map((word, i) => (
              <span key={i} className="word inline-block mr-3">{word}</span>
            ))}
          </span>
          <span className="block">
            {headline2Words.map((word, i) => (
              <span key={i} className="word inline-block mr-3 text-[#C8A96E]">{word}</span>
            ))}
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-base md:text-lg text-[#F4EFE4]/70 max-w-xl mx-auto mb-12 font-light leading-relaxed px-4"
        >
          {t('subheadline')}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('collections')}
            className="w-full sm:w-auto px-10 py-4 bg-[#C8A96E] text-[#1A1512] text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-[#F4EFE4] transition-colors duration-300"
          >
            {t('cta1')}
          </button>
          <button
            onClick={() => scrollTo('catalog')}
            className="w-full sm:w-auto px-10 py-4 border border-[#F4EFE4]/40 text-[#F4EFE4] text-[11px] font-bold tracking-[0.3em] uppercase hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors duration-300"
          >
            {t('cta2')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#F4EFE4]/50"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">{t('scroll')}</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C8A96E] to-transparent" />
      </div>
    </section>
  );
}
