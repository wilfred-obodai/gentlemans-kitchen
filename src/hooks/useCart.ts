import { useState, useEffect } from 'react';
import { CartItem, OrderType } from '../types';
import { loadCart, saveCart, generateOrderNumber } from '../data/storage';
import { CONTACT_INFO } from '../data/dishes';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [orderSent, setOrderSent] = useState(false);
  const [lastOrderNum, setLastOrderNum] = useState('');

  useEffect(() => { saveCart(cart); }, [cart]);

  const addToCart = (dish: { id: number; name: string; details: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (existing) return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: dish.id, name: dish.name, details: dish.details, price: dish.price, qty: 1 }];
    });
  };

  const updateCardQty = (dish: { id: number; name: string; details: string; price: number }, delta: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (!existing && delta > 0) return [...prev, { id: dish.id, name: dish.name, details: dish.details, price: dish.price, qty: 1 }];
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
    const itemLines = cart.map(i =>
      `• ${i.qty}x ${i.name}${i.details && i.details !== i.name ? ` (${i.details})` : ''} — ₵${i.price * i.qty}`
    ).join('\n');
    const typeLine = orderType === 'delivery' ? '🛵 Delivery' : '🏃 Pickup';
    const noteLine = orderNote.trim() ? `\n📝 Note: ${orderNote.trim()}` : '';
    const msg = `Hi Gentleman's Kitchen! 👋\n\nOrder No: ${orderNum}\n\n${itemLines}\n\nTotal: ₵${cartTotal}\n📦 ${typeLine}${noteLine}\n\nKindly confirm. Thank you! 🙏`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      setCart([]);
      setCartOpen(false);
      setOrderNote('');
      setLastOrderNum('');
    }, 4000);
  };

  const callToOrder = () => window.open(`tel:+${CONTACT_INFO.whatsapp}`);

  return {
    cart, cartOpen, setCartOpen,
    orderNote, setOrderNote,
    orderType, setOrderType,
    orderSent, lastOrderNum,
    addToCart, updateCardQty, updateQty, removeFromCart,
    cartTotal, cartCount,
    sendWhatsAppOrder, callToOrder,
  };
}