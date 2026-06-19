import { CartItem, DishSettings, Notice } from '../types';

const KEYS = {
  DISHES: 'gk_dish_settings',
  CART: 'gk_cart',
  NOTICE: 'gk_notice',
  ORDER_SEQ: 'gk_order_seq',
};

export function loadSettings(): DishSettings {
  try { const s = localStorage.getItem(KEYS.DISHES); return s ? JSON.parse(s) : {}; } catch { return {}; }
}
export function saveSettings(s: DishSettings) {
  localStorage.setItem(KEYS.DISHES, JSON.stringify(s));
}

export function loadCart(): CartItem[] {
  try { const c = localStorage.getItem(KEYS.CART); return c ? JSON.parse(c) : []; } catch { return []; }
}
export function saveCart(c: CartItem[]) {
  localStorage.setItem(KEYS.CART, JSON.stringify(c));
}

export function loadNotice(): Notice {
  try { const n = localStorage.getItem(KEYS.NOTICE); return n ? JSON.parse(n) : { active: false, message: '', resumeDate: '' }; }
  catch { return { active: false, message: '', resumeDate: '' }; }
}
export function saveNotice(n: Notice) {
  localStorage.setItem(KEYS.NOTICE, JSON.stringify(n));
}

export function generateOrderNumber(): string {
  const d = new Date();
  const ymd = `${`${d.getFullYear()}`.slice(2)}${`${d.getMonth() + 1}`.padStart(2, '0')}${`${d.getDate()}`.padStart(2, '0')}`;
  const rand = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  return `GK-${ymd}-${rand}`;
}

export function getDishSetting(settings: DishSettings, id: number) {
  return settings[id] ?? { available: true, quickDelivery: false };
}
