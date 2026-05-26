'use client';

import { useEffect, useMemo, useState } from 'react';
import { VEHICLES } from '@/lib/vehicles';
import { WA_MESSAGES, waUrl, waVehicleMessage } from '@/lib/contact';

const TABS = [
  { id: 'all', label: 'Todos' },
  { id: 'suv', label: 'SUV' },
  { id: 'pickup', label: 'Pickups' },
  { id: 'fullsize', label: 'Full-Size' },
  { id: 'sedan', label: 'Hatchback' },
];

export default function Lineup() {
  const [activeCat, setActiveCat] = useState('all');
  const filtered = useMemo(() => {
    if (activeCat === 'all') return VEHICLES;
    return VEHICLES.filter((v) => v.categoria === activeCat);
  }, [activeCat]);

  const [idx, setIdx] = useState(0);
  // reset idx on category change
  useEffect(() => {
    setIdx(0);
  }, [activeCat]);

  const current = filtered[idx % filtered.length] || VEHICLES[0];
  const goPrev = () =>
    setIdx((i) => (i - 1 + filtered.length) % filtered.length);
  const goNext = () => setIdx((i) => (i + 1) % filtered.length);

  const featuredName = current.nombre;

  return (
    <section className="lineup" id="catalog" data-screen-label="03 Lineup">
      <div className="wrap">
        <div className="lineup-head">
          <h2 className="lineup-title">
            El catálogo completo,
            <br />
            elegí tu próximo Chevrolet.
          </h2>
          <div className="lineup-intro">
            <p>
              Trabajo con los 16 modelos del portafolio Chevrolet — sedanes,
              SUVs, pickups y full-size. Cada cotización viene con asesoría
              personalizada, financiamiento y entrega coordinada.
            </p>
            <a
              href={waUrl(WA_MESSAGES.catalog)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              Ver Catálogo
              <span className="btn-pill-icon">↗</span>
            </a>
          </div>
        </div>

        <div className="lineup-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={'lineup-tab ' + (activeCat === t.id ? 'active' : '')}
              onClick={() => setActiveCat(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="featured">
          <a
            href={waUrl(waVehicleMessage(current.nombre))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill featured-cta-floating"
          >
            Cotizar
            <span className="btn-pill-icon">↗</span>
          </a>
          {/* key on .featured-image remounts it on vehicle change, which
              triggers the CSS animation defined in globals.css so the new
              image fades in instead of snapping. */}
          <div className="featured-image" key={'img-' + current.id}>
            <div className="featured-img-slot">
              {current.imagen ? (
                <img
                  src={current.imagen}
                  alt={current.nombre}
                  className="featured-img"
                />
              ) : (
                <image-slot
                  suppressHydrationWarning
                  id={'feat-' + current.id}
                  shape="rect"
                  placeholder={'PNG: ' + current.nombre.toUpperCase()}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                  }}
                ></image-slot>
              )}
            </div>
          </div>
          <button
            className="featured-nav-btn prev"
            onClick={goPrev}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className="featured-nav-btn next"
            onClick={goNext}
            aria-label="Siguiente"
          >
            →
          </button>

          {/* Bottom column: vehicle name + specs flow as natural siblings
              so the spec grid can grow to two rows on narrow viewports
              without colliding with the watermark above it. */}
          <div className="featured-bottom">
            <div className="featured-watermark" key={'name-' + current.id}>
              {featuredName}
            </div>
            <div className="featured-specs" key={'specs-' + current.id}>
              <div className="featured-spec">
                <div className="featured-spec-label">Motor</div>
                <div className="featured-spec-value">{current.motor}</div>
              </div>
              <div className="featured-spec">
                <div className="featured-spec-label">Potencia</div>
                <div className="featured-spec-value">{current.hp}</div>
              </div>
              <div className="featured-spec">
                <div className="featured-spec-label">Torque</div>
                <div className="featured-spec-value">{current.torque}</div>
              </div>
              <div className="featured-spec">
                <div className="featured-spec-label">Desde</div>
                <div className="featured-spec-value">
                  {current.precioDesde.replace('USD ', '$')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
