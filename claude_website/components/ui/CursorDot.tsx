'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); xRing(e.clientX); yRing(e.clientY); };

    const onEnter = () => { gsap.to(ring, { scale: 2.5, opacity: 0.6, duration: 0.3 }); gsap.to(dot, { scale: 0, duration: 0.2 }); };
    const onLeave = () => { gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 }); gsap.to(dot, { scale: 1, duration: 0.2 }); };

    window.addEventListener('mousemove', moveCursor);
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-[#C8A96E] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 border border-[#C8A96E] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
    </>
  );
}
