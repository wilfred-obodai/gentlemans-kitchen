import { GALLERY_IMAGES } from '../data/dishes';

export function Gallery() {
  return (
    <section id="gallery" style={{ padding: '100px 24px', background: '#0f0b07' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 68 }}>
          <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Gallery</p>
          <h2 className="fd" style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            A Taste of <em className="gold">What Awaits</em>
          </h2>
          <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
        </div>

        {/* Responsive masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}>
          {GALLERY_IMAGES.map((item, i) => (
            <div
              key={i}
              className="gal-item reveal"
              style={{
                height: i === 1 || i === 7 ? 320 : 240,
                transitionDelay: `${(i % 3) * 0.1}s`,
              }}
            >
              <img src={item.src} alt={item.label} />
              <div className="gal-overlay" />
              <div style={{
                position: 'absolute', bottom: 12, left: 14,
                transition: 'opacity 0.4s',
              }}>
                <span className="fb" style={{ fontSize: 13, color: '#fff', fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}