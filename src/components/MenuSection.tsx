import { useState, useEffect, useRef } from 'react';
import { Plus, ShoppingCart, Zap, Star } from 'lucide-react';
import { MENU_CATEGORIES, DISHES } from '../data/dishes';
import { CartItem, DishSettings } from '../types';

interface MenuProps {
  settings: DishSettings;
  cart: CartItem[];
  cartTotal: number;
  cartCount: number;
  isOpen: boolean;
  addToCart: (dish: typeof DISHES[0]) => void;
  updateCardQty: (dish: typeof DISHES[0], delta: number) => void;
  setCartOpen: (v: boolean) => void;
}

function SlideImage({ images, color }: { images: string[]; color: string }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (images.length <= 1) return;
    ref.current = setInterval(() => setIdx(p => (p + 1) % images.length), 3000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [images.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 160, overflow: 'hidden' }}>
      {images.map((src, i) => (
        <img key={src} src={src} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: i === idx ? 1 : 0,
          transition: 'opacity 0.9s ease',
          filter: 'brightness(0.7)',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(13,9,4,0.92) 100%)' }} />
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 8, right: 10, display: 'flex', gap: 4 }}>
          {images.map((_, i) => (
            <div key={i} style={{ width: i === idx ? 16 : 5, height: 5, borderRadius: 3, background: i === idx ? color : 'rgba(255,255,255,0.3)', transition: 'all 0.4s' }} />
          ))}
        </div>
      )}
    </div>
  );
}

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (((h << 5) - h) + s.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
}

export function MenuSection({ cart, cartTotal, cartCount, isOpen, addToCart, setCartOpen }: MenuProps) {
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAdd = (catName: string, itemName: string, price: number) => {
    const match = DISHES.find(d =>
      itemName.toLowerCase().includes(d.name.toLowerCase()) ||
      catName.toLowerCase().includes(d.name.toLowerCase())
    );
    addToCart(match
      ? { ...match, name: itemName, price }
      : { id: hashCode(itemName), name: itemName, details: catName, description: '', price, priceNote: `₵${price}`, image: '', tag: '' }
    );
    setAddedItem(itemName);
    setCartOpen(true);
    setTimeout(() => setAddedItem(null), 1400);
  };

  // Categories with 2 items get 1 col, 3-4 get 2 col in grid, 5-7 get full width
  // We group categories by display size for grid layout
  const smallCats = MENU_CATEGORIES.filter(c => c.items.length <= 2);   // 2 items
  const medCats   = MENU_CATEGORIES.filter(c => c.items.length >= 3 && c.items.length <= 4); // 3-4 items
  const largeCats = MENU_CATEGORIES.filter(c => c.items.length >= 5);   // 5+ items

  const renderItem = (catName: string, color: string, itemName: string, price: string) => {
    const priceNum = parseInt(price.replace('₵', ''));
    const justAdded = addedItem === itemName;
    return (
      <div key={itemName} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: justAdded ? `${color}12` : 'transparent',
        transition: 'background 0.3s',
        gap: 10,
      }}>
        <span className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', fontWeight: 500, flex: 1, lineHeight: 1.35 }}>
          {itemName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <span className="fd" style={{ fontSize: 17, fontWeight: 700, color }}>
            {price}
          </span>
          <button
            onClick={() => handleAdd(catName, itemName, priceNum)}
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: justAdded ? '#22c55e' : `linear-gradient(135deg, ${color}, ${color}aa)`,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 3px 10px ${color}44`,
              transition: 'all 0.2s',
              transform: justAdded ? 'scale(1.25)' : 'scale(1)',
              flexShrink: 0,
            }}
          >
            <Plus size={14} color="#fff" strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  };

  const renderCard = (cat: typeof MENU_CATEGORIES[0]) => (
    <div key={cat.id} style={{
      borderRadius: 18, overflow: 'hidden',
      border: cat.id === 'sunday-special'
        ? `1.5px solid ${cat.color}`
        : `1px solid rgba(255,255,255,0.08)`,
      background: '#130f06',
      boxShadow: cat.id === 'sunday-special' ? `0 0 24px ${cat.color}22` : 'none',
      display: 'flex', flexDirection: 'column',
      height: '100%',
    }}>
      {/* Image */}
      <SlideImage images={cat.images} color={cat.color} />

      {/* Category title */}
      <div style={{
        padding: '14px 18px 10px',
        borderBottom: `2px solid ${cat.color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div className="fd" style={{ fontSize: 22, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            {cat.name}
            {cat.id === 'sunday-special' && <Star size={16} color={cat.color} fill={cat.color} />}
          </div>
          <div className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
            {cat.items.length} item{cat.items.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div style={{
          background: `${cat.color}22`,
          border: `1px solid ${cat.color}44`,
          borderRadius: 8, padding: '3px 10px',
        }}>
          <span className="fb" style={{ fontSize: 11, color: cat.color, fontWeight: 700, letterSpacing: '0.05em' }}>MENU</span>
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1 }}>
        {cat.items.map(item => renderItem(cat.name, cat.color, item.name, item.price))}
      </div>
    </div>
  );

  return (
    <section id="menu" style={{ padding: '100px 24px', background: '#110d07' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>What We Serve</p>
          <h2 className="fd" style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            Our <em className="gold">Full Menu</em>
          </h2>
          <p className="fb" style={{ marginTop: 14, fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 400, margin: '14px auto 0' }}>
            Tap + on any dish to add it to your order
          </p>
          <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
            <span className="tag tag-quick fb" style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Zap size={11} /> Quick Delivery</span>
            <span className={`open-badge ${isOpen ? 'open' : 'closed'}`}>
              <span className={`open-dot pulse ${isOpen ? 'open' : 'closed'}`} />
              {isOpen ? 'Open Now · Food ready from 11AM' : 'Currently Closed · Opens 6AM'}
            </span>
          </div>
        </div>

        {/* ── LARGE CATEGORIES (5+ items) — 3-col ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
          {largeCats.map(renderCard)}
        </div>

        {/* ── MEDIUM CATEGORIES (3-4 items) — 2-col ── */}
        {medCats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 20 }}>
            {medCats.map(renderCard)}
          </div>
        )}

        {/* ── SMALL CATEGORIES (2 items) — side by side, equal height ── */}
        {smallCats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(smallCats.length, 3)}, 1fr)`, gap: 20, marginBottom: 20, alignItems: 'stretch' }}>
            {smallCats.map(cat => (
              <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {renderCard(cat)}
              </div>
            ))}
          </div>
        )}

        {/* View order CTA */}
        {cartCount > 0 && (
          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <button
              className="btn-gold fb"
              onClick={() => setCartOpen(true)}
              style={{ padding: '16px 40px', borderRadius: 50, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 12 }}
            >
              <ShoppingCart size={18} />
              View Order ({cartCount} item{cartCount !== 1 ? 's' : ''}) · ₵{cartTotal}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}