const FEATURES = [
  { icon: '🔥', title: 'Fresh Grills Daily', description: 'Every dish is prepared fresh. No reheating, no shortcuts — ever.' },
  { icon: '★', title: 'Authentic Ghanaian', description: 'Recipes passed down and perfected. Flavors that taste like home.' },
  { icon: '⚡', title: 'Fast & Friendly', description: 'Quick service, warm smiles — quality food without the long wait.' },
];

export function WhyUs() {
  return (
    <section style={{ padding: '100px 24px', background: '#110d07' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Why Choose Us</p>
          <h2 className="fd" style={{ fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            The <em className="gold">Gentleman's Promise</em>
          </h2>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="feat-card">
              {f.icon === '★'
                ? <span className="feat-icon-star">★★★</span>
                : <span className="feat-icon">{f.icon}</span>
              }
              <h3 className="fd" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{f.title}</h3>
              <p className="fb" style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.75 }}>{f.description}</p>
              <div className="divider" style={{ width: 44, margin: '24px auto 0' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
