import { ChevronDown, Flame } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export function Hero({ scrollToSection }: HeroProps) {
  return (
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* Background image */}
      <img
        src="/images/hero.jpeg"
        alt="Gentleman's Kitchen fresh food preparation"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 65%',
          filter: 'brightness(0.75) saturate(1.05)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,11,7,0.1) 0%, rgba(15,11,7,0.08) 30%, rgba(15,11,7,0.72) 70%, #0f0b07 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 35%, rgba(15,11,7,0.55) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>
        <div className="ornament" style={{ marginBottom: 22 }}>
          <Flame size={15} color="#F97316" />
        </div>

        <p className="fb gold" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>
          Greda Estate, Teshie · Accra, Ghana
        </p>

        <h1
          className="fd hero-h1 glow"
          style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: 700, lineHeight: 1.08, color: '#fff', marginBottom: 22 }}
        >
          Where Every Meal<br />
          <em style={{ color: '#F97316' }}>Is a Statement</em>
        </h1>

        <p
          className="fb"
          style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 44px' }}
        >
          Fresh Ghanaian food, grills, shawarma and more — made daily with love at Greda Estate.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-gold fb"
            onClick={() => scrollToSection('menu')}
            style={{ padding: '14px 36px', borderRadius: 50, fontSize: 15 }}
          >
            Order Now
          </button>
          <button
            className="btn-outline fb"
            onClick={() => scrollToSection('contact')}
            style={{ padding: '13px 34px', borderRadius: 50, fontSize: 15 }}
          >
            Find Us
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="bounce" style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.5 }}>
          <span className="fb" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F97316' }}>Scroll</span>
          <ChevronDown size={14} color="#F97316" />
        </div>
      </div>
    </section>
  );
}
