import Logo from './Logo';
import { WA_MESSAGES, waUrl } from '@/lib/contact';

// Social icons are inline SVGs (no external dependency) sized to the
// container — they inherit color via `currentColor` so hover states
// just toggle text/background color and the glyphs follow.
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 22v-8.4h2.83l.42-3.29H13.5V8.2c0-.95.26-1.6 1.63-1.6h1.74V3.66c-.3-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.37v2.41H7.25v3.29h2.82V22h3.43z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsappIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12 2 9.94 9.94 0 0 0 2.05 11.94a9.93 9.93 0 0 0 1.34 4.97L2 22l5.25-1.38a9.93 9.93 0 0 0 4.76 1.21h.01a9.94 9.94 0 0 0 9.94-9.94 9.85 9.85 0 0 0-2.91-7.0zM12.02 20.16a8.24 8.24 0 0 1-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.27 8.27 0 1 1 7 3.86zm4.53-6.18c-.25-.13-1.47-.73-1.69-.81-.23-.08-.4-.13-.56.13s-.65.81-.79.97c-.15.16-.29.18-.54.06a6.74 6.74 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.71c-.14-.25-.02-.38.11-.5.12-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.4-.42-.56-.43-.15-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.06s.88 2.39 1 2.55c.13.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer" id="contact" data-screen-label="08 Footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo">
            <Logo />
            <span>Alexander Alvarado</span>
          </div>
          <div className="footer-nav">
            <a href="/#about">Sobre mí</a>
            <a href="/#catalog">Modelos</a>
            <a href="/#process">Proceso</a>
            <a href="/#contact">Contacto</a>
          </div>
          <div className="footer-social">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer-social-btn"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-btn"
            >
              <InstagramIcon />
            </a>
            <a
              href={waUrl(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer-social-btn"
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>
        <div className="footer-sub">
          <span>© 2026 Alexander Alvarado</span>
        </div>
        <div className="footer-marquee">ILIMITADO</div>
      </div>
    </footer>
  );
}
