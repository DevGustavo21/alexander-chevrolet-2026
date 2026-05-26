import { WA_MESSAGES, waUrl } from '@/lib/contact';

export default function Community() {
  return (
    <section className="community" data-screen-label="07 Community">
      <div className="wrap">
        <div className="community-card">
          <div className="community-bg">
            <img
              src="/vehicles/Tahoe-RST.avif"
              alt="Chevrolet Tahoe RST"
              className="community-bg-img"
            />
          </div>
          <div className="community-content">
            <h2>Sumate al círculo de clientes Alexander</h2>
            <p>
              Acceso prioritario a unidades recién llegadas, promociones
              exclusivas y asesoría directa por WhatsApp — sin call centers,
              sin formularios, directo conmigo.
            </p>
            <a
              href={waUrl(WA_MESSAGES.community)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-light"
            >
              Hablar por WhatsApp
              <span
                className="btn-pill-light-icon"
                style={{ color: '#fff', fontSize: 10 }}
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
