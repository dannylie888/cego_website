import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'customPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function CustomPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'customPage' });

  const whatWeItems = ['shapes', 'glazes', 'branding', 'packaging'] as const;
  const steps = [0, 1, 2, 3];

  return (
    <div className="bg-[#FAF7F2] pt-[72px]">

      {/* Ruled header */}
      <div className="border-b border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('hero.label')}</span>
          <span className="flex-1 h-px bg-[#DDD6CC]" />
        </div>
      </div>

      {/* Hero — split screen */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1512] leading-tight mb-4 max-w-lg">
            {t('hero.heading')}
          </h1>
          <span className="block w-8 h-px bg-[#B8914F] mb-6" />
          <p className="text-[#6B5E52] leading-[1.85] max-w-md mb-10">{t('hero.subheading')}</p>
          <Link href={`/${locale}/contact?type=oem`} data-track="custom-hero-cta"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300">
            {t('cta.button')} <span className="text-base">→</span>
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/collections/bpgp/bpgp-01.jpg" alt="Custom OEM ceramics" fill
            className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute top-5 left-5 bg-[#FAF7F2]/90 px-4 py-2 border border-[#DDD6CC]">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#B8914F]">OEM Available</span>
          </div>
        </div>
      </div>

      {/* What we can do — gap-px grid */}
      <div className="border-y border-[#DDD6CC] bg-[#F5F0E8]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#DDD6CC] flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('whatWe.label')}</span>
          <span className="flex-1 h-px bg-[#DDD6CC]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B5E52]">{t('whatWe.heading')}</span>
        </div>
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDD6CC]">
            {whatWeItems.map((key, i) => {
              const glyphs = ['◯', '△', '□', '◇'];
              return (
                <div key={key} className="bg-[#F5F0E8] p-8 hover:bg-[#EDE8DF] transition-colors duration-300 group">
                  <span className="font-serif text-2xl text-[#B8914F] opacity-50 group-hover:opacity-100 transition-opacity duration-300 block mb-5 leading-none">{glyphs[i]}</span>
                  <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#1A1512] font-medium mb-3">
                    {t(`whatWe.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[#6B5E52] leading-[1.8]">{t(`whatWe.items.${key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process — numbered steps on dark bg */}
      <div className="bg-[#1A1512]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 border-b border-[#F5F0E8]/10 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F]">{t('process.label')}</span>
          <span className="flex-1 h-px bg-[#F5F0E8]/10" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#F5F0E8]/40">{t('process.heading')}</span>
        </div>
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5F0E8]/10">
            {steps.map((idx) => {
              const step = t.raw(`process.steps.${idx}`) as { num: string; title: string; desc: string };
              return (
                <div key={idx} className="bg-[#1A1512] p-8 hover:bg-[#221C18] transition-colors duration-300">
                  <div className="font-serif text-5xl text-[#B8914F]/20 mb-5 leading-none">{step.num}</div>
                  <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#F5F0E8] font-medium mb-3">{step.title}</h3>
                  <p className="text-sm text-[#F5F0E8]/50 leading-[1.8]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export note — image + text */}
      <div className="border-y border-[#DDD6CC]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/images/collections/dusty-iron/di-01.jpg" alt="Export ready ceramics" fill
              className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#B8914F] mb-4">{t('export.label')}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1A1512] leading-tight mb-4">
              {t('export.heading')}
            </h2>
            <span className="block w-8 h-px bg-[#B8914F] mb-6" />
            <p className="text-[#6B5E52] leading-[1.85] mb-8">{t('export.desc')}</p>
            <div className="space-y-2 mb-10">
              <p className="text-[11px] tracking-wide text-[#6B5E52] border-b border-[#DDD6CC] pb-2">{t('export.minOrder')}</p>
              <p className="text-[11px] tracking-wide text-[#6B5E52]">{t('export.leadTime')}</p>
            </div>
            <Link href={`/${locale}/contact?type=oem`} data-track="custom-export-cta"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#1A1512] border-b border-[#1A1512] pb-0.5 hover:text-[#B8914F] hover:border-[#B8914F] transition-colors duration-300">
              {t('cta.button')} <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
