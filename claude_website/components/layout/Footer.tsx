'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const lp = (href: string) => `/${locale}${href}`;

  const links = [
    { key: 'collections', href: '/collections' },
    { key: 'catalog',     href: '/catalog'     },
    { key: 'custom',      href: '/custom'      },
    { key: 'about',       href: '/about'       },
    { key: 'contact',     href: '/contact'     },
  ];

  return (
    <footer className="bg-[#1A1512] text-[#F5F0E8]/60">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href={lp('/')} className="inline-block mb-6">
              <div className="font-serif text-2xl font-semibold tracking-[0.2em] text-[#F5F0E8]">CEGO</div>
              <div className="text-[9px] tracking-[0.55em] text-[#B8914F] uppercase mt-0.5">Ceramics</div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">{t('tagline')}</p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8914F] mb-5">{t('nav.heading')}</p>
            <ul className="space-y-2.5">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <Link href={lp(href)} className="text-sm hover:text-[#F5F0E8] transition-colors duration-300">
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8914F] mb-5">{t('connect.heading')}</p>
            <ul className="space-y-2.5 text-sm mb-7">
              <li>hello@cego-ceramics.com</li>
              <li>+66 2 123 4567</li>
              <li>LINE: @cego.ceramics</li>
            </ul>
            <LanguageToggle className="text-[#F5F0E8]/50 hover:text-[#F5F0E8]" />
          </div>
        </div>

        <div className="border-t border-[#F5F0E8]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#F5F0E8]/35">
          <span>{t('copyright')}</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-[#F5F0E8]/60 transition-colors">{t('links.privacy')}</span>
            <span className="cursor-pointer hover:text-[#F5F0E8]/60 transition-colors">{t('links.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
