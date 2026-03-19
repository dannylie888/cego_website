'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'th' : 'en';
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    startTransition(() => {
      router.push(segments.join('/') || `/${nextLocale}`);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={`relative inline-flex items-center gap-1 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-70 ${className}`}
    >
      <span className={locale === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
      <span className="opacity-30">/</span>
      <span className={locale === 'th' ? 'opacity-100' : 'opacity-40'}>TH</span>
    </button>
  );
}
