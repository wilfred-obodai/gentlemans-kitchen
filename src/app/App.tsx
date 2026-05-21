import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { ShoppingCart } from 'lucide-react';

import '../styles/globals.css';

import { DISHES } from '../data/dishes';
import { loadSettings, saveSettings, loadNotice, saveNotice, getDishSetting } from '../data/storage';
import { useCart } from '../hooks/useCart';

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

  // ── Check restaurant open (opens 6AM, closes 10PM) ──
  useEffect(() => {
    const check = () => { const h = new Date().getHours(); setIsOpen(h >= 6 && h < 22); };
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
=======
import { Menu, X, Phone, MapPin, Clock, ChevronDown, Flame, ShoppingCart, Plus, Minus, Trash2, Send, Lock, ToggleLeft, ToggleRight, Zap, CheckCircle, AlertTriangle, UtensilsCrossed } from 'lucide-react';

const DEFAULT_DISHES = [
  { id: 1, name: 'Jollof Rice', details: 'Rice, tomato stew, spices, your choice of chicken or beef', description: 'Smoky, authentic Ghanaian jollof with your choice of protein', price: 30, image: 'https://images.unsplash.com/photo-1628191081593-f42e0b01f7d3?w=600&q=80', tag: 'Must Try' },
  { id: 2, name: 'Grilled Chicken', details: 'Whole or half chicken, marinated in house spices, charcoal grilled', description: 'Perfectly marinated and charcoal-grilled to golden perfection', price: 45, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=600&q=80', tag: 'Bestseller' },
  { id: 3, name: 'Shawarma', details: 'Pita bread, grilled meat, coleslaw, sauce, fresh vegetables', description: 'Tender meat wrapped in soft pita with our signature house sauce', price: 25, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80', tag: 'Fan Favourite' },
  { id: 4, name: 'Banku & Soup', details: 'Banku, okro soup or groundnut soup, tilapia or beef', description: 'Traditional banku served with rich okro or groundnut soup', price: 35, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', tag: 'Local Classic' },
  { id: 5, name: 'Fried Rice', details: 'Rice, mixed vegetables, egg, sausage, your choice of protein', description: 'Wok-style fried rice with fresh vegetables and your choice of protein', price: 28, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', tag: '' },
  { id: 6, name: 'Assorted Grills', details: 'Sausage, egg, chicken, beef, served with sides', description: 'A generous mix of our finest grilled meats and sides', price: 60, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', tag: "Chef's Special" },
];

const ADMIN_PIN = '1234';
const LS_DISHES = 'gk_dish_settings';
const LS_CART = 'gk_cart';
const LS_NOTICE = 'gk_notice';
const LS_ORDER_SEQ = 'gk_order_seq';

type DishSetting = { available: boolean; quickDelivery: boolean };
type DishSettings = Record<number, DishSetting>;
type CartItem = { id: number; name: string; details: string; price: number; qty: number };
type Notice = { active: boolean; message: string; resumeDate: string };

function loadSettings(): DishSettings {
  try { const s = localStorage.getItem(LS_DISHES); return s ? JSON.parse(s) : {}; } catch { return {}; }
}
function saveSettings(s: DishSettings) { localStorage.setItem(LS_DISHES, JSON.stringify(s)); }
function loadCart(): CartItem[] {
  try { const c = localStorage.getItem(LS_CART); return c ? JSON.parse(c) : []; } catch { return []; }
}
function saveCart(c: CartItem[]) { localStorage.setItem(LS_CART, JSON.stringify(c)); }
function loadNotice(): Notice {
  try { const n = localStorage.getItem(LS_NOTICE); return n ? JSON.parse(n) : { active: false, message: '', resumeDate: '' }; }
  catch { return { active: false, message: '', resumeDate: '' }; }
}
function saveNotice(n: Notice) { localStorage.setItem(LS_NOTICE, JSON.stringify(n)); }
function getDishSetting(settings: DishSettings, id: number): DishSetting {
  return settings[id] ?? { available: true, quickDelivery: false };
}

// ── ORDER NUMBER GENERATOR ──────────────────────────────────────────────────
function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now.getFullYear().toString().slice(2)
    + String(now.getMonth() + 1).padStart(2, '0')
    + String(now.getDate()).padStart(2, '0');

  // Load stored sequence
  let stored: { date: string; seq: number } = { date: '', seq: 0 };
  try {
    const raw = localStorage.getItem(LS_ORDER_SEQ);
    if (raw) stored = JSON.parse(raw);
  } catch {}

  // Reset sequence if new day
  const seq = stored.date === dateStr ? stored.seq + 1 : 1;
  localStorage.setItem(LS_ORDER_SEQ, JSON.stringify({ date: dateStr, seq }));

  return `GK-${dateStr}-${String(seq).padStart(3, '0')}`;
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [settings, setSettings] = useState<DishSettings>(loadSettings);
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [lastOrderNum, setLastOrderNum] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [notice, setNotice] = useState<Notice>(loadNotice);
  const [noticeEdit, setNoticeEdit] = useState<Notice>(loadNotice);

  useEffect(() => {
    const checkOpen = () => { const h = new Date().getHours(); setIsOpen(h >= 11 && h < 22); };
    checkOpen();
    const t = setInterval(checkOpen, 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.2 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => { if (window.location.hash === '#admin') setAdminOpen(true); }, []);
  useEffect(() => { saveCart(cart); }, [cart]);
>>>>>>> 68fd861a73187b09ac079ea3dce337e7f560251a

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

<<<<<<< HEAD
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
=======
  // ── CART LOGIC ──
  const addToCart = (dish: typeof DEFAULT_DISHES[0]) => {
    const s = getDishSetting(settings, dish.id);
    if (!s.available) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (existing) return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: dish.id, name: dish.name, details: dish.details, price: dish.price, qty: 1 }];
    });
  };

  const updateCardQty = (dish: typeof DEFAULT_DISHES[0], delta: number) => {
    const s = getDishSetting(settings, dish.id);
    if (!s.available) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (!existing && delta > 0) {
        return [...prev, { id: dish.id, name: dish.name, details: dish.details, price: dish.price, qty: 1 }];
      }
      if (!existing) return prev;
      const newQty = existing.qty + delta;
      if (newQty <= 0) return prev.filter(i => i.id !== dish.id);
      return prev.map(i => i.id === dish.id ? { ...i, qty: newQty } : i);
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const orderNum = generateOrderNumber();
    setLastOrderNum(orderNum);
    const itemLines = cart.map(i => `• ${i.qty}x ${i.name}${i.details ? ` (${i.details})` : ''} — ₵${i.price * i.qty}`).join('\n');
    const typeLine = orderType === 'delivery' ? '🛵 Delivery' : '🏃 Pickup';
    const noteLine = orderNote.trim() ? `\n📝 Note: ${orderNote.trim()}` : '';
    const msg = `Hi Gentleman's Kitchen! 👋\n\nOrder No: ${orderNum}\n\n${itemLines}\n\nTotal: ₵${cartTotal}\n📦 ${typeLine}${noteLine}\n\nKindly confirm. Thank you! 🙏`;
    window.open(`https://wa.me/233592730579?text=${encodeURIComponent(msg)}`, '_blank');
    setOrderSent(true);
    setTimeout(() => { setOrderSent(false); setCart([]); setCartOpen(false); setOrderNote(''); setLastOrderNum(''); }, 4000);
  };

  const callToOrder = () => window.open('tel:+233592730579');

  const handleAdminLogin = () => {
    if (pinInput === ADMIN_PIN) { setAdminAuthed(true); setPinError(false); }
    else { setPinError(true); setPinInput(''); }
  };

  const toggleSetting = (id: number, key: 'available' | 'quickDelivery') => {
    const current = getDishSetting(settings, id);
    const updated = { ...settings, [id]: { ...current, [key]: !current[key] } };
    setSettings(updated); saveSettings(updated);
  };

  const saveNoticeSettings = () => { setNotice(noticeEdit); saveNotice(noticeEdit); };

  const navLinks = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];

  const features = [
    { icon: '🔥', title: 'Fresh Grills Daily', description: 'Every dish is charcoal-grilled fresh. No reheating, no shortcuts — ever.' },
    { icon: '🇬🇭', title: 'Authentic Ghanaian', description: 'Recipes passed down and perfected. Flavors that taste like home.' },
    { icon: '⚡', title: 'Fast & Friendly', description: 'Quick service, warm smiles — quality food without the long wait.' },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1603496987674-79600a000f55?w=800&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    'https://images.unsplash.com/photo-1665332195309-9d75071138f0?w=800&q=80',
    'https://images.unsplash.com/photo-1628191081593-f42e0b01f7d3?w=800&q=80',
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=800&q=80',
    'https://images.unsplash.com/photo-1687422808277-2334638f09fb?w=800&q=80',
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#0f0b07;overflow-x:hidden;}
    .fd{font-family:'Cormorant Garamond',Georgia,serif;}
    .fb{font-family:'Outfit',system-ui,sans-serif;}
    .gold{color:#F97316;}
    .glow{text-shadow:0 0 50px rgba(249,115,22,0.3);}
    #grain{position:fixed;inset:0;z-index:9999;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:0.032;}
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(249,115,22,0.4),transparent);}

    .btn-gold{background:linear-gradient(135deg,#F97316 0%,#ea6000 60%,#F97316 100%);background-size:200% 200%;color:#fff;font-weight:700;border:none;cursor:pointer;box-shadow:0 4px 24px rgba(249,115,22,0.35);transition:all 0.4s ease;}
    .btn-gold:hover{background-position:right;box-shadow:0 6px 36px rgba(249,115,22,0.55);transform:translateY(-2px);}
    .btn-outline{border:1.5px solid rgba(249,115,22,0.5);color:#F97316;background:transparent;cursor:pointer;transition:all 0.3s ease;}
    .btn-outline:hover{background:rgba(249,115,22,0.08);border-color:#F97316;}
    .btn-wa{background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;border:none;cursor:pointer;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,0.3);transition:all 0.3s ease;font-weight:600;}
    .btn-wa:hover{box-shadow:0 6px 30px rgba(37,211,102,0.5);transform:translateY(-2px);}
    .btn-call{background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;border:none;cursor:pointer;text-decoration:none;box-shadow:0 4px 20px rgba(59,130,246,0.3);transition:all 0.3s ease;font-weight:600;}
    .btn-call:hover{box-shadow:0 6px 30px rgba(59,130,246,0.5);transform:translateY(-2px);}

    .nav-link{position:relative;cursor:pointer;background:none;border:none;transition:color 0.3s;}
    .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:#F97316;transition:width 0.3s;}
    .nav-link:hover::after,.nav-link.active::after{width:100%;}
    .nav-link:hover,.nav-link.active{color:#F97316!important;}

    /* Holiday banner */
    .holiday-banner{background:linear-gradient(135deg,#7c2d12,#9a3412);border-bottom:1px solid rgba(249,115,22,0.4);padding:12px 24px;text-align:center;position:relative;z-index:99;}

    /* Dish card */
    .dish-card{background:linear-gradient(145deg,#1c1509,#130f06);border:1px solid rgba(249,115,22,0.1);border-radius:20px;overflow:hidden;transition:all 0.4s ease;position:relative;}
    .dish-card:hover{border-color:rgba(249,115,22,0.4);transform:translateY(-5px);box-shadow:0 24px 60px rgba(0,0,0,0.5),0 0 30px rgba(249,115,22,0.08);}
    .dish-card.unavailable{opacity:0.5;filter:grayscale(0.6);}
    .dish-img{width:100%;height:200px;object-fit:cover;display:block;transition:transform 0.5s ease;}
    .dish-card:hover .dish-img{transform:scale(1.05);}

    /* Order button → transforms to qty control */
    .order-btn{background:linear-gradient(135deg,#F97316,#ea6000);color:#fff;border:none;cursor:pointer;border-radius:10px;padding:9px 20px;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.04em;box-shadow:0 4px 16px rgba(249,115,22,0.4);transition:all 0.3s;flex-shrink:0;}
    .order-btn:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(249,115,22,0.6);}
    .order-btn:disabled{background:#333;box-shadow:none;cursor:not-allowed;opacity:0.5;}

    /* Inline qty control on card */
    .card-qty{display:flex;align-items:center;gap:0;border-radius:10px;overflow:hidden;border:1.5px solid rgba(249,115,22,0.5);flex-shrink:0;}
    .card-qty-btn{background:rgba(249,115,22,0.12);color:#F97316;border:none;cursor:pointer;width:34px;height:36px;display:flex;align-items:center;justify-content:center;transition:background 0.2s;font-size:16px;font-weight:700;}
    .card-qty-btn:hover{background:rgba(249,115,22,0.28);}
    .card-qty-num{background:rgba(249,115,22,0.08);color:#fff;min-width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:800;font-size:15px;border-left:1px solid rgba(249,115,22,0.2);border-right:1px solid rgba(249,115,22,0.2);}
    .card-qty-price{font-family:'Outfit',sans-serif;font-size:11px;font-weight:600;color:#F97316;text-align:right;margin-top:4px;}

    .in-cart-badge{position:absolute;top:12px;right:12px;background:rgba(249,115,22,0.95);color:#fff;font-weight:800;font-size:11px;padding:3px 10px;border-radius:20px;font-family:'Outfit',sans-serif;}

    /* Pickup/Delivery */
    .type-toggle{display:flex;background:rgba(255,255,255,0.05);border-radius:12px;padding:4px;gap:4px;margin-bottom:16px;}
    .type-btn{flex:1;padding:10px;border:none;border-radius:9px;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;font-size:14px;transition:all 0.3s;}
    .type-btn.active{background:linear-gradient(135deg,#F97316,#ea6000);color:#fff;box-shadow:0 4px 12px rgba(249,115,22,0.4);}
    .type-btn.inactive{background:transparent;color:rgba(255,255,255,0.5);}

    /* Note input */
    .note-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:12px 14px;color:#fff;font-family:'Outfit',sans-serif;font-size:14px;resize:none;outline:none;transition:border 0.3s;}
    .note-input:focus{border-color:rgba(249,115,22,0.5);}
    .note-input::placeholder{color:rgba(255,255,255,0.3);}

    /* Order number display */
    .order-num-box{background:linear-gradient(135deg,rgba(249,115,22,0.12),rgba(249,115,22,0.06));border:1px solid rgba(249,115,22,0.35);border-radius:12px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}

    /* Feature card */
    .feat-card{background:linear-gradient(145deg,#1c1509,#130f06);border:1px solid rgba(249,115,22,0.1);border-radius:20px;padding:44px 32px;text-align:center;transition:all 0.4s ease;}
    .feat-card:hover{border-color:rgba(249,115,22,0.35);transform:translateY(-4px);box-shadow:0 16px 50px rgba(0,0,0,0.45);}

    /* Gallery */
    .gal-item{overflow:hidden;border-radius:16px;border:1.5px solid rgba(249,115,22,0.12);transition:all 0.4s;position:relative;}
    .gal-item:hover{border-color:rgba(249,115,22,0.5);box-shadow:0 0 30px rgba(249,115,22,0.12);}
    .gal-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease;}
    .gal-item:hover img{transform:scale(1.07);}
    .gal-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,11,7,0.75) 0%,transparent 55%);opacity:0;transition:opacity 0.4s;}
    .gal-item:hover .gal-overlay{opacity:1;}

    /* Tags */
    .tag{font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.3);color:#F97316;padding:3px 10px;border-radius:20px;}
    .tag-quick{background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#22c55e;}
    .tag-unavail{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;}

    /* Cart */
    .cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:200;backdrop-filter:blur(4px);}
    .cart-drawer{position:fixed;right:0;top:0;bottom:0;width:440px;max-width:95vw;background:linear-gradient(to bottom,#1a1208,#110d06);border-left:1px solid rgba(249,115,22,0.2);z-index:201;display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,0.6);}
    .cart-item{display:flex;gap:12px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);}
    .qty-btn{background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);color:#F97316;cursor:pointer;border-radius:8px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
    .qty-btn:hover{background:rgba(249,115,22,0.2);}

    /* Float cart */
    .float-cart{position:fixed;bottom:28px;right:28px;z-index:150;background:linear-gradient(135deg,#F97316,#ea6000);color:#fff;border:none;cursor:pointer;border-radius:50px;padding:14px 22px;display:flex;align-items:center;gap:10px;box-shadow:0 6px 30px rgba(249,115,22,0.5);transition:all 0.3s;font-family:'Outfit',sans-serif;font-weight:700;font-size:15px;}
    .float-cart:hover{transform:translateY(-3px);box-shadow:0 10px 40px rgba(249,115,22,0.65);}
    .cart-badge{background:#ef4444;color:#fff;border-radius:50%;width:20px;height:20px;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;}

    /* Open badge */
    .open-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;font-family:'Outfit',sans-serif;}
    .open-badge.open{background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#22c55e;}
    .open-badge.closed{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;}
    .open-dot{width:7px;height:7px;border-radius:50%;}
    .open-dot.open{background:#22c55e;box-shadow:0 0 6px #22c55e;}
    .open-dot.closed{background:#ef4444;}

    /* Admin */
    .admin-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:300;backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;}
    .admin-panel{background:linear-gradient(145deg,#1c1509,#110d06);border:1px solid rgba(249,115,22,0.25);border-radius:24px;width:100%;max-width:700px;max-height:92vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,0.7);}
    .admin-toggle{cursor:pointer;border:none;background:none;display:flex;align-items:center;gap:8px;}
    .admin-section{padding:20px 32px;border-bottom:1px solid rgba(255,255,255,0.06);}
    .admin-input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(249,115,22,0.2);border-radius:10px;padding:10px 14px;color:#fff;font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border 0.3s;margin-bottom:8px;}
    .admin-input:focus{border-color:rgba(249,115,22,0.5);}
    .admin-input::placeholder{color:rgba(255,255,255,0.3);}

    .ornament{display:flex;align-items:center;gap:12px;justify-content:center;}
    .ornament::before,.ornament::after{content:'';flex:0 0 50px;height:1px;}
    .ornament::before{background:linear-gradient(90deg,transparent,rgba(249,115,22,0.5));}
    .ornament::after{background:linear-gradient(90deg,rgba(249,115,22,0.5),transparent);}

    @keyframes bounce-slow{0%,100%{transform:translateY(0);opacity:.6;}50%{transform:translateY(8px);opacity:.2;}}
    .bounce{animation:bounce-slow 2s ease-in-out infinite;}
    @keyframes pulse-dot{0%,100%{opacity:1;}50%{opacity:0.4;}}
    .pulse{animation:pulse-dot 1.5s ease-in-out infinite;}
    @keyframes slide-in{from{transform:translateX(100%);}to{transform:translateX(0);}}
    .slide-in{animation:slide-in 0.3s ease;}
    @keyframes pop{0%{transform:scale(0.8);opacity:0;}100%{transform:scale(1);opacity:1;}}
    .pop{animation:pop 0.25s ease;}
    @keyframes qty-pop{0%{transform:scale(1.3);}100%{transform:scale(1);}}
    .qty-pop{animation:qty-pop 0.15s ease;}
    @keyframes banner-pulse{0%,100%{opacity:1;}50%{opacity:0.85;}}
    .banner-pulse{animation:banner-pulse 3s ease-in-out infinite;}

    ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#0a0703;} ::-webkit-scrollbar-thumb{background:rgba(249,115,22,0.35);border-radius:3px;}
    @media(max-width:768px){.hide-mob{display:none!important;}.show-mob{display:flex!important;}.grid-2{grid-template-columns:1fr!important;}.grid-3{grid-template-columns:1fr 1fr!important;}.cart-drawer{width:100vw;}.hero-h1{font-size:42px!important;}}
    @media(min-width:769px){.show-mob{display:none!important;}}
  `;

  return (
    <div style={{ background: '#0f0b07', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{css}</style>
      <div id="grain" />

      {/* ── HOLIDAY BANNER ── */}
      {notice.active && notice.message && (
        <div className="holiday-banner banner-pulse">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            <AlertTriangle size={16} color="#F97316" />
            <span className="fb" style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>{notice.message}</span>
            {notice.resumeDate && (
              <span className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                — Resuming: <strong style={{ color: '#F97316' }}>{notice.resumeDate}</strong>
              </span>
            )}
            <AlertTriangle size={16} color="#F97316" />
          </div>
        </div>
      )}

      {/* ── FLOATING CART ── */}
      {cartCount > 0 && (
        <button className="float-cart pop" onClick={() => setCartOpen(true)}>
          <ShoppingCart size={18} />
          View Order
          <span className="cart-badge">{cartCount}</span>
        </button>
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setCartOpen(false)} />
          <div className="cart-drawer slide-in">
            <div style={{ padding: '22px 28px', borderBottom: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <div className="fd gold" style={{ fontSize: 24, fontWeight: 700 }}>Your Order</div>
                <div className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{cartCount} item{cartCount !== 1 ? 's' : ''} · ₵{cartTotal}</div>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
                  <ShoppingCart size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p className="fb" style={{ fontSize: 15 }}>Your cart is empty</p>
                  <p className="fb" style={{ fontSize: 13, marginTop: 6 }}>Add dishes from the menu</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="fb" style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2, lineHeight: 1.5 }}>{item.details}</div>
                    <div className="fb gold" style={{ fontSize: 13, marginTop: 4 }}>₵{item.price} each</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><Minus size={13} /></button>
                      <span className="fb" style={{ fontSize: 16, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}><Plus size={13} /></button>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'rgba(239,68,68,0.7)', cursor: 'pointer' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="fb gold" style={{ fontSize: 15, fontWeight: 700 }}>₵{item.price * item.qty}</div>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '16px 28px 24px', borderTop: '1px solid rgba(249,115,22,0.15)', flexShrink: 0 }}>
                {/* Pickup / Delivery */}
                <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontWeight: 700, letterSpacing: '0.08em' }}>ORDER TYPE</div>
                <div className="type-toggle">
                  <button className={`type-btn fb ${orderType === 'delivery' ? 'active' : 'inactive'}`} onClick={() => setOrderType('delivery')}>🛵 Delivery</button>
                  <button className={`type-btn fb ${orderType === 'pickup' ? 'active' : 'inactive'}`} onClick={() => setOrderType('pickup')}>🏃 Pickup</button>
                </div>

                {/* Note */}
                <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontWeight: 700, letterSpacing: '0.08em' }}>
                  ADD A NOTE <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
                </div>
                <textarea className="note-input fb" rows={2}
                  placeholder="e.g. Extra spice, no onions, delivery address..."
                  value={orderNote} onChange={e => setOrderNote(e.target.value)}
                  style={{ marginBottom: 16 }} />

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="fb" style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Total</span>
                  <span className="fd gold" style={{ fontSize: 28, fontWeight: 700 }}>₵{cartTotal}</span>
                </div>

                {orderSent ? (
                  <div style={{ textAlign: 'center', padding: '20px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 14 }}>
                    <CheckCircle size={32} color="#22c55e" style={{ margin: '0 auto 10px' }} />
                    <div className="fb" style={{ color: '#22c55e', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Order Placed! ✓</div>
                    {lastOrderNum && (
                      <div style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 8, padding: '8px 16px', display: 'inline-block' }}>
                        <span className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Order No: </span>
                        <span className="fb" style={{ fontSize: 15, fontWeight: 800, color: '#F97316' }}>{lastOrderNum}</span>
                      </div>
                    )}
                    <p className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>Check your WhatsApp to confirm</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button className="btn-wa fb" onClick={sendWhatsAppOrder}
                      style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      Order via WhatsApp
                      <Send size={14} />
                    </button>
                    <button className="btn-call fb" onClick={callToOrder}
                      style={{ width: '100%', padding: '13px', borderRadius: 12, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <Phone size={16} /> Call to Order
                    </button>
                  </div>
                )}
                <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 10 }}>
                  WhatsApp sends your full order + order number ✓
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── ADMIN PANEL ── */}
      {adminOpen && (
        <div className="admin-overlay">
          <div className="admin-panel">
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={18} color="#F97316" />
                </div>
                <div>
                  <div className="fd gold" style={{ fontSize: 22, fontWeight: 700 }}>Admin Panel</div>
                  <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Gentleman's Kitchen</div>
                </div>
              </div>
              <button onClick={() => { setAdminOpen(false); setAdminAuthed(false); setPinInput(''); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            {!adminAuthed ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <Lock size={40} color="rgba(249,115,22,0.4)" style={{ margin: '0 auto 20px' }} />
                <h3 className="fd" style={{ fontSize: 22, color: '#fff', marginBottom: 8 }}>Enter Admin PIN</h3>
                <p className="fb" style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Only for restaurant staff</p>
                <input type="password" value={pinInput}
                  onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  placeholder="Enter PIN" maxLength={6} className="fb"
                  style={{ width: '100%', maxWidth: 260, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${pinError ? '#ef4444' : 'rgba(249,115,22,0.25)'}`, color: '#fff', fontSize: 18, textAlign: 'center', letterSpacing: '0.2em', outline: 'none', marginBottom: 16 }}
                  autoFocus />
                {pinError && <p className="fb" style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>Wrong PIN. Try again.</p>}
                <br />
                <button className="btn-gold fb" onClick={handleAdminLogin} style={{ padding: '13px 36px', borderRadius: 50, fontSize: 15 }}>Unlock</button>
                <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>Default PIN: 1234 — change before launch</p>
              </div>
            ) : (
              <>
                {/* Holiday notice */}
                <div className="admin-section">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <AlertTriangle size={18} color="#F97316" />
                    <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Holiday / Break Notice</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div>
                      <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Show Banner on Website</div>
                      <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Displays your message at the top of the site</div>
                    </div>
                    <button className="admin-toggle" onClick={() => setNoticeEdit(prev => ({ ...prev, active: !prev.active }))}>
                      {noticeEdit.active ? <ToggleRight size={32} color="#22c55e" /> : <ToggleLeft size={32} color="rgba(255,255,255,0.25)" />}
                    </button>
                  </div>
                  <input className="admin-input fb" placeholder="e.g. We are on holiday 🎉 or Kitchen closed today" value={noticeEdit.message}
                    onChange={e => setNoticeEdit(prev => ({ ...prev, message: e.target.value }))} />
                  <input className="admin-input fb" placeholder="Resuming date e.g. Monday 26th May 2025" value={noticeEdit.resumeDate}
                    onChange={e => setNoticeEdit(prev => ({ ...prev, resumeDate: e.target.value }))} />
                  <button className="btn-gold fb" onClick={saveNoticeSettings}
                    style={{ padding: '11px 24px', borderRadius: 10, fontSize: 14, marginTop: 4 }}>
                    Save Notice
                  </button>
                </div>

                {/* Dish management */}
                <div className="admin-section" style={{ borderBottom: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <UtensilsCrossed size={18} color="#F97316" />
                    <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Dish Availability</span>
                  </div>
                  <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Toggle availability and quick delivery per dish.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {DEFAULT_DISHES.map(dish => {
                      const s = getDishSetting(settings, dish.id);
                      return (
                        <div key={dish.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <img src={dish.image} alt={dish.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{dish.name}</div>
                            <div className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{dish.details}</div>
                            <div className="fb gold" style={{ fontSize: 13, marginTop: 2 }}>₵{dish.price}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                            <button className="admin-toggle" onClick={() => toggleSetting(dish.id, 'available')}>
                              {s.available ? <ToggleRight size={28} color="#22c55e" /> : <ToggleLeft size={28} color="rgba(255,255,255,0.25)" />}
                            </button>
                            <span className="fb" style={{ fontSize: 9, color: s.available ? '#22c55e' : 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                              {s.available ? 'AVAIL.' : 'OFF'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                            <button className="admin-toggle" onClick={() => toggleSetting(dish.id, 'quickDelivery')}>
                              {s.quickDelivery ? <Zap size={20} color="#F97316" fill="#F97316" /> : <Zap size={20} color="rgba(255,255,255,0.2)" />}
                            </button>
                            <span className="fb" style={{ fontSize: 9, color: s.quickDelivery ? '#F97316' : 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>QUICK</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)' }}>
                    <p className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                      💡 <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Available</strong> — shows on menu. Off = Sold Out.<br />
                      ⚡ <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Quick</strong> — shows Fast Delivery badge.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'fixed', top: notice.active ? 46 : 0, left: 0, right: 0, zIndex: 100, background: isScrolled ? 'rgba(15,11,7,0.97)' : 'transparent', backdropFilter: isScrolled ? 'blur(14px)' : 'none', borderBottom: isScrolled ? '1px solid rgba(249,115,22,0.13)' : '1px solid transparent', transition: 'all 0.4s ease' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 78 }}>
          <div className="fd gold glow" style={{ fontSize: 21, fontWeight: 700, cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
            Gentleman's Kitchen
          </div>
          <div className="hide-mob fb" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map((l) => (
              <button key={l} className={`nav-link fb ${activeSection === l.toLowerCase() ? 'active' : ''}`}
                onClick={() => scrollToSection(l.toLowerCase())}
                style={{ color: activeSection === l.toLowerCase() ? '#F97316' : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, letterSpacing: '0.07em', padding: '4px 0' }}>
                {l.toUpperCase()}
              </button>
            ))}
            <span className={`open-badge ${isOpen ? 'open' : 'closed'}`}>
              <span className={`open-dot pulse ${isOpen ? 'open' : 'closed'}`} />
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
            <button onClick={() => setCartOpen(true)} style={{ position: 'relative', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', color: '#F97316', cursor: 'pointer', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.15)')}
              onMouseOut={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.08)')}>
              <ShoppingCart size={17} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
          <button className="show-mob" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#F97316', cursor: 'pointer', display: 'none' }}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="fb" style={{ borderTop: '1px solid rgba(249,115,22,0.13)', padding: '8px 24px 16px', background: 'rgba(15,11,7,0.98)' }}>
            {navLinks.map(l => (
              <button key={l} onClick={() => scrollToSection(l.toLowerCase())}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1920&q=80" alt="Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.2) brightness(0.48)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(15,11,7,0.5) 0%,rgba(15,11,7,0.35) 35%,rgba(15,11,7,0.8) 75%,#0f0b07 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,transparent 35%,rgba(15,11,7,0.65) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 840, margin: '0 auto' }}>
          <div className="ornament" style={{ marginBottom: 22 }}><Flame size={15} color="#F97316" /></div>
          <p className="fb gold" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>
            Greda Estate, Teshie · Accra, Ghana
          </p>
          <h1 className="fd hero-h1 glow" style={{ fontSize: 'clamp(46px,8vw,90px)', fontWeight: 700, lineHeight: 1.08, color: '#fff', marginBottom: 22 }}>
            Where Every Meal<br /><em style={{ color: '#F97316' }}>Is a Statement</em>
          </h1>
          <p className="fb" style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 44px' }}>
            Fresh grills, authentic Ghanaian flavors, and good food done right — every single day.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold fb" onClick={() => scrollToSection('menu')} style={{ padding: '14px 36px', borderRadius: 50, fontSize: 15 }}>Order Now</button>
            <button className="btn-outline fb" onClick={() => scrollToSection('contact')} style={{ padding: '13px 34px', borderRadius: 50, fontSize: 15 }}>Find Us</button>
          </div>
          <div className="bounce" style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.5 }}>
            <span className="fb" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F97316' }}>Scroll</span>
            <ChevronDown size={14} color="#F97316" />
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{ padding: '100px 24px', background: '#110d07' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 68 }}>
            <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>What We Serve</p>
            <h2 className="fd" style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
              Our <em className="gold">Signature Dishes</em>
            </h2>
            <p className="fb" style={{ marginTop: 14, fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 400, margin: '14px auto 0' }}>
              Tap a dish to add it to your order
            </p>
            <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
              <span className="tag tag-quick fb" style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Zap size={11} /> Quick Delivery</span>
              <span className="tag-unavail tag fb">Sold Out</span>
              <span className={`open-badge ${isOpen ? 'open' : 'closed'}`}>
                <span className={`open-dot pulse ${isOpen ? 'open' : 'closed'}`} />
                {isOpen ? 'Open Now · Delivers from 11AM' : 'Currently Closed · Opens 11AM'}
              </span>
            </div>
          </div>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {DEFAULT_DISHES.map(dish => {
              const s = getDishSetting(settings, dish.id);
              const cartItem = cart.find(i => i.id === dish.id);
              const qty = cartItem?.qty ?? 0;

              return (
                <div key={dish.id} className={`dish-card ${!s.available ? 'unavailable' : ''}`}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={dish.image} alt={dish.name} className="dish-img" />
                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {dish.tag && <span className="tag">{dish.tag}</span>}
                      {s.quickDelivery && s.available && (
                        <span className="tag tag-quick fb" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Zap size={10} /> Quick
                        </span>
                      )}
                      {!s.available && <span className="tag tag-unavail">Sold Out</span>}
                    </div>
                    {qty > 0 && (
                      <div className="in-cart-badge">×{qty} in order</div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top,#1c1509,transparent)' }} />
                  </div>

                  <div style={{ padding: '18px 20px 20px' }}>
                    <h3 className="fd" style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{dish.name}</h3>
                    <p className="fb" style={{ fontSize: 12, color: '#F97316', marginBottom: 6, fontWeight: 500 }}>{dish.details}</p>
                    <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 16 }}>{dish.description}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span className="fd gold" style={{ fontSize: 28, fontWeight: 700 }}>₵{dish.price}</span>
                        {qty > 0 && (
                          <div className="card-qty-price">₵{dish.price * qty} total</div>
                        )}
                      </div>

                      {/* ── BUTTON TRANSFORMS TO QTY CONTROL ── */}
                      {!s.available ? (
                        <button className="order-btn" disabled>Sold Out</button>
                      ) : qty === 0 ? (
                        <button className="order-btn" onClick={() => updateCardQty(dish, 1)}>
                          + Order
                        </button>
                      ) : (
                        <div className="card-qty">
                          <button className="card-qty-btn" onClick={() => updateCardQty(dish, -1)}>
                            <Minus size={14} />
                          </button>
                          <div className="card-qty-num qty-pop">{qty}</div>
                          <button className="card-qty-btn" onClick={() => updateCardQty(dish, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {cartCount > 0 && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <button className="btn-gold fb" onClick={() => setCartOpen(true)}
                style={{ padding: '16px 40px', borderRadius: 50, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <ShoppingCart size={18} />
                View Order ({cartCount} item{cartCount !== 1 ? 's' : ''}) · ₵{cartTotal}
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '100px 24px', background: '#0f0b07' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 68 }}>
            <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Our Story</p>
            <h2 className="fd" style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
              The Kitchen <em className="gold">Behind the Name</em>
            </h2>
            <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
          </div>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              {["At Gentleman's Kitchen, we believe good food should be accessible, authentic, and exceptional. Located in the heart of Greda Estate, Teshie, we've become the neighbourhood's go-to spot for premium Ghanaian cuisine and perfectly grilled favourites.",
                "Every dish is prepared with care, seasoned with tradition, and served with pride. From our famous jollof rice to our signature grilled chicken — flavours that feel like home, elevated.",
                "We're more than a restaurant. We're a community gathering place where quality meets convenience, and every meal tells a story."]
                .map((p, i) => <p key={i} className="fb" style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.88, marginBottom: 18 }}>{p}</p>)}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 40 }}>
                {[{ v: '11AM', l: 'Opens Daily' }, { v: '6+', l: 'Dishes' }, { v: '★★★★★', l: 'Community Loved' }].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '18px 10px', borderRadius: 14, border: '1px solid rgba(249,115,22,0.14)', background: 'rgba(249,115,22,0.03)' }}>
                    <div className="fd gold" style={{ fontSize: s.v.includes('★') ? 14 : 26, fontWeight: 700, marginBottom: 5 }}>{s.v}</div>
                    <div className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 22, overflow: 'hidden', border: '1.5px solid rgba(249,115,22,0.22)', boxShadow: '0 32px 90px rgba(0,0,0,0.65)' }}>
                <img src="https://images.unsplash.com/photo-1687422808277-2334638f09fb?w=800&q=80" alt="Chef grilling"
                  style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -18, left: -18, background: 'linear-gradient(135deg,#F97316,#c95200)', borderRadius: 16, padding: '14px 22px', boxShadow: '0 8px 32px rgba(249,115,22,0.45)' }}>
                <div style={{ fontSize: 26 }}>🔥</div>
                <div className="fb" style={{ fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', marginTop: 4 }}>FRESH DAILY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── WHY US ── */}
      <section style={{ padding: '100px 24px', background: '#110d07' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Why Choose Us</p>
            <h2 className="fd" style={{ fontSize: 'clamp(32px,4vw,50px)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              The <em className="gold">Gentleman's Promise</em>
            </h2>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="feat-card">
                <div style={{ fontSize: 50, marginBottom: 18 }}>{f.icon}</div>
                <h3 className="fd" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{f.title}</h3>
                <p className="fb" style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.75 }}>{f.description}</p>
                <div className="divider" style={{ width: 44, margin: '24px auto 0' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding: '100px 24px', background: '#0f0b07' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 68 }}>
            <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Gallery</p>
            <h2 className="fd" style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
              A Taste of <em className="gold">What Awaits</em>
            </h2>
            <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {galleryImages.map((src, i) => (
              <div key={i} className="gal-item" style={{ height: i === 1 ? 380 : 250 }}>
                <img src={src} alt={`Food ${i + 1}`} />
                <div className="gal-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '100px 24px', background: '#110d07' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 68 }}>
            <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Come Dine With Us</p>
            <h2 className="fd" style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
              Visit <em className="gold">Gentleman's Kitchen</em>
            </h2>
            <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
          </div>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { icon: <Phone size={20} color="#F97316" />, title: 'Call Us', value: '+233 592 730 579', sub: 'Available during opening hours' },
                { icon: <MapPin size={20} color="#F97316" />, title: 'Location', value: 'Greda Estate, Teshie', sub: 'Accra, Ghana' },
                { icon: <Clock size={20} color="#F97316" />, title: 'Hours', value: 'Opens 11:00 AM Daily', sub: 'Come hungry, leave happy' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 46, height: 46, borderRadius: 12, background: 'rgba(249,115,22,0.09)', border: '1px solid rgba(249,115,22,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="fd gold" style={{ fontSize: 19, fontWeight: 700, marginBottom: 3 }}>{item.title}</h3>
                    <p className="fb" style={{ fontSize: 16, color: '#fff', marginBottom: 2 }}>{item.value}</p>
                    <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://wa.me/233592730579" target="_blank" rel="noopener noreferrer"
                  className="btn-wa fb"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 50, fontSize: 15, textDecoration: 'none' }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
                <a href="tel:+233592730579" className="btn-call fb"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 50, fontSize: 15, textDecoration: 'none' }}>
                  <Phone size={16} /> Call Us
                </a>
              </div>
            </div>
            <div style={{ borderRadius: 24, border: '1.5px solid rgba(249,115,22,0.22)', overflow: 'hidden', background: 'linear-gradient(145deg,#1c1509,#100c05)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
              <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1529622656539-5e70e717a04c?w=800&q=80" alt="Accra" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.6) brightness(0.55)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(249,100,10,0.2) 0%,transparent 65%)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 0 28px rgba(249,115,22,0.7)' }}>
                    <MapPin size={22} color="#fff" />
                  </div>
                  <div className="fd" style={{ fontSize: 18, fontWeight: 700, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>Gentleman's Kitchen</div>
                </div>
              </div>
              <div style={{ padding: '26px 30px' }}>
                <h3 className="fd gold" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Find Us at Greda Estate</h3>
                <p className="fb" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 22 }}>Teshie, Accra, Ghana · Near Spintex Road</p>
                <a href="https://maps.google.com/?q=Greda+Estate+Teshie+Accra+Ghana" target="_blank" rel="noopener noreferrer"
                  className="btn-outline fb"
                  style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 50, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080604', borderTop: '1px solid rgba(249,115,22,0.1)', padding: '56px 24px 36px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', textAlign: 'center' }}>
          <div className="fd gold glow" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Gentleman's Kitchen</div>
          <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 30, letterSpacing: '0.06em' }}>Where Every Meal Is a Statement</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 30 }}>
            {navLinks.map(l => (
              <button key={l} onClick={() => scrollToSection(l.toLowerCase())} className="fb"
                style={{ color: 'rgba(255,255,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, letterSpacing: '0.08em', transition: 'color 0.3s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#F97316')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="divider" style={{ maxWidth: 160, margin: '0 auto 22px' }} />
          <button onClick={() => setAdminOpen(true)} className="fb"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.1)', fontSize: 11, letterSpacing: '0.04em', transition: 'color 0.3s' }}
            onMouseOver={e => (e.currentTarget.style.color = 'rgba(249,115,22,0.4)')}
            onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.1)')}>
            Staff Login
          </button>
          <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 12 }}>
            © 2025 Gentleman's Kitchen · Greda Estate, Teshie, Accra, Ghana
            Powered by StacHub
          </p>
        </div>
      </footer>
    </div>
  );
}
>>>>>>> 68fd861a73187b09ac079ea3dce337e7f560251a
