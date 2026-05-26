'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
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
              Hablar del catálogo
              <span className="btn-pill-icon">↗</span>
            </a>
          </div>
        </div>

        <div className="lineup-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeCat === t.id}
              className={'lineup-tab ' + (activeCat === t.id ? 'active' : '')}
              onClick={() => setActiveCat(t.id)}
            >
              {t.label}
              <span className="lineup-tab-count">
                {t.id === 'all'
                  ? VEHICLES.length
                  : VEHICLES.filter((v) => v.categoria === t.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="vehicle-grid" key={activeCat}>
          {filtered.map((v, i) => (
            <article
              className="vehicle-card"
              key={v.id}
              style={{ '--card-i': i }}
            >
              <Link
                href={`/vehiculo/${v.id}`}
                className="vehicle-card-media"
                aria-label={`Ver detalle de ${v.nombre}`}
              >
                {v.imagen ? (
                  <img
                    src={v.imagen}
                    alt={v.nombre}
                    className="vehicle-card-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="vehicle-card-img-placeholder" />
                )}
                <span className="vehicle-card-tag">{v.categoriaLabel}</span>
              </Link>

              <div className="vehicle-card-body">
                <header className="vehicle-card-header">
                  <h3 className="vehicle-card-name">{v.nombre}</h3>
                  <p className="vehicle-card-tagline">{v.tagline}</p>
                </header>

                <dl className="vehicle-card-specs">
                  <div className="vehicle-card-spec">
                    <dt>Motor</dt>
                    <dd>{v.motor}</dd>
                  </div>
                  <div className="vehicle-card-spec">
                    <dt>Potencia</dt>
                    <dd>{v.hp}</dd>
                  </div>
                  <div className="vehicle-card-spec">
                    <dt>Trans.</dt>
                    <dd>{v.transmision}</dd>
                  </div>
                </dl>

                <footer className="vehicle-card-foot">
                  <div className="vehicle-card-price">
                    <span className="vehicle-card-price-label">Desde</span>
                    <span className="vehicle-card-price-value">
                      {v.precioDesde.replace('USD ', '$')}
                    </span>
                  </div>
                  <div className="vehicle-card-actions">
                    <a
                      href={waUrl(waVehicleMessage(v.nombre))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vehicle-card-btn ghost"
                      aria-label={`Cotizar ${v.nombre} por WhatsApp`}
                    >
                      Cotizar
                    </a>
                    <Link
                      href={`/vehiculo/${v.id}`}
                      className="vehicle-card-btn solid"
                    >
                      Conocer más
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
