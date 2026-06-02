'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { WA_MESSAGES, waUrl } from '@/lib/contact';

// Reusable hamburger + full-screen overlay nav.
//
// The desktop nav uses `.nav-left` / `.nav-right` link rails which are
// hidden under 900px via globals.css. This component fills that gap on
// mobile: a small hamburger button (only visible <=900px) opens a dark
// overlay with the same destinations in large tappable typography.
//
// Same component works on the home page (in-page hash anchors, picked
// up by Lenis smooth-scroll) and the vehicle detail page (cross-page
// `/#...` links handled by Next router). Pass `links` to override the
// defaults; pass `variant="light"` to flip the hamburger color for the
// light vehicle-page nav.
const DEFAULT_LINKS = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Cómo trabajo', href: '#process' },
  { label: 'Catálogo', href: '#catalog' },
  { label: 'Contacto', href: '#contact' },
];

export default function MobileNav({ links = DEFAULT_LINKS, variant = 'dark' }) {
  const [open, setOpen] = useState(false);

  // Lock page scroll while the overlay is open so the body underneath
  // doesn't rubber-band when the user taps near the screen edges. Snapshot
  // and restore the previous overflow value instead of hard-setting it
  // back to '' so any other style the page has applied survives.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={'mnav-btn' + (variant === 'light' ? ' is-light' : '')}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      <div
        id="mobile-nav-overlay"
        className={'mnav-overlay' + (open ? ' is-open' : '')}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="mnav-overlay-top">
          <div className="mnav-overlay-logo" aria-hidden="true">
            <Logo />
          </div>
          <button
            type="button"
            className="mnav-close"
            aria-label="Cerrar menú"
            onClick={close}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mnav-list" aria-label="Menú principal">
          {links.map((l, i) => {
            const isRoute = l.href.startsWith('/');
            const common = {
              className: 'mnav-link',
              style: { transitionDelay: open ? `${80 + i * 60}ms` : '0ms' },
              onClick: close,
            };
            return isRoute ? (
              <Link key={l.href} href={l.href} {...common}>
                <span className="mnav-link-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mnav-link-label">{l.label}</span>
                <span className="mnav-link-arrow" aria-hidden="true">↗</span>
              </Link>
            ) : (
              <a key={l.href} href={l.href} {...common}>
                <span className="mnav-link-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mnav-link-label">{l.label}</span>
                <span className="mnav-link-arrow" aria-hidden="true">↗</span>
              </a>
            );
          })}
        </nav>

        <div className="mnav-foot">
          <a
            href={waUrl(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mnav-cta"
            onClick={close}
          >
            Escríbeme por WhatsApp
            <span className="mnav-cta-icon">↗</span>
          </a>
          <p className="mnav-foot-note">Alexander Alvarado · Asesor Chevrolet</p>
        </div>
      </div>
    </>
  );
}
