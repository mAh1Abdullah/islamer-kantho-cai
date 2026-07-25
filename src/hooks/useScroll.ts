'use client';

import { useEffect, useRef, useState } from 'react';

export interface ScrollState {
  y: number;
  isScrolled: boolean; // past threshold, used to turn Header white
  direction: 'up' | 'down' | null;
}

/** Reports scroll position, a boolean past `threshold`, and scroll direction. */
export function useScroll(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({ y: 0, isScrolled: false, direction: null });
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const direction = y > lastY.current ? 'down' : y < lastY.current ? 'up' : null;
      lastY.current = y;
      setState({ y, isScrolled: y > threshold, direction });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}
