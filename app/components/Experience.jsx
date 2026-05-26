const imgFill = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

export default function Experience() {
  return (
    <section className="exp" id="experience" data-screen-label="04 Experience">
      <div className="wrap">
        <h2 className="exp-title">
          Diseñado para tu vida en
          <br />
          Nicaragua y Centroamérica.
        </h2>
        <div className="exp-grid">
          <div className="exp-tile tall">
            <div className="exp-tile-slot">
              <img
                src="/vehicles/interior.jpg"
                alt="Chevrolet Silverado RST vista lateral en showroom"
                style={imgFill}
              />
            </div>
          </div>
          <div>
            <div className="exp-tile wide">
              <div className="exp-tile-slot">
                <img
                  src="/vehicles/silverado-rst-2.avif"
                  alt="Chevrolet Silverado RST en movimiento por carretera"
                  style={imgFill}
                />
              </div>
            </div>
            <div className="exp-caption">
              <h4>Exterior con presencia auténtica</h4>
              <p>
                Diseñado para verse bien tanto en Managua como en el camino a
                Granada — líneas marcadas, parrillas imponentes y firmas
                lumínicas LED en toda la gama.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="exp-sub-title">Interior pensado para Centroamérica</h3>
          <p className="exp-sub-body">
            Cada detalle, desde la iluminación ambiental hasta la pantalla
            MyLink, está pensado para tu día a día.
          </p>
        </div>
        <div className="exp-row2">
          <div className="exp-tile" style={{ aspectRatio: '4/3' }}>
            <div className="exp-tile-slot">
              <img
                src="/vehicles/silverado-rst-3.avif"
                alt="Chevrolet Silverado RST remolcando un UTV en el bosque"
                style={imgFill}
              />
            </div>
          </div>
          <div className="exp-tile" style={{ aspectRatio: '4/3' }}>
            <div className="exp-tile-slot">
              <img
                src="/vehicles/silverado-rst-4.jpg"
                alt="Chevrolet Silverado RST al atardecer junto al lago"
                style={imgFill}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
