'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

export default function Contact() {
  const t  = useTranslations('contact');
  const tf = useTranslations('contact.form');
  const ti = useTranslations('contact.info');
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.form-field') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );
      gsap.fromTo('.contact-info-item',
        { x: 25, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);

    const btn = btnRef.current;
    if (btn) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - rect.left - rect.width  / 2) * 0.28,
          y: (e.clientY - rect.top  - rect.height / 2) * 0.28,
          duration: 0.35, ease: 'power2.out',
        });
      };
      const onMouseLeave = () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
      return () => {
        ctx.revert();
        btn.removeEventListener('mousemove', onMouseMove);
        btn.removeEventListener('mouseleave', onMouseLeave);
      };
    }
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  const subjects = ['General Inquiry', 'Custom Order', 'Wholesale / OEM', 'Export Inquiry', 'Other'];

  const inputCls = 'w-full bg-transparent border-b border-[#1A1512]/20 focus:border-[#C8A96E] py-3.5 text-sm text-[#1A1512] placeholder-[#6B5E52]/55 outline-none transition-colors duration-300';

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-[#F4EFE4]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Centred header */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.5em] uppercase text-[#C8A96E] mb-5">{t('label')}</p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A1512] mb-5 max-w-xl mx-auto leading-tight">
            {t('heading')}
          </h2>
          <div className="w-12 h-px bg-[#C8A96E] mx-auto mb-5" />
          <p className="text-[#6B5E52] max-w-md mx-auto text-sm leading-relaxed">{t('subheading')}</p>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {sent ? (
              <div className="text-center py-20 border border-[#C8A96E]/30">
                <p className="text-4xl mb-5 text-[#C8A96E]">✓</p>
                <p className="text-[#1A1512] font-semibold tracking-widest uppercase text-sm mb-2">Message Sent</p>
                <p className="text-[#6B5E52] text-sm">We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text"  placeholder={tf('name')}  required className={inputCls} />
                  <input type="email" placeholder={tf('email')} required className={inputCls} />
                </div>
                <div className="form-field">
                  <input type="tel" placeholder={tf('phone')} className={inputCls} />
                </div>
                <div className="form-field relative">
                  <select className={`${inputCls} cursor-pointer appearance-none pr-6`}>
                    <option value="">{tf('subject')}</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-3.5 text-[#6B5E52]/50 pointer-events-none text-xs">▾</span>
                </div>
                <div className="form-field">
                  <textarea placeholder={tf('message')} rows={5} className={`${inputCls} resize-none`} />
                </div>
                <div className="form-field pt-2">
                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-[#1A1512] text-[#C8A96E]
                               text-[11px] font-semibold tracking-[0.25em] uppercase
                               hover:bg-[#C8A96E] hover:text-[#1A1512] transition-colors duration-300
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <><span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />{tf('sending')}</>
                    ) : tf('send')}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Info */}
          <div className="space-y-7 pt-2">
            {[
              { icon: '📍', label: 'Address', value: ti('address') },
              { icon: '📞', label: 'Phone',   value: ti('phone')   },
              { icon: '📧', label: 'Email',   value: ti('email')   },
              { icon: '💬', label: 'LINE',    value: ti('line')    },
              { icon: '🕐', label: 'Hours',   value: ti('hours')   },
            ].map((item) => (
              <div key={item.label}
                className="contact-info-item flex items-start gap-5 pb-7 border-b border-[#1A1512]/10 last:border-0 last:pb-0">
                <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#C8A96E] mb-1">{item.label}</p>
                  <p className="text-[#1A1512] text-sm leading-relaxed break-words">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
