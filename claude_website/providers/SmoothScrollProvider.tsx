'use client';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from '@/lib/lenis-context';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });

    instance.on('scroll', ScrollTrigger.update);

    const rafCb = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(rafCb);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
