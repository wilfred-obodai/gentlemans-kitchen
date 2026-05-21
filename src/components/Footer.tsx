const NAV_LINKS = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];

interface FooterProps {
  scrollToSection: (id: string) => void;
  setAdminOpen: (v: boolean) => void;
}

export function Footer({ scrollToSection, setAdminOpen }: FooterProps) {
  return (
    <footer style={{ background: '#080604', borderTop: '1px solid rgba(249,115,22,0.1)', padding: '56px 24px 36px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', textAlign: 'center' }}>

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Gentleman's Kitchen"
          style={{ height: 52, width: 'auto', objectFit: 'contain', marginBottom: 12 }}
        />

        <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 30, letterSpacing: '0.06em' }}>
          Where Every Meal Is a Statement
        </p>

        {/* Nav links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 30 }}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              onClick={() => scrollToSection(l.toLowerCase())}
              className="fb"
              style={{ color: 'rgba(255,255,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, letterSpacing: '0.08em', transition: 'color 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#F97316')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="divider" style={{ maxWidth: 160, margin: '0 auto 22px' }} />

        {/* Staff login — hidden */}
        <button
          onClick={() => setAdminOpen(true)}
          className="fb"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.1)', fontSize: 11, letterSpacing: '0.04em', transition: 'color 0.3s' }}
          onMouseOver={e => (e.currentTarget.style.color = 'rgba(249,115,22,0.4)')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.1)')}
        >
          Staff Login
        </button>

        <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 12 }}>
          © 2025 Gentleman's Kitchen · Greda Estate, Teshie, Accra, Ghana
        </p>
        <p className="fb" style={{ fontSize: 11, color: 'rgba(249,115,22,0.4)', marginTop: 6, letterSpacing: '0.04em' }}>
          Powered by StacHub
        </p>
      </div>
    </footer>
  );
}
