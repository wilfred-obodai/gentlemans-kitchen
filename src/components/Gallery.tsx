import { GALLERY_IMAGES } from '../data/dishes';

export function Gallery() {
  return (
    <section id="gallery" style={{ padding: '100px 24px', background: '#0f0b07' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 68 }}>
          <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Gallery</p>
          <h2 className="fd" style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            A Taste of <em className="gold">What Awaits</em>
          </h2>
          <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {GALLERY_IMAGES.map((item, i) => (
            <div key={i} className="gal-item" style={{ height: i === 1 ? 380 : 250 }}>
              <img src={item.src} alt={item.label} />
              <div className="gal-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
