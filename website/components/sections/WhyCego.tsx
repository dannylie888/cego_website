'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const featureData = [
  { 
    key: 'craft', 
    icon: '🏺', 
    bg: '/images/collections/blue-white/bw-01.jpg',
    isDark: true
  },
  { 
    key: 'eco', 
    icon: '🌿', 
    bg: '/images/collections/matt-brown/mb-01.jpg',
    isDark: true
  },
  { 
    key: 'safe', 
    icon: '✅', 
    bg: '/images/collections/dusty-iron/di-01.jpg',
    isDark: true
  },
  { 
    key: 'custom', 
    icon: '🎨', 
    bg: '/images/collections/two-tone/tt-01.jpg',
    isDark: true
  },
  { 
    key: 'export', 
    icon: '🚢', 
    bg: '/images/collections/brush/br-01.jpg',
    isDark: true
  },
  { 
    key: 'durable', 
    icon: '♻️', 
    bg: '/images/collections/bpgp/bpgp-01.jpg',
    isDark: true
  },
];

export default function WhyCego() {
  const t  = useTranslations('whyCego');
  const tf = useTranslations('whyCego.features');
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.whycego-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFeatureClick = (index: number) => {
    if (activeFeature === index) {
      setActiveFeature(null);
      gsap.to(bgRef.current, { opacity: 0, duration: 0.5, ease: 'power3.inOut' });
    } else {
      setActiveFeature(index);
      gsap.to(bgRef.current, { opacity: 1, duration: 0.6, ease: 'power3.inOut' });
    }
  };

  const currentBg = activeFeature !== null ? featureData[activeFeature].bg : '';
  const isDarkBg = activeFeature !== null ? featureData[activeFeature].isDark : true;

  return (
    <section id="why-cego" ref={sectionRef} className="py-32 md:py-40 bg-[#1A1512] relative overflow-hidden min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div ref={bgRef} className="absolute inset-0 opacity-0 transition-opacity duration-500">
        {currentBg && (
          <>
            <Image
              src={currentBg}
              alt="Background"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div className={`absolute inset-0 ${isDarkBg ? 'bg-[#1A1512]/75' : 'bg-[#F4EFE4]/85'}`} />
          </>
        )}
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 relative z-20 w-full">

        {/* Centered header */}
        <div className="text-center mb-20">
          <p className="whycego-title text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-5">{t('label')}</p>
          <h2 className={`whycego-title text-3xl md:text-5xl font-serif mb-5 max-w-3xl mx-auto leading-tight transition-colors duration-500 ${
            !isDarkBg && activeFeature !== null ? 'text-[#1A1512]' : 'text-[#F4EFE4]'
          }`}>
            {t('heading')}
          </h2>
          <div className="whycego-title w-12 h-px bg-[#C8A96E] mx-auto mb-5" />
          <p className={`whycego-title max-w-2xl mx-auto text-sm leading-relaxed transition-colors duration-500 ${
            !isDarkBg && activeFeature !== null ? 'text-[#1A1512]/70' : 'text-[#F4EFE4]/50'
          }`}>
            {t('subheading')}
          </p>
        </div>

        {/* 3-col feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map((feature, idx) => {
            const isActive = activeFeature === idx;
            const textColor = !isDarkBg && activeFeature !== null ? 'text-[#1A1512]' : 'text-[#F4EFE4]';
            const bgColor = !isDarkBg && activeFeature !== null 
              ? 'bg-white/80 backdrop-blur-sm border-[#1A1512]/20' 
              : 'bg-[#F4EFE4]/[0.06] backdrop-blur-sm border-[#F4EFE4]/10';
            
            return (
              <button
                key={feature.key}
                onClick={() => handleFeatureClick(idx)}
                className={`feature-card group text-left p-8 border-2 transition-all duration-500 cursor-pointer
                  ${isActive 
                    ? 'border-[#C8A96E] scale-105 shadow-2xl' 
                    : `${bgColor} hover:border-[#C8A96E]/50 hover:scale-102`
                  }
                `}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className={`text-5xl mb-2 transition-transform duration-500 ${isActive ? 'scale-125' : 'group-hover:scale-110'}`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 transition-colors duration-500 ${
                    isActive ? 'text-[#C8A96E]' : textColor
                  }`}>
                    {tf(`${feature.key}.title`)}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-all duration-500 ${
                    isActive ? `${textColor} opacity-100` : `${textColor} opacity-60 group-hover:opacity-80`
                  }`}>
                    {tf(`${feature.key}.desc`)}
                  </p>
                  <div className={`mt-2 text-xs tracking-widest uppercase transition-opacity duration-500 ${
                    isActive ? 'opacity-100 text-[#C8A96E]' : 'opacity-0 group-hover:opacity-60'
                  }`}>
                    {isActive ? '• Active •' : 'Click to explore'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint text */}
        <p className={`text-center mt-12 text-xs tracking-[0.3em] uppercase transition-colors duration-500 ${
          !isDarkBg && activeFeature !== null ? 'text-[#1A1512]/40' : 'text-[#F4EFE4]/30'
        }`}>
          Click any feature to explore
        </p>
      </div>
    </section>
  );
}
