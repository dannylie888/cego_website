'use client';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({ images, currentIndex, onClose, onPrev, onNext }: LightboxModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
    });
    document.body.style.overflow = 'hidden';
    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, onPrev, onNext]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-[#0F0D0B]/95 flex items-center justify-center p-4">
      <button onClick={handleClose} className="absolute top-6 right-6 text-[#F4EFE4]/60 hover:text-[#F4EFE4] text-4xl leading-none transition-colors">×</button>

      <button onClick={onPrev} className="absolute left-4 md:left-10 text-[#F4EFE4]/60 hover:text-[#C8A96E] text-5xl transition-colors">‹</button>

      <div ref={contentRef} className="relative w-full max-w-4xl aspect-square md:aspect-[4/3]">
        <Image
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>

      <button onClick={onNext} className="absolute right-4 md:right-10 text-[#F4EFE4]/60 hover:text-[#C8A96E] text-5xl transition-colors">›</button>

      <div className="absolute bottom-6 text-[#F4EFE4]/40 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
