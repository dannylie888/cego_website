'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import LanguageToggle from '@/components/ui/LanguageToggle';

const navItems = [
  { key: 'collections', href: '/collections' },
  { key: 'catalog',     href: '/catalog'     },
  { key: 'custom',      href: '/custom'      },
  { key: 'about',       href: '/about'       },
  { key: 'contact',     href: '/contact'     },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const lp = (href: string) => `/${locale}${href}`;
  const isActive = (href: string) => {
    const full = lp(href);
    return pathname === full || pathname.startsWith(full + '/');
  };

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (menuOpen) {
      gsap.to(drawer, { x: 0, duration: 0.45, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(drawer, { x: '100%', duration: 0.35, ease: 'power3.in' });
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${elevated ? 'bg-[#F5F0E8]/96 backdrop-blur-sm border-b border-[#DDD6CC]' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href={lp('/')} className="flex items-baseline gap-2.5 group">
            <span className="font-serif text-xl font-semibold tracking-[0.18em] text-[#1A1512] group-hover:text-[#B8914F] transition-colors duration-300">CEGO</span>
            <span className="text-[9px] font-sans tracking-[0.5em] uppercase text-[#B8914F] font-light">Ceramics</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(({ key, href }) => (
              <Link key={key} href={lp(href)}
                className={`relative text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-[#B8914F] after:transition-all after:duration-300 ${
                  isActive(href)
                    ? 'text-[#B8914F] after:w-full'
                    : 'text-[#6B5E52] hover:text-[#1A1512] after:w-0 hover:after:w-full'
                }`}>
                {t(key)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <LanguageToggle className="hidden md:flex text-[#6B5E52] hover:text-[#1A1512]" />
            {/* Mobile toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8">
              <span className={`h-px w-full bg-[#1A1512] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`h-px bg-[#1A1512] transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-full'}`} />
              <span className={`h-px w-full bg-[#1A1512] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div ref={drawerRef} style={{ transform: 'translateX(100%)' }}
        className="fixed inset-y-0 right-0 z-[60] w-80 bg-[#FAF7F2] border-l border-[#DDD6CC] flex flex-col p-8 gap-8">
        <div className="flex items-center justify-between pt-2">
          <span className="font-serif text-lg font-semibold tracking-widest text-[#1A1512]">CEGO</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close" className="text-[#6B5E52] hover:text-[#1A1512] text-2xl leading-none">×</button>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ key, href }) => (
            <Link key={key} href={lp(href)}
              className={`py-4 border-b border-[#DDD6CC] text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${isActive(href) ? 'text-[#B8914F]' : 'text-[#6B5E52] hover:text-[#1A1512]'}`}>
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <LanguageToggle className="text-[#6B5E52]" />
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[55] bg-[#1A1512]/30 backdrop-blur-[1px]" />}
    </>
  );
}
