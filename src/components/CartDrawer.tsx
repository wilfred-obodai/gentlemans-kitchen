import { X, ShoppingCart, Minus, Plus, Trash2, Send, Phone, CheckCircle } from 'lucide-react';
import { CartItem, OrderType } from '../types';
import { WASvg } from './WASvg';

interface CartProps {
  cart: CartItem[];
  cartTotal: number;
  cartCount: number;
  cartOpen: boolean;
  orderNote: string;
  orderType: OrderType;
  orderSent: boolean;
  lastOrderNum: string;
  setCartOpen: (v: boolean) => void;
  setOrderNote: (v: string) => void;
  setOrderType: (v: OrderType) => void;
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  sendWhatsAppOrder: () => void;
  callToOrder: () => void;
}

export function CartDrawer({
  cart, cartTotal, cartCount, cartOpen, orderNote, orderType,
  orderSent, lastOrderNum, setCartOpen, setOrderNote, setOrderType,
  updateQty, removeFromCart, sendWhatsAppOrder, callToOrder,
}: CartProps) {
  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer slide-in">

        {/* Header */}
        <div style={{ padding: '22px 28px', borderBottom: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div className="fd gold" style={{ fontSize: 24, fontWeight: 700 }}>Your Order</div>
            <div className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
              {cartCount} item{cartCount !== 1 ? 's' : ''} · ₵{cartTotal}
            </div>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Items */}
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

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 28px 24px', borderTop: '1px solid rgba(249,115,22,0.15)', flexShrink: 0 }}>

            {/* Order type */}
            <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontWeight: 700, letterSpacing: '0.08em' }}>ORDER TYPE</div>
            <div className="type-toggle">
              <button className={`type-btn fb ${orderType === 'delivery' ? 'active' : 'inactive'}`} onClick={() => setOrderType('delivery')}>🛵 Delivery</button>
              <button className={`type-btn fb ${orderType === 'pickup' ? 'active' : 'inactive'}`} onClick={() => setOrderType('pickup')}>🏃 Pickup</button>
            </div>

            {/* Note */}
            <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontWeight: 700, letterSpacing: '0.08em' }}>
              ADD A NOTE <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
            </div>
            <textarea
              className="note-input fb"
              rows={2}
              placeholder="e.g. Extra spice, no onions, delivery address..."
              value={orderNote}
              onChange={e => setOrderNote(e.target.value)}
              style={{ marginBottom: 16 }}
            />

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="fb" style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Total</span>
              <span className="fd gold" style={{ fontSize: 28, fontWeight: 700 }}>₵{cartTotal}</span>
            </div>

            {/* Action buttons or success */}
            {orderSent ? (
              <div style={{ textAlign: 'center', padding: '20px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 14 }}>
                <CheckCircle size={32} color="#22c55e" style={{ margin: '0 auto 10px' }} />
                <div className="fb" style={{ color: '#22c55e', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Order Placed!</div>
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
                <button
                  className="btn-wa fb"
                  onClick={sendWhatsAppOrder}
                  style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
                  <WASvg /> Order via WhatsApp <Send size={14} />
                </button>
                <button
                  className="btn-call fb"
                  onClick={callToOrder}
                  style={{ width: '100%', padding: '13px', borderRadius: 12, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
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
  );
}
