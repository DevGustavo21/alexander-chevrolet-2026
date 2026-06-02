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

  // Toggle `html.is-scrolled` so the fixed nav can swap from transparent
  // (over the dark hero) to a blurred white bar (over the rest of the
  // page). Lives in its own effect so it runs even for visitors with
  // prefers-reduced-motion (who skip the Lenis init below). 24px feels
  // like a natural threshold — small enough that any deliberate scroll
  // triggers the swap, large enough that an iOS rubber-band bounce at
  // the top doesn't flicker it.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const html = document.documentElement;
    const SCROLL_THRESHOLD = 24;
    let scrolled = false;
    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const next = y > SCROLL_THRESHOLD;
      if (next === scrolled) return;
      scrolled = next;
      html.classList.toggle('is-scrolled', next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      html.classList.remove('is-scrolled');
    };
  }, []);

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

    // Negative Lenis offset so an anchor target lands ~NAV_GUTTER pixels
    // below the viewport top instead of flush with it — otherwise the
    // section title sits underneath the fixed nav. Matches the CSS
    // scroll-padding-top fallback in globals.css.
    const NAV_GUTTER = 88;

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
      lenis.scrollTo(target, { offset: -NAV_GUTTER, duration: 1.2 });
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
