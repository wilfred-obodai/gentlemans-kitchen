export function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: '#0f0b07' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 68 }}>
          <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Our Story</p>
          <h2 className="fd heading-shimmer" style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            The Kitchen <em className="gold">Behind the Name</em>
          </h2>
          <div className="divider divider-animate" style={{ maxWidth: 100, margin: '22px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div className="reveal-left">
            {[
              "At Gentleman's Kitchen, we believe good food should be accessible, authentic, and exceptional. Located in the heart of Greda Estate, Teshie, we've become the neighbourhood's go-to spot for premium Ghanaian cuisine.",
              "Every dish is prepared fresh daily — from our smoky jollof rice to our loaded shawarma, fresh salads and perfectly grilled chicken. Flavours that feel like home, elevated.",
              "We are more than a restaurant. We are a community gathering place where quality meets convenience, and every meal tells a story. We do delivery too — order now!",
            ].map((p, i) => (
              <p key={i} className="fb" style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.88, marginBottom: 18 }}>{p}</p>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 40 }}>
              {[
                { v: '6AM', l: 'Opens Daily' },
                { v: '10+', l: 'Menu Items' },
                { v: '★★★★★', l: 'Community Loved' },
              ].map((s, i) => (
                <div key={i} className="reveal" style={{ textAlign: 'center', padding: '18px 10px', borderRadius: 14, border: '1px solid rgba(249,115,22,0.14)', background: 'rgba(249,115,22,0.03)', transitionDelay: `${i * 0.1}s` }}>
                  <div className="fd gold" style={{ fontSize: s.v.includes('★') ? 14 : 26, fontWeight: 700, marginBottom: 5 }}>{s.v}</div>
                  <div className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right" style={{ position: 'relative' }}>
            <div style={{ borderRadius: 22, overflow: 'hidden', border: '1.5px solid rgba(249,115,22,0.22)', boxShadow: '0 32px 90px rgba(0,0,0,0.65)' }}>
              <img src="/images/hero.jpeg" alt="Gentleman's Kitchen" style={{ width: '100%', height: 480, objectFit: 'cover', objectPosition: 'center 20%', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
            <div style={{ position: 'absolute', bottom: -18, left: -18, background: 'linear-gradient(135deg, #F97316, #c95200)', borderRadius: 16, padding: '14px 22px', boxShadow: '0 8px 32px rgba(249,115,22,0.45)' }}>
              <div style={{ fontSize: 26 }}>🔥</div>
              <div className="fb" style={{ fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', marginTop: 4 }}>FRESH DAILY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}