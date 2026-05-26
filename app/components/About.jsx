import { WA_MESSAGES, waUrl } from '@/lib/contact';

export default function About() {
  return (
    <section className="section" id="about" data-screen-label="02 About">
      <div className="wrap about-grid">
        <div>
          <div className="about-label">Sobre Alexander</div>
          <p className="about-body">
            Soy <strong>Alexander Alvarado</strong>, asesor de ventas Chevrolet
            en Nicaragua. Llevo más de una década ayudando a familias,
            empresarios y entusiastas a encontrar el vehículo correcto — desde
            el Aveo urbano hasta la Suburban familiar, incluyendo toda la línea
            Silverado, Colorado, Tahoe y los híbridos enchufables Captiva PHEV.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-num">15+</div>
              <div className="about-stat-label">Años de experiencia</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">500+</div>
              <div className="about-stat-label">Entregas realizadas</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">16</div>
              <div className="about-stat-label">Modelos disponibles</div>
            </div>
          </div>
          <a
            href={waUrl(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Contáctame
            <span className="btn-pill-icon">↗</span>
          </a>
        </div>
        <div className="about-visual">
          <div className="about-img-slot">
            <image-slot
              suppressHydrationWarning
              id="about-car"
              shape="rect"
              src="/images/alexander.jpg"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            ></image-slot>
          </div>
        </div>
      </div>
    </section>
  );
}
