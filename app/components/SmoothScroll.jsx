'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

// Lenis-powered buttery-smooth scrolling for the whole site.
// Mounted once at the root layout; runs only on the client.
//
// Two extra behaviours layered on top of the base Lenis setup:
//   1. Hash-link interception — `<a href="#catalog">` smoothly
//      animates to the target with the same easing as wheel/touch.
//   2. Route-change scroll reset — when the URL pathname changes
//      (Next.js client-side navigation), jump back to y=0 instantly.
//      Without this, Lenis's internal scroll state can preserve the
//      previous page's scroll position and the new page renders
//      "mid-scroll" instead of from the top.
export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Touch devices keep native momentum — Lenis's syntheticscroll on
      // mobile feels laggy vs. iOS native fling. We only smooth wheel.
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      history.replaceState(null, '', href);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top on route change. Runs AFTER the new page has
  // been mounted (Next.js fires this effect post-navigation), so the
  // first frame the user sees is already at y=0.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip if the URL has a hash — that case is handled by the hash
    // click interceptor / native browser anchor scroll.
    if (window.location.hash) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
