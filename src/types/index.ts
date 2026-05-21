export type DishSetting = { available: boolean; quickDelivery: boolean };
export type DishSettings = Record<number, DishSetting>;
export type CartItem = { id: number; name: string; details: string; price: number; qty: number };
export type OrderType = 'delivery' | 'pickup';
export type Notice = { active: boolean; message: string; resumeDate: string };

export interface Dish {
  id: number;
  name: string;
  details: string;
  description: string;
  price: number;
  priceNote: string;
  image: string;
  tag: string;
}
