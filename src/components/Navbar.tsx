import { Menu, X, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  noticeActive: boolean;
  activeSection: string;
  cartCount: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  setCartOpen: (v: boolean) => void;
  setAdminOpen: (v: boolean) => void;
  scrollToSection: (id: string) => void;
  isOpen: boolean;
}

const NAV_LINKS = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];

export function Navbar({
  isScrolled, noticeActive, activeSection, cartCount,
  isMobileMenuOpen, setIsMobileMenuOpen, setCartOpen,
  scrollToSection, isOpen,
}: NavbarProps) {
  return (
    <nav style={{
      position: 'fixed',
      top: noticeActive ? 46 : 0,
      left: 0, right: 0, zIndex: 100,
      background: isScrolled ? 'rgba(15,11,7,0.97)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(14px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(249,115,22,0.13)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 78 }}>

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Gentleman's Kitchen"
          className="logo-img"
          style={{ cursor: 'pointer' }}
          onClick={() => scrollToSection('hero')}
        />

        {/* Desktop links */}
        <div className="hide-mob fb" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link fb ${activeSection === l.toLowerCase() ? 'active' : ''}`}
              onClick={() => scrollToSection(l.toLowerCase())}
              style={{
                color: activeSection === l.toLowerCase() ? '#F97316' : 'rgba(255,255,255,0.7)',
                fontSize: 13, fontWeight: 500, letterSpacing: '0.07em', padding: '4px 0',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}

          {/* Open/closed badge */}
          <span className={`open-badge ${isOpen ? 'open' : 'closed'}`}>
            <span className={`open-dot pulse ${isOpen ? 'open' : 'closed'}`} />
            {isOpen ? 'Open Now' : 'Closed'}
          </span>

          {/* Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative', background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.25)', color: '#F97316',
              cursor: 'pointer', borderRadius: 10, padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.15)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.08)')}
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="show-mob"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#F97316', cursor: 'pointer', display: 'none' }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fb" style={{ borderTop: '1px solid rgba(249,115,22,0.13)', padding: '8px 24px 16px', background: 'rgba(15,11,7,0.98)' }}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              onClick={() => scrollToSection(l.toLowerCase())}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
