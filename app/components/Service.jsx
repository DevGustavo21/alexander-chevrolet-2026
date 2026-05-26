'use client';

import { useState } from 'react';
import { WA_MESSAGES, waUrl } from '@/lib/contact';

const VIDEO_ID = 'z4l3-SDqsVk';
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

export default function Service() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="service" id="process" data-screen-label="05 Service">
      <div className="wrap">
        <div className="service-banner">
          <div className="service-banner-slot">
            {playing ? (
              <iframe
                className="service-iframe"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="Alexander Chevrolet — video institucional"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <img
                className="service-poster"
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                }}
                alt="Reproducir video Alexander Chevrolet"
              />
            )}
          </div>
          {!playing && (
            <button
              type="button"
              className="service-play"
              aria-label="Reproducir video"
              onClick={() => setPlaying(true)}
            >
              ▶
            </button>
          )}
          {!playing && (
            <a
              className="service-ext"
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir en YouTube"
            >
              Ver en YouTube ↗
            </a>
          )}
        </div>
        <div className="service-foot">
          <div>
            <h3>Financiamiento en 24 h</h3>
            <small>Hasta 84 meses · 100% del valor</small>
          </div>
          <p>
            Gestionamos la cotización, el trámite crediticio con bancos aliados
            y la entrega del vehículo. Aprobación típica en 24 horas, sin que
            tengas que mover papeles tú mismo.
          </p>
          <a
            href={waUrl(WA_MESSAGES.financing)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Cotizar ahora
            <span className="btn-pill-icon">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
