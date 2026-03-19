'use client';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { useLenisScroll } from '@/lib/lenis-context';
import LanguageToggle from '@/components/ui/LanguageToggle';

const navLinks = ['home', 'about', 'collections', 'catalog', 'whyCego', 'contact'] as const;

// Map nav keys → section IDs
const sectionIds: Record<string, string> = {
  home: 'home',
  about: 'about',
  collections: 'collections',
  catalog: 'catalog',
  whyCego: 'why-cego',
  contact: 'contact',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const scrollTo = useLenisScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.to(menu, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleNav = (key: string) => {
    setMenuOpen(false);
    scrollTo(sectionIds[key]);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#1A1512]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex flex-col leading-none">
          <span className="text-2xl font-bold tracking-[0.3em] text-[#F4EFE4] font-serif">CEGO</span>
          <span className="text-[9px] tracking-[0.5em] text-[#C8A96E] uppercase">Ceramics</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((key) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className="text-[11px] tracking-widest uppercase text-[#F4EFE4]/75 hover:text-[#C8A96E] transition-colors duration-300"
            >
              {t(key)}
            </button>
          ))}
          <LanguageToggle className="text-[#F4EFE4]/75 hover:text-[#C8A96E]" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-[#F4EFE4] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-[#F4EFE4] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-[#F4EFE4] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div ref={menuRef} className="md:hidden overflow-hidden h-0 opacity-0 bg-[#1A1512]/98">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 flex flex-col gap-6">
          {navLinks.map((key) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className="text-left text-[11px] tracking-[0.3em] uppercase text-[#F4EFE4]/75 hover:text-[#C8A96E] transition-colors duration-300"
            >
              {t(key)}
            </button>
          ))}
          <div className="pt-2 border-t border-[#F4EFE4]/10">
            <LanguageToggle className="text-[#F4EFE4]/60" />
          </div>
        </div>
      </div>
    </nav>
  );
}
