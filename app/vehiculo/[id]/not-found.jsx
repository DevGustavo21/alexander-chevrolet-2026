import Link from 'next/link';

export default function VehicleNotFound() {
  return (
    <main className="vehicle-404">
      <div className="wrap vehicle-404-inner">
        <span className="vehicle-section-eyebrow">404</span>
        <h1>Ese modelo no está en el catálogo.</h1>
        <p>
          Puede que haya sido removido o que el link esté mal escrito. Mirá el
          catálogo completo y elegí tu próximo Chevrolet.
        </p>
        <Link href="/#catalog" className="vehicle-cta-btn primary">
          Ver catálogo
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
