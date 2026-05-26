'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { VEHICLES } from '@/lib/vehicles';
import { waUrl, waVehicleMessage } from '@/lib/contact';
import Logo from './Logo';

// Curated hero lineup — the premium / largest / most expensive models
// (Silverado, Tahoe, Suburban) so the landing page leads with the
// flagship presence. Order here = order in the rail. To swap a slide
// just rearrange this array or replace an id.
const HERO_IDS = [
  'suburban',
  'tahoe-hc',
  'tahoe-z71',
  'silverado-hc',
  'silverado-rst',
];
const HERO_VEHICLES = HERO_IDS.map((id) =>
  VEHICLES.find((v) => v.id === id)
).filter((v) => v && v.imagen);
const TOTAL = HERO_VEHICLES.length;
const AUTOPLAY_MS = 5500;
const GROW_MS = 720;        // duration of the radial BG reveal
const BG_FADE_MS = 700;     // matches the static .hero-bg fade-in keyframe
const FLIP_MS = 460;

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  // While a card is being handed off to the BG the slider freezes so two
  // activations can't pile up mid-animation.
  const [growingIdx, setGrowingIdx] = useState(null);
  // Params for the radial BG reveal overlay during a transition.
  // { toIdx, x, y, r } — clip-path: circle(<r> at <x> <y>) animates from
  // radius 0 to the recorded r, revealing the incoming vehicle photo.
  const [revealParams, setRevealParams] = useState(null);
  // Refs keyed by vehicle id so they survive DOM additions/removals
  // (the active card is unmounted entirely each render, so index-keyed
  // refs would shift around).
  const thumbRefs = useRef({});
  // Snapshot of each card's layout-left position from the previous
  // render. Used to FLIP-animate the rail when a card is unmounted /
  // remounted and the remaining cards reflow to fill the gap.
  const prevOffsets = useRef({});
  const current = HERO_VEHICLES[idx] || HERO_VEHICLES[0];

  const setThumbRef = (id) => (el) => {
    if (el) thumbRefs.current[id] = el;
    else delete thumbRefs.current[id];
  };

  // FLIP reorder animation. After every render we measure each rendered
  // card's offsetLeft (layout position — unaffected by any in-flight
  // transform) and compare it against the previous render's snapshot.
  // If the card moved we synchronously snap it to its OLD visual
  // position via an inverse translateX, then on the next animation
  // frame transition the transform back to identity so it slides to
  // its new layout position. The requestAnimationFrame split is
  // critical: changing transition + transform in the same synchronous
  // block can be coalesced by the browser and skip the animation,
  // leaving the card frozen at the inverted position (which would look
  // exactly like a stuck empty slot in the rail).
  useLayoutEffect(() => {
    const newOffsets = {};
    Object.entries(thumbRefs.current).forEach(([id, el]) => {
      if (el) newOffsets[id] = el.offsetLeft;
    });
    Object.entries(newOffsets).forEach(([id, newLeft]) => {
      const el = thumbRefs.current[id];
      if (!el) return;
      const oldLeft = prevOffsets.current[id];
      if (oldLeft === undefined) {
        // Newly-mounted card (e.g. the previously-active vehicle
        // returning to the rail) — fade it in so it doesn't pop.
        el.style.transition = 'none';
        el.style.opacity = '0';
        requestAnimationFrame(() => {
          el.style.transition = `opacity ${FLIP_MS}ms ease`;
          el.style.opacity = '1';
        });
        return;
      }
      const dx = oldLeft - newLeft;
      if (Math.abs(dx) < 1) {
        // Card didn't move — make sure no stale transform is left over.
        el.style.transition = '';
        el.style.transform = '';
        return;
      }
      // 1. First: snap to old visual position with no transition.
      el.style.transition = 'none';
      el.style.transform = `translateX(${dx}px)`;
      // 2. Last + Invert committed — schedule the Play on the next frame.
      requestAnimationFrame(() => {
        el.style.transition = `transform ${FLIP_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
        el.style.transform = '';
      });
    });
    prevOffsets.current = newOffsets;
  });

  // Activation = "the card hands off to the BG". Instead of scaling the
  // card 20× and clipping it (which pixelated the photo and read as
  // grotesque), we now run two animations in parallel:
  //
  //   1. A separate overlay `.hero-bg-reveal` holds the INCOMING photo
  //      at full viewport size with the correct framing, and animates
  //      `clip-path: circle()` from radius 0 (at the card's center) out
  //      to the farthest viewport corner. No scaling of the photo, so
  //      no pixelation — just a clean radial wipe in.
  //   2. The card itself fades out + dips its scale slightly — a soft
  //      "transferred its energy to the BG" exit.
  //
  // After the radial wipe completes we swap `idx` (the static BG now
  // shows the new vehicle) but keep the reveal overlay rendered for one
  // more BG_FADE_MS so the static BG has time to fade in underneath.
  // When the overlay is finally removed there's no flash because the
  // static BG beneath already matches.
  const activate = (i) => {
    if (i === idx || growingIdx !== null || i < 0 || i >= TOTAL) return;
    const v = HERO_VEHICLES[i];
    const btn = thumbRefs.current[v.id];
    if (btn && typeof window !== 'undefined') {
      const rect = btn.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Farthest viewport corner from the card's center — radius the
      // clip-path circle needs to reach to cover the screen.
      const maxR = Math.hypot(
        Math.max(cx, vw - cx),
        Math.max(cy, vh - cy)
      );
      setRevealParams({ toIdx: i, x: cx, y: cy, r: maxR });
    }
    setGrowingIdx(i);
    window.setTimeout(() => {
      setIdx(i);
      setGrowingIdx(null);
    }, GROW_MS);
    window.setTimeout(() => {
      setRevealParams(null);
    }, GROW_MS + BG_FADE_MS);
  };

  const goPrev = () => activate((idx - 1 + TOTAL) % TOTAL);
  const goNext = () => activate((idx + 1) % TOTAL);

  // Autoplay — re-armed each time the active vehicle (or pause / grow
  // state) changes so manual clicks reset the clock instead of yanking
  // the user forward immediately after they've interacted.
  useEffect(() => {
    if (paused || TOTAL <= 1 || growingIdx !== null) return undefined;
    const id = window.setTimeout(() => {
      activate((idx + 1) % TOTAL);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, paused, growingIdx]);

  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-bg" key={'hero-bg-' + current.id}>
        <img
          src={current.imagen}
          alt={current.nombre}
          className="hero-bg-img"
        />
      </div>
      {revealParams && HERO_VEHICLES[revealParams.toIdx] && (
        <div
          className="hero-bg-reveal"
          style={{
            '--rx': `${revealParams.x}px`,
            '--ry': `${revealParams.y}px`,
            '--rr': `${revealParams.r}px`,
            '--reveal-ms': `${GROW_MS}ms`,
          }}
        >
          <img
            src={HERO_VEHICLES[revealParams.toIdx].imagen}
            alt={HERO_VEHICLES[revealParams.toIdx].nombre}
            className="hero-bg-img"
          />
        </div>
      )}
      <div className="hero-overlay" />

      <nav className="nav">
        <div className="nav-left">
          <a href="#about">Sobre mí</a>
          <a href="#process">Cómo trabajo</a>
        </div>
        <div className="nav-center">
          <div className="nav-logo">
            <Logo />
          </div>
        </div>
        <div className="nav-right">
          <a href="#catalog">Catálogo</a>
          <a href="#contact">Contacto</a>
        </div>
      </nav>

      <div className="hero-stage">
        <div className="hero-content" key={'hero-content-' + current.id}>
          <div className="hero-label">{current.categoriaLabel}</div>
          <h1 className="hero-title">{current.nombre}</h1>
          <p className="hero-desc">{current.tagline}.</p>
          <a
            href={waUrl(waVehicleMessage(current.nombre))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill hero-cta"
          >
            Cotizar este modelo
            <span className="btn-pill-icon">↗</span>
          </a>
        </div>

        <div
          className="hero-thumbs"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {HERO_VEHICLES.map((v, i) => {
            const isActive = i === idx;
            const isGrowing = i === growingIdx;
            // The active vehicle (when not mid-grow) is fully unmounted
            // from the rail so the remaining cards genuinely reflow —
            // no zero-width slot, no orphan gap. FLIP smooths the slide.
            if (isActive && !isGrowing) return null;
            return (
              <button
                key={v.id}
                ref={setThumbRef(v.id)}
                type="button"
                className={'hero-thumb' + (isGrowing ? ' is-growing' : '')}
                onClick={() => activate(i)}
                aria-label={`Mostrar ${v.nombre}`}
                tabIndex={isGrowing ? -1 : 0}
              >
                <img src={v.imagen} alt={v.nombre} />
                <div className="hero-thumb-meta">
                  <span className="hero-thumb-name">{v.nombre}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hero-controls">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Anterior"
          className="hero-nav-btn"
          disabled={growingIdx !== null}
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Siguiente"
          className="hero-nav-btn"
          disabled={growingIdx !== null}
        >
          →
        </button>
        <div className="hero-controls-bar" />
        <div className="hero-counter">
          {String(idx + 1).padStart(2, '0')} /{' '}
          {String(TOTAL).padStart(2, '0')}
        </div>
      </div>

      <div className="hero-notch-host">
        <div className="hero-notch" />
      </div>
    </section>
  );
}
