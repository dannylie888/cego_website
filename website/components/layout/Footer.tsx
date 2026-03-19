'use client';
import { useTranslations } from 'next-intl';
import { useLenisScroll } from '@/lib/lenis-context';
import LanguageToggle from '@/components/ui/LanguageToggle';

const sectionIds: Record<string, string> = {
  home: 'home', about: 'about', collections: 'collections',
  catalog: 'catalog', whyCego: 'why-cego', contact: 'contact',
};

export default function Footer() {
  const t  = useTranslations('footer');
  const tn = useTranslations('nav');
  const scrollTo = useLenisScroll();
  const navLinks = ['home', 'about', 'collections', 'catalog', 'whyCego', 'contact'] as const;

  return (
    <footer className="bg-[#0F0D0B] text-[#F4EFE4]/55 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <div className="text-3xl font-bold tracking-[0.3em] text-[#F4EFE4] font-serif">CEGO</div>
              <div className="text-[9px] tracking-[0.5em] text-[#C8A96E] uppercase">Ceramics</div>
            </div>
            <p className="text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((key) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(sectionIds[key])}
                    className="text-sm hover:text-[#F4EFE4] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {tn(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Lang */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96E] mb-6">Connect</h4>
            <ul className="space-y-3 text-sm mb-8">
              <li>📧 hello@cego-ceramics.com</li>
              <li>📞 +66 2 123 4567</li>
              <li>💬 LINE: @cego.ceramics</li>
            </ul>
            <LanguageToggle className="text-[#F4EFE4]/55" />
          </div>
        </div>

        <div className="border-t border-[#F4EFE4]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
          <span>{t('copyright')}</span>
          <div className="flex gap-6">
            <button className="hover:text-[#F4EFE4] transition-colors">{t('links.privacy')}</button>
            <button className="hover:text-[#F4EFE4] transition-colors">{t('links.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
