import Link from 'next/link';
import { notFound } from 'next/navigation';
import Logo from '@/app/components/Logo';
import { VEHICLES } from '@/lib/vehicles';
import {
  waUrl,
  waVehicleMessage,
  waTestDriveMessage,
} from '@/lib/contact';

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const v = VEHICLES.find((x) => x.id === id);
  if (!v) return { title: 'Modelo no encontrado · Alexander Chevrolet' };
  return {
    title: `${v.nombre} · Alexander Chevrolet`,
    description: `${v.tagline}. Motor ${v.motor}, ${v.hp}, transmisión ${v.transmision}. Desde ${v.precioDesde}.`,
  };
}

const RELATED_TABS = [
  { id: 'all', label: 'Todos' },
  { id: 'suv', label: 'SUV' },
  { id: 'pickup', label: 'Pickups' },
  { id: 'fullsize', label: 'Full-Size' },
  { id: 'sedan', label: 'Hatchback' },
];

export default async function VehiclePage({ params }) {
  const { id } = await params;
  const vehicle = VEHICLES.find((v) => v.id === id);
  if (!vehicle) notFound();

  const gallery =
    vehicle.imagenes && vehicle.imagenes.length > 0
      ? vehicle.imagenes
      : vehicle.imagen
        ? [vehicle.imagen]
        : [];
  const highlights = vehicle.destacado.split(' · ');

  const sameCategory = VEHICLES.filter(
    (v) => v.id !== vehicle.id && v.categoria === vehicle.categoria
  );
  const others = VEHICLES.filter(
    (v) => v.id !== vehicle.id && !sameCategory.includes(v)
  );
  const related = [...sameCategory, ...others].slice(0, 6);

  const overviewText = buildOverview(vehicle);

  return (
    <main className="vp">
      <div className="vp-top">
        <nav className="nav is-light">
          <div className="nav-left">
            <Link href="/#about">Sobre mí</Link>
            <Link href="/#process">Cómo trabajo</Link>
          </div>
          <div className="nav-center">
            <Link href="/" className="nav-logo" aria-label="Alexander Chevrolet">
              <Logo />
            </Link>
          </div>
          <div className="nav-right">
            <Link href="/#catalog">Catálogo</Link>
            <Link href="/#contact">Contacto</Link>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <section className="vp-hero">
        <div className="wrap">
          <header className="vp-hero-head">
            <div className="vp-hero-titles">
              <p className="vp-hero-cat">{vehicle.categoriaLabel}</p>
              <h1 className="vp-hero-title">{vehicle.nombre}</h1>
            </div>
            <div className="vp-swatches" aria-label="Color disponible">
              <span
                className="vp-swatch active"
                style={{ background: vehicle.color }}
                title="Color destacado"
              />
              <span className="vp-swatch" style={{ background: '#c8c8cc' }} />
              <span className="vp-swatch" style={{ background: '#1a1a1c' }} />
              <span className="vp-swatch" style={{ background: '#3a4a5e' }} />
            </div>
          </header>

          <div className="vp-hero-image">
            {vehicle.imagen ? (
              <img
                src={vehicle.imagen}
                alt={vehicle.nombre}
                className="vp-hero-img"
              />
            ) : (
              <div className="vp-hero-img-placeholder" />
            )}
          </div>

          <div className="vp-hero-bar">
            <div className="vp-stats">
              <Stat label="Motor" value={vehicle.motor} />
              <Stat label="Potencia" value={vehicle.hp} />
              <Stat label="Torque" value={vehicle.torque} />
              <Stat
                label="Desde"
                value={vehicle.precioDesde.replace('USD ', '$')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL + OVERVIEW */}
      <section className="vp-info">
        <div className="wrap vp-info-grid">
          <div className="vp-info-card">
            <h3>Detalle técnico</h3>
            <ul className="vp-info-list">
              <InfoRow label="Transmisión" value={vehicle.transmision} />
              <InfoRow label="Rendimiento" value={vehicle.rendimiento} />
              <InfoRow label="Pasajeros" value={vehicle.pasajeros} />
              <InfoRow label="Segmento" value={vehicle.categoriaLabel} />
            </ul>
          </div>
          <div className="vp-info-text">
            <h3>Overview</h3>
            <p>{overviewText}</p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="vp-highlights">
        <div className="wrap">
          <div className="vp-highlights-head">
            <h2 className="vp-h2">
              Equipamiento que ya viene incluido
            </h2>
            <p className="vp-h2-sub">
              Cada {vehicle.nombre} sale del concesionario con tecnología,
              conectividad y seguridad de su segmento.
            </p>
          </div>
          <div
            className="vp-highlights-grid"
            data-count={highlights.length}
          >
            {highlights.map((h, i) => (
              <article className="vp-highlight" key={i}>
                <span className="vp-highlight-icon" aria-hidden="true">
                  {pickIcon(h)}
                </span>
                <h4 className="vp-highlight-title">{h}</h4>
                <p className="vp-highlight-copy">{copyFor(h)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY BENTO */}
      {gallery.length > 0 && (
        <section className="vp-gallery">
          <div className="wrap">
            <div className="vp-gallery-head">
              <h2 className="vp-h2">
                Diseñado para que disfrutes
                <br />
                cada kilómetro.
              </h2>
              <p className="vp-h2-sub">
                Mirá tu próximo {vehicle.nombre.split(' ')[0]} desde
                todos los ángulos.
              </p>
            </div>

            <div
              className={
                'vp-bento count-' + Math.min(gallery.length, 5)
              }
            >
              {gallery.slice(0, 5).map((src, i) => (
                <figure className={'vp-bento-item slot-' + (i + 1)} key={src}>
                  <img
                    src={src}
                    alt={`${vehicle.nombre} — ${i + 1}`}
                    loading="lazy"
                  />
                  <figcaption className="vp-bento-cap">
                    {bentoCaption(i)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="vp-related">
          <div className="wrap">
            <div className="vp-related-head">
              <div className="vp-related-titles">
                <h2 className="vp-h2">
                  Explorá otros
                  <br />
                  modelos
                </h2>
                <p className="vp-h2-sub">
                  Compará dentro de la línea Chevrolet y elegí lo que
                  mejor encaje con tu uso.
                </p>
              </div>
              <Link
                href="/#catalog"
                className="vp-related-cta"
              >
                Ver catálogo completo
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="vp-related-tabs" aria-hidden="true">
              {RELATED_TABS.map((t) => {
                const isActive =
                  (t.id === 'all') ||
                  (t.id !== 'all' && t.id === vehicle.categoria);
                return (
                  <span
                    key={t.id}
                    className={
                      'vp-related-tab' + (isActive ? ' active' : '')
                    }
                  >
                    {t.label}
                  </span>
                );
              })}
            </div>

            <div className="vp-related-grid">
              {related.map((v) => (
                <Link
                  href={`/vehiculo/${v.id}`}
                  className="vp-related-card"
                  key={v.id}
                >
                  <div className="vp-related-img">
                    {v.imagen && (
                      <img src={v.imagen} alt={v.nombre} loading="lazy" />
                    )}
                  </div>
                  <div className="vp-related-info">
                    <h4>{v.nombre}</h4>
                    <p>{v.categoriaLabel}</p>
                    <div className="vp-related-stats">
                      <span>
                        <small>Potencia</small>
                        <strong>{v.hp}</strong>
                      </span>
                      <span>
                        <small>Desde</small>
                        <strong>
                          {v.precioDesde.replace('USD ', '$')}
                        </strong>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="vp-cta">
        <div className="wrap vp-cta-inner">
          <div className="vp-cta-copy">
            <span className="vp-cta-eyebrow">Listo para llevártelo</span>
            <h2 className="vp-cta-title">
              Cotizá el {vehicle.nombre} hoy,
              <br />
              o probálo este fin de semana.
            </h2>
            <p>
              Te respondo personalmente por WhatsApp — sin call centers, sin
              formularios. Coordinamos cotización con financiamiento o
              agendamos una prueba de manejo.
            </p>
          </div>
          <div className="vp-cta-actions">
            <a
              href={waUrl(waVehicleMessage(vehicle.nombre))}
              target="_blank"
              rel="noopener noreferrer"
              className="vp-cta-btn primary"
            >
              <span>Cotizar por WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={waUrl(waTestDriveMessage(vehicle.nombre))}
              target="_blank"
              rel="noopener noreferrer"
              className="vp-cta-btn secondary"
            >
              <span>Agendar prueba de manejo</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- presentational helpers ---------- */

function Stat({ label, value }) {
  return (
    <div className="vp-stat">
      <span className="vp-stat-label">{label}</span>
      <span className="vp-stat-value">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <li className="vp-info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </li>
  );
}

function buildOverview(v) {
  const first = v.nombre.split(' ')[0];
  return (
    `El ${v.nombre} combina la fiabilidad de Chevrolet con la presencia ` +
    `de un ${v.categoriaLabel.toLowerCase()}. Su motor ${v.motor} ` +
    `entrega ${v.hp} y ${v.torque} de torque, transmitidos por una ` +
    `${v.transmision.toLowerCase()}. Capacidad para ${v.pasajeros} ` +
    `pasajeros y ${v.rendimiento.toLowerCase()} hacen del ${first} una ` +
    `opción versátil para tu día a día — desde Managua hasta cualquier ` +
    `destino de Centroamérica.`
  );
}

/* ---------- icon picker for highlights ----------
   Matches keywords in the highlight text to a topic-appropriate SVG.
   Order matters: more specific rules go first. */

const Svg = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

const ICONS = {
  screen: (
    <Svg>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </Svg>
  ),
  shield: (
    <Svg>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  ),
  camera: (
    <Svg>
      <path d="M3 8h4l2-3h6l2 3h4v11H3z" />
      <circle cx="12" cy="13" r="3.5" />
    </Svg>
  ),
  seat: (
    <Svg>
      <path d="M7 14V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6" />
      <path d="M5 14h14v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" />
      <path d="M9 20v2M15 20v2" />
    </Svg>
  ),
  sun: (
    <Svg>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4L4.2 19.8M19.8 4.2l-1.4 1.4" />
    </Svg>
  ),
  bolt: (
    <Svg>
      <path d="M13 3L5 14h6l-2 7 9-12h-6l1-6z" />
    </Svg>
  ),
  wheel: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21" />
    </Svg>
  ),
  mountain: (
    <Svg>
      <path d="M3 19l5-9 4 6 3-4 6 7z" />
      <circle cx="17" cy="6" r="1.5" />
    </Svg>
  ),
  speaker: (
    <Svg>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <circle cx="12" cy="9" r="2" />
      <circle cx="12" cy="15.5" r="2.5" />
    </Svg>
  ),
  light: (
    <Svg>
      <path d="M9 18h6M10 22h4" />
      <path d="M8 14a4 4 0 0 1-1-2.5C7 8.4 9.2 6 12 6s5 2.4 5 5.5A4 4 0 0 1 16 14l-1 2H9z" />
    </Svg>
  ),
  shift: (
    <Svg>
      <path d="M6 18V8m0 0l-3 3m3-3l3 3" />
      <path d="M14 18l4-10M14 18l-4-4M14 18l4-4" />
    </Svg>
  ),
  suspension: (
    <Svg>
      <path d="M4 7h16M4 17h16" />
      <path d="M8 7c2 2 2 8 0 10M16 7c-2 2-2 8 0 10" />
    </Svg>
  ),
  cargo: (
    <Svg>
      <rect x="3" y="7" width="18" height="11" rx="1" />
      <path d="M3 11h18M9 7V4h6v3" />
    </Svg>
  ),
  users: (
    <Svg>
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <path d="M14 20c0-2 1-4 3.5-4S21 18 21 20" />
    </Svg>
  ),
  cruise: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
      <path d="M3 12h2M19 12h2" />
    </Svg>
  ),
  airbag: (
    <Svg>
      <circle cx="12" cy="13" r="6" />
      <path d="M6 13c0-3 2-5 5-5M12 7V3M9 3h6" />
    </Svg>
  ),
  star: (
    <Svg>
      <path d="M12 3l2.5 5.5L20 9.5l-4 4 1 5.5L12 16l-5 3 1-5.5-4-4 5.5-1L12 3z" />
    </Svg>
  ),
  palette: (
    <Svg>
      <path d="M12 21c5 0 9-4 9-9 0-4.5-3.5-8-8.5-8C8 4 4 7 4 11.5c0 1.7 1.5 3 3 3h2c1 0 1.5.5 1.5 1.5S9.5 17 9 18s.5 3 3 3z" />
      <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </Svg>
  ),
};

/* Lowercase the highlight, then match the most distinctive keywords. */
function pickIcon(text) {
  const t = text.toLowerCase();
  if (/(carplay|android|mylink|pantalla|head|bluetooth)/.test(t)) return ICONS.screen;
  if (/(airbag)/.test(t)) return ICONS.airbag;
  if (/(cámara|camara|sensor|adas)/.test(t)) return ICONS.camera;
  if (/(super cruise|cruise|crucero)/.test(t)) return ICONS.cruise;
  if (/(cuero|asiento|premium)/.test(t)) return ICONS.seat;
  if (/(sunroof|techo|panor)/.test(t)) return ICONS.sun;
  if (/(eléctrico|electrico|carga)/.test(t)) return ICONS.bolt;
  if (/(rines|aros|22|17|rs ")/.test(t)) return ICONS.wheel;
  if (/(4wd|tracción|traccion|skid|hill|rancho|transfer|off)/.test(t)) return ICONS.mountain;
  if (/(bose|spk|sonido|altavoc)/.test(t)) return ICONS.speaker;
  if (/(led|luz|luces|faros)/.test(t)) return ICONS.light;
  if (/(suspen|magnetic|shock|multimatic|dssv)/.test(t)) return ICONS.suspension;
  if (/(tailgate|cajuela|carga|maletero|3,)/.test(t)) return ICONS.cargo;
  if (/(filas|pasajero)/.test(t)) return ICONS.users;
  if (/(negro|bitono|detall|acabados|diseño)/.test(t)) return ICONS.palette;
  return ICONS.star;
}

const COPY_BY_ICON = {
  screen: 'Pantalla y conectividad sin curva de aprendizaje.',
  shield: 'Sistemas activos de protección en cada viaje.',
  camera: 'Visibilidad y asistencias para maniobrar tranquilo.',
  seat: 'Confort premium para todos los pasajeros.',
  sun: 'Más luz y sensación de espacio en cabina.',
  bolt: 'Eficiencia eléctrica con respaldo Chevrolet.',
  wheel: 'Llantas y aros con estética y desempeño.',
  mountain: 'Capacidad off-road para los caminos exigentes.',
  speaker: 'Audio premium con respuesta limpia a todo volumen.',
  light: 'Iluminación moderna que mejora visibilidad y firma.',
  shift: 'Transmisión que entrega cambios suaves y precisos.',
  suspension: 'Suspensión calibrada para confort y control.',
  cargo: 'Espacio de carga inteligente para tu día a día.',
  users: 'Capacidad cómoda para toda la familia.',
  cruise: 'Asistencia de conducción que reduce la fatiga.',
  airbag: 'Múltiples bolsas que envuelven a los ocupantes.',
  star: 'Detalle Chevrolet pensado para el uso real.',
  palette: 'Diseño con identidad visual que destaca en la calle.',
};

function copyFor(text) {
  const t = text.toLowerCase();
  if (/(carplay|android|mylink|pantalla|head|bluetooth)/.test(t)) return COPY_BY_ICON.screen;
  if (/(airbag)/.test(t)) return COPY_BY_ICON.airbag;
  if (/(cámara|camara|sensor|adas)/.test(t)) return COPY_BY_ICON.camera;
  if (/(super cruise|cruise|crucero)/.test(t)) return COPY_BY_ICON.cruise;
  if (/(cuero|asiento|premium)/.test(t)) return COPY_BY_ICON.seat;
  if (/(sunroof|techo|panor)/.test(t)) return COPY_BY_ICON.sun;
  if (/(eléctrico|electrico|carga)/.test(t)) return COPY_BY_ICON.bolt;
  if (/(rines|aros|22|17|rs ")/.test(t)) return COPY_BY_ICON.wheel;
  if (/(4wd|tracción|traccion|skid|hill|rancho|transfer|off)/.test(t)) return COPY_BY_ICON.mountain;
  if (/(bose|spk|sonido|altavoc)/.test(t)) return COPY_BY_ICON.speaker;
  if (/(led|luz|luces|faros)/.test(t)) return COPY_BY_ICON.light;
  if (/(suspen|magnetic|shock|multimatic|dssv)/.test(t)) return COPY_BY_ICON.suspension;
  if (/(tailgate|cajuela|maletero|3,)/.test(t)) return COPY_BY_ICON.cargo;
  if (/(filas|pasajero)/.test(t)) return COPY_BY_ICON.users;
  if (/(negro|bitono|detall|acabados|diseño)/.test(t)) return COPY_BY_ICON.palette;
  return COPY_BY_ICON.star;
}

const BENTO_CAPS = [
  'Diseño exterior auténtico',
  'Detalle frontal y firma LED',
  'Cabina pensada para vos',
  'Confort de segunda fila',
  'Estilo en cada ángulo',
];
function bentoCaption(i) {
  return BENTO_CAPS[i % BENTO_CAPS.length];
}
