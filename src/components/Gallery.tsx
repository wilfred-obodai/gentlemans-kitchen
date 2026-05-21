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

        {/* Row 1: 3 equal cols */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 14 }}>
          {GALLERY_IMAGES.slice(0, 3).map((item, i) => (
            <GalItem key={i} src={item.src} label={item.label} height={240} />
          ))}
        </div>

        {/* Row 2: wide + narrow + narrow */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
          {GALLERY_IMAGES.slice(3, 6).map((item, i) => (
            <GalItem key={i} src={item.src} label={item.label} height={280} />
          ))}
        </div>

        {/* Row 3: narrow + narrow + wide */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 14, marginBottom: 14 }}>
          {GALLERY_IMAGES.slice(6, 9).map((item, i) => (
            <GalItem key={i} src={item.src} label={item.label} height={280} />
          ))}
        </div>

        {/* Row 4: 3 equal cols */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {GALLERY_IMAGES.slice(9, 12).map((item, i) => (
            <GalItem key={i} src={item.src} label={item.label} height={240} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalItem({ src, label, height }: { src: string; label: string; height: number }) {
  return (
    <div className="gal-item" style={{ height }}>
      <img src={src} alt={label} />
      <div className="gal-overlay" />
      <div style={{
        position: 'absolute', bottom: 12, left: 14,
        opacity: 0, transition: 'opacity 0.4s',
      }} className="gal-label">
        <span className="fb" style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{label}</span>
      </div>
    </div>
  );
}