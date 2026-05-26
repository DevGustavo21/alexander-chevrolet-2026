import Logo from './Logo';
import { WA_MESSAGES, waUrl } from '@/lib/contact';

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
            <a href="#about">Sobre mí</a>
            <a href="#catalog">Modelos</a>
            <a href="#process">Proceso</a>
            <a href="#contact">Contacto</a>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              ○
            </a>
            <a
              href={waUrl(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              w
            </a>
          </div>
        </div>
        <div className="footer-sub">
          <span>© 2026 Alexander Alvarado</span>
          <span>Términos & Condiciones</span>
          <span>Política de Privacidad</span>
        </div>
        <div className="footer-marquee">ILIMITADO</div>
      </div>
    </footer>
  );
}
