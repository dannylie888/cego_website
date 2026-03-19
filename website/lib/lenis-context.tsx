'use client';
import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);

/**
 * Returns a scrollTo helper that uses Lenis when available,
 * falling back to native scrollIntoView.
 *
 * Usage:
 *   const scrollTo = useLenisScroll();
 *   scrollTo('about');   // scrolls to <section id="about">
 */
export function useLenisScroll() {
  const lenis = useContext(LenisContext);

  return (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
