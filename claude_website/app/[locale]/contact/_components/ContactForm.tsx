'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const inquiryTypeKeys = ['general', 'catalog', 'wholesale', 'oem', 'export'] as const;

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const tf = useTranslations('contactPage.form');
  const ti = useTranslations('contactPage.info');
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>(() => searchParams.get('type') ?? '');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) setInquiryType(type);
  }, [searchParams]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.reveal') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
    } catch {}
    setSending(false);
    setSent(true);
  };

  const inputCls = 'w-full bg-transparent border-b border-[#DDD6CC] focus:border-[#B8914F] py-3 text-sm text-[#1A1512] placeholder-[#6B5E52]/60 outline-none transition-colors duration-300';

  return (
    <div ref={sectionRef} className="max-w-[1440px] mx-auto px-8 sm:px-12 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-start">

        {/* Form */}
        <div className="reveal">
          {sent ? (
            <div className="py-20 border border-[#DDD6CC] flex flex-col items-center justify-center text-center">
              <span className="font-serif text-3xl text-[#B8914F] mb-5">◯</span>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#1A1512] mb-2">{tf('successTitle')}</p>
              <p className="text-sm text-[#6B5E52]">{tf('successDesc')}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="name" type="text" placeholder={tf('name')} required className={inputCls} />
                <input name="email" type="email" placeholder={tf('email')} required className={inputCls} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="phone" type="tel" placeholder={tf('phone')} className={inputCls} />
                <input name="company" type="text" placeholder={tf('company')} className={inputCls} />
              </div>
              <div className="relative">
                <select name="inquiryType" value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className={`${inputCls} cursor-pointer appearance-none pr-6`}>
                  <option value="">{tf('inquiryType')}</option>
                  {inquiryTypeKeys.map((key) => (
                    <option key={key} value={key}>{tf(`inquiryTypes.${key}`)}</option>
                  ))}
                </select>
                <span className="absolute right-0 bottom-3 text-[#6B5E52]/50 pointer-events-none text-xs">▾</span>
              </div>
              <textarea name="message" placeholder={tf('message')} rows={6} required
                className={`${inputCls} resize-none`} />
              <div className="pt-2">
                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300 disabled:opacity-40">
                  {sending ? (
                    <><span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />{tf('sending')}</>
                  ) : (
                    <>{tf('submit')} <span className="text-base">→</span></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact info sidebar */}
        <div className="reveal">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F] mb-6">{ti('heading')}</p>
          <div className="border-t border-[#DDD6CC]">
            {[
              { label: 'Address',  value: ti('address')  },
              { label: 'Phone',    value: ti('phone')    },
              { label: 'Email',    value: ti('email')    },
              { label: 'LINE',     value: ti('line')     },
              { label: 'WhatsApp', value: ti('whatsapp') },
              { label: 'Hours',    value: ti('hours')    },
            ].map((item) => (
              <div key={item.label} className="py-5 border-b border-[#DDD6CC]">
                <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8914F] mb-1.5">{item.label}</p>
                <p className="text-sm text-[#1A1512] leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-8 aspect-[4/3] bg-[#EDE8DF] border border-[#DDD6CC] flex items-center justify-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B5E52]/50">Map — Bangkok, Thailand</p>
          </div>
        </div>

      </div>
    </div>
  );
}
