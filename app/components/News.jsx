export default function News() {
  return (
    <section className="news" data-screen-label="06 News">
      <div className="wrap">
        <div className="news-head">
          <h2 className="news-title">
            Mantente conectado con
            <br />
            las novedades de Alexander.
          </h2>
          <div className="news-intro">
            <p>
              Promociones, llegada de unidades nuevas y noticias del portafolio
              Chevrolet en Nicaragua — explorá lo último que tengo disponible.
            </p>
          </div>
        </div>
        <div className="news-grid">
          <article className="news-card">
            <div className="news-author">Promoción · Mayo 2026</div>
            <h3>Tracker LT 2026 con 0% interés a 36 meses</h3>
            <p>
              Promoción válida para unidades 2026 con prima desde 20%. Bonifico
              accesorios por C$15,000 con esta promo limitada.
            </p>
            <div className="news-card-foot">
              <span className="news-card-date">15 Mayo 2026</span>
              <div className="news-card-arrow">→</div>
            </div>
          </article>
          <article className="news-card">
            <div className="news-author">Lanzamiento</div>
            <h3>Llegó la Captiva PHEV: 85 km eléctricos, 7 plazas</h3>
            <p>
              Primera SUV híbrida enchufable de 7 pasajeros en Nicaragua.
              Tengo 4 unidades reservables disponibles este mes en las
              versiones LT y Premier.
            </p>
            <div className="news-card-foot">
              <span className="news-card-date">08 Mayo 2026</span>
              <div className="news-card-arrow">→</div>
            </div>
          </article>
          <article className="news-card">
            <div className="news-author">Unidad nueva</div>
            <h3>Silverado High Country 6.2L V8 en exhibición</h3>
            <p>
              420 HP, Super Cruise y cuero perforado premium. Disponible para
              test drive con cita previa, color Iridescent Pearl Tricoat.
            </p>
            <div className="news-card-foot">
              <span className="news-card-date">02 Mayo 2026</span>
              <div className="news-card-arrow">→</div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
