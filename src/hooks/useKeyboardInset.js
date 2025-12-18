"use client";

import { useEffect, useRef, useState } from 'react';

// Returns keyboard inset height based on visualViewport with guardrails for iOS flicker.
export const useKeyboardInset = () => {
  const [inset, setInset] = useState(0);
  const lastNonZeroRef = useRef(0);
  const resetTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const applyInset = (next) => {
      const clamped = Math.max(0, Math.round(next));
      if (clamped > 0) {
        lastNonZeroRef.current = clamped;
        if (resetTimer.current) {
          clearTimeout(resetTimer.current);
          resetTimer.current = null;
        }
        setInset(clamped);
      } else {
        const fallback = lastNonZeroRef.current;
        if (fallback > 0) {
          if (!resetTimer.current) {
            resetTimer.current = setTimeout(() => {
              lastNonZeroRef.current = 0;
              setInset(0);
              resetTimer.current = null;
            }, 180);
          }
          setInset(fallback);
        } else {
          setInset(0);
        }
      }
    };

    const computeInset = () => {
      const vv = window.visualViewport;
      if (!vv) {
        applyInset(0);
        return;
      }
      const layoutH =
        document.documentElement?.clientHeight || window.innerHeight;
      const raw = layoutH - vv.height - vv.offsetTop;
      applyInset(raw);
    };

    const onFocus = () => {
      requestAnimationFrame(computeInset);
    };

    computeInset();
    window.visualViewport.addEventListener('resize', computeInset);
    window.visualViewport.addEventListener('scroll', computeInset);
    window.addEventListener('orientationchange', computeInset);
    window.addEventListener('focusin', onFocus);
    window.addEventListener('focusout', onFocus);

    return () => {
      window.visualViewport.removeEventListener('resize', computeInset);
      window.visualViewport.removeEventListener('scroll', computeInset);
      window.removeEventListener('orientationchange', computeInset);
      window.removeEventListener('focusin', onFocus);
      window.removeEventListener('focusout', onFocus);
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
    };
  }, []);

  return inset;
};
