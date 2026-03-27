'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

export default function ContactCTA() {
  const t = useTranslations('contactCTA');
  const tf = useTranslations('contactCTA.form');
  const ti = useTranslations('contactCTA.info');
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.enter') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'home-cta' }),
      });
    } catch {}
    setSending(false);
    setSent(true);
  };

  const inputCls = 'w-full bg-transparent border-b border-[#DDD6CC] focus:border-[#B8914F] py-3 text-sm text-[#1A1512] placeholder-[#6B5E52]/60 outline-none transition-colors duration-300';

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] border-t border-[#DDD6CC]">
      {/* Label bar */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
        <span className="enter text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('label')}</span>
        <span className="enter flex-1 h-px bg-[#DDD6CC]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24 items-start">

          {/* Form side */}
          <div>
            <h2 className="enter font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1512] leading-tight mb-4">
              {t('heading')}
            </h2>
            <span className="enter block w-8 h-px bg-[#B8914F] mb-6" />
            <p className="enter text-[#6B5E52] leading-[1.8] max-w-md mb-10">{t('subheading')}</p>

            <form ref={formRef} onSubmit={handleSubmit}>
              {sent ? (
                <div className="py-16 border border-[#DDD6CC] flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-3xl text-[#B8914F] mb-4">◯</span>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-[#1A1512] mb-2">{tf('successTitle')}</p>
                  <p className="text-sm text-[#6B5E52]">{tf('success')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="enter grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" placeholder={tf('name')} required className={inputCls} />
                    <input type="email" placeholder={tf('email')} required className={inputCls} />
                  </div>
                  <div className="enter">
                    <textarea placeholder={tf('message')} rows={4} className={`${inputCls} resize-none`} />
                  </div>
                  <div className="enter pt-1">
                    <button type="submit" disabled={sending}
                      className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300 disabled:opacity-40">
                      {sending
                        ? <><span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />{tf('sending')}</>
                        : <>{tf('send')} <span className="text-base">→</span></>
                      }
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Info sidebar */}
          <div className="space-y-0 border-t border-[#DDD6CC]">
            {[
              { label: 'Address', value: ti('address') },
              { label: 'Phone',   value: ti('phone')   },
              { label: 'Email',   value: ti('email')   },
              { label: 'LINE',    value: ti('line')    },
              { label: 'Hours',   value: ti('hours')   },
            ].map((item) => (
              <div key={item.label} className="enter py-5 border-b border-[#DDD6CC]">
                <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8914F] mb-1.5">{item.label}</p>
                <p className="text-sm text-[#1A1512] leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
