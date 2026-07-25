'use client';

import { useEffect, useState, useCallback } from 'react';
import { IconButton } from './IconButton';
import { cn } from '@/utils/cn';

const SHOW_AFTER_PX = 480;

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <IconButton
      aria-label="উপরে ফিরে যান"
      onClick={scrollToTop}
      variant="filled"
      className={cn(
        'fixed bottom-6 right-6 z-40 shadow-md transition-opacity duration-300 ease-calm',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconButton>
  );
}
