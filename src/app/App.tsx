import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

import '../styles/globals.css';

import { DISHES } from '../data/dishes';
import { loadSettings, saveSettings, loadNotice, saveNotice, getDishSetting } from '../data/storage';
import { useCart } from '../hooks/useCart';
import { useScrollReveal } from '../hooks/useScrollReveal';

import { HolidayBanner } from '../components/HolidayBanner';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { MenuSection } from '../components/MenuSection';
import { About } from '../components/About';
import { WhyUs } from '../components/WhyUs';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { AdminPanel } from '../components/AdminPanel';

import { DishSettings, Notice } from '../types';

export default function App() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('hero');
  const [isOpen, setIsOpen]                 = useState(false);
  const [settings, setSettings]             = useState<DishSettings>(loadSettings);
  const [notice, setNotice]                 = useState<Notice>(loadNotice);
  const [adminOpen, setAdminOpen]           = useState(false);

  const cart = useCart();
  useScrollReveal();

  // ── Check restaurant open (opens 6AM, closes 10PM) ──
  useEffect(() => {
    const check = () => { const h = new Date().getHours(); setIsOpen(h >= 6 && h < 23); };
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Section tracking ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.2 }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Admin hash route ──
  useEffect(() => {
    if (window.location.hash === '#admin') setAdminOpen(true);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleSetting = (id: number, key: 'available' | 'quickDelivery') => {
    const current = getDishSetting(settings, id);
    const updated = { ...settings, [id]: { ...current, [key]: !current[key] } };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveNotice = (n: Notice) => {
    setNotice(n);
    saveNotice(n);
  };

  return (
    <div style={{ background: '#0f0b07', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Holiday/break banner */}
      <HolidayBanner notice={notice} />

      {/* Floating cart button */}
      {cart.cartCount > 0 && (
        <button className="float-cart pop" onClick={() => cart.setCartOpen(true)}>
          <ShoppingCart size={18} />
          View Order
          <span className="cart-badge">{cart.cartCount}</span>
        </button>
      )}

      {/* Cart drawer */}
      <CartDrawer
        cart={cart.cart}
        cartTotal={cart.cartTotal}
        cartCount={cart.cartCount}
        cartOpen={cart.cartOpen}
        orderNote={cart.orderNote}
        orderType={cart.orderType}
        orderSent={cart.orderSent}
        lastOrderNum={cart.lastOrderNum}
        setCartOpen={cart.setCartOpen}
        setOrderNote={cart.setOrderNote}
        setOrderType={cart.setOrderType}
        updateQty={cart.updateQty}
        removeFromCart={cart.removeFromCart}
        sendWhatsAppOrder={cart.sendWhatsAppOrder}
        callToOrder={cart.callToOrder}
      />

      {/* Admin panel */}
      <AdminPanel
        dishes={DISHES}
        settings={settings}
        notice={notice}
        adminOpen={adminOpen}
        setAdminOpen={setAdminOpen}
        toggleSetting={toggleSetting}
        saveNoticeSettings={handleSaveNotice}
      />

      {/* Navigation */}
      <Navbar
        isScrolled={isScrolled}
        noticeActive={notice.active}
        activeSection={activeSection}
        cartCount={cart.cartCount}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setCartOpen={cart.setCartOpen}
        setAdminOpen={setAdminOpen}
        scrollToSection={scrollToSection}
        isOpen={isOpen}
      />

      {/* Page sections */}
      <Hero scrollToSection={scrollToSection} />

      <MenuSection
        dishes={DISHES}
        settings={settings}
        cart={cart.cart}
        cartTotal={cart.cartTotal}
        cartCount={cart.cartCount}
        isOpen={isOpen}
        addToCart={cart.addToCart}
        updateCardQty={cart.updateCardQty}
        setCartOpen={cart.setCartOpen}
      />

      <div className="divider" />
      <About />
      <div className="divider" />
      <WhyUs />
      <div className="divider" />
      <Gallery />
      <div className="divider" />
      <Contact />

      <Footer scrollToSection={scrollToSection} setAdminOpen={setAdminOpen} />
    </div>
  );
}