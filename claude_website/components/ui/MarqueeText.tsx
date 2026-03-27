'use client';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function MarqueeText({ text, speed = 30, className = '' }: MarqueeTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
    });
  }, [speed]);

  const repeated = Array(8).fill(text).join(' · ');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-block">
        <span className="inline-block pr-8">{repeated}</span>
        <span className="inline-block pr-8">{repeated}</span>
      </div>
    </div>
  );
}
