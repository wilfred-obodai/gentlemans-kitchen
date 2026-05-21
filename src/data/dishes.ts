export interface MenuItem {
  name: string;
  price: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  images: string[];
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'banku',
    name: 'Banku',
    emoji: '🍲',
    color: '#e65c00',
    images: ['/images/banku1.jpg', '/images/banku2.jpg'],
    items: [
      { name: 'Banku & Tilapia', price: '₵100' },
      { name: 'Banku & Goat', price: '₵90' },
      { name: 'Banku & Fish', price: '₵80' },
      { name: 'Banku & Chicken (small)', price: '₵40' },
      { name: 'Banku & Chicken (medium)', price: '₵50' },
      { name: 'Banku & Chicken (large)', price: '₵60' },
    ],
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    emoji: '🍚',
    color: '#d4a017',
    images: ['/images/fried-rice-real.jpeg', '/images/fried-rice-fish.jpg'],
    items: [
      { name: 'Fried Rice & Tilapia', price: '₵100' },
      { name: 'Fried Rice & Goat', price: '₵90' },
      { name: 'Fried Rice & Fish', price: '₵80' },
      { name: 'Fried Rice & Chicken (small)', price: '₵40' },
      { name: 'Fried Rice & Chicken (medium)', price: '₵50' },
      { name: 'Fried Rice & Chicken (large)', price: '₵60' },
    ],
  },
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    emoji: '🍛',
    color: '#c0392b',
    images: ['/images/jollof1.jpeg', '/images/jollof2.jpeg'],
    items: [
      { name: 'Jollof Rice & Tilapia', price: '₵120' },
      { name: 'Jollof Rice & Goat', price: '₵90' },
      { name: 'Jollof Rice & Fish', price: '₵80' },
      { name: 'Jollof Rice & Chicken (small)', price: '₵40' },
      { name: 'Jollof Rice & Chicken (medium)', price: '₵50' },
      { name: 'Jollof Rice & Chicken (large)', price: '₵60' },
    ],
  },
  {
    id: 'plain-rice',
    name: 'Plain Rice',
    emoji: '🍙',
    color: '#7f8c8d',
    images: ['/images/coleslaw.jpeg'],
    items: [
      { name: 'Plain Rice & Tilapia', price: '₵150' },
      { name: 'Plain Rice & Goat', price: '₵90' },
      { name: 'Plain Rice & Fish', price: '₵85' },
      { name: 'Plain Rice & Chicken', price: '₵65' },
    ],
  },
  {
    id: 'yam-chips',
    name: 'Yam Chips',
    emoji: '🍟',
    color: '#f39c12',
    images: ['/images/noodles.jpeg'],
    items: [
      { name: 'Yam Chips & Chicken Wings', price: '₵70' },
      { name: 'Yam Chips & Grilled Chicken', price: '₵65' },
    ],
  },
  {
    id: 'salad',
    name: 'Salad',
    emoji: '🥗',
    color: '#27ae60',
    images: ['/images/salad-protein.jpeg', '/images/salad-egg.jpeg'],
    items: [
      { name: 'Tuna Salad', price: '₵40' },
      { name: 'Chicken with Cheese Salad', price: '₵50' },
      { name: 'Green Salad', price: '₵30' },
      { name: 'Special Salad (small)', price: '₵70' },
      { name: 'Special Salad (large)', price: '₵100' },
    ],
  },
  {
    id: 'assorted-rice',
    name: 'Assorted Rice',
    emoji: '🍱',
    color: '#8e44ad',
    images: ['/images/assorted1.jpeg', '/images/assorted2.jpeg'],
    items: [
      { name: 'Assorted Fried Rice', price: '₵65' },
      { name: 'Assorted Jollof Rice', price: '₵65' },
      { name: 'Assorted Indomie', price: '₵65' },
      { name: 'Assorted Noodles', price: '₵65' },
      { name: 'Assorted Plain Rice', price: '₵90' },
    ],
  },
  {
    id: 'sauces',
    name: 'Sauces',
    emoji: '🥘',
    color: '#e74c3c',
    images: ['/images/sauce-dish.jpeg'],
    items: [
      { name: 'Beef Sauce', price: '₵60' },
      { name: 'Chicken Sauce', price: '₵50' },
      { name: 'Fish Sauce', price: '₵70' },
      { name: 'Octopus Sauce', price: '₵80' },
    ],
  },
  {
    id: 'potatochips',
    name: 'Potato Chips',
    emoji: '🍟',
    color: '#e67e22',
    images: ['/images/menu2.jpeg'],
    items: [
      { name: 'Potato Chips & Chicken Wings', price: '₵70' },
      { name: 'Potato Chips & Grilled Chicken', price: '₵65' },
    ],
  },
  {
    id: 'sunday-special',
    name: 'Sunday Special',
    emoji: '⭐',
    color: '#F97316',
    images: ['/images/protein-salad.jpeg', '/images/chicken-salad.jpeg'],
    items: [
      { name: 'Assorted Fried Rice', price: '₵80' },
      { name: 'Assorted Jollof Rice', price: '₵80' },
      { name: 'Waakye Special', price: '₵80' },
      { name: 'Assorted Noodles', price: '₵80' },
      { name: 'Assorted Indomie', price: '₵80' },
      { name: 'Banku Special', price: '₵80' },
      { name: 'Omotuo Special', price: '₵80' },
    ],
  },
];

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

export const DISHES: Dish[] = [
  { id: 1, name: 'Jollof Rice', details: 'Smoky Ghanaian jollof with chicken, fish, goat or tilapia', description: 'Our signature smoky jollof — rich tomato base, perfectly seasoned', price: 45, priceNote: 'from ₵45', image: '/images/menu3.jpeg', tag: 'Must Try' },
  { id: 2, name: 'Fried Rice', details: 'Egg fried rice with vegetables, chicken, fish, goat or tilapia', description: 'Wok-style fried rice with fresh vegetables and your choice of protein', price: 40, priceNote: 'from ₵40', image: '/images/menu1.jpeg', tag: 'Bestseller' },
  { id: 3, name: 'Banku', details: 'Banku with grilled chicken, okro stew, tilapia or fried fish', description: 'Traditional banku served with okro stew or your choice of protein', price: 40, priceNote: 'from ₵40', image: '/images/sauce-dish.jpeg', tag: 'Local Classic' },
  { id: 4, name: 'Shawarma', details: 'Chicken shawarma, beef shawarma or loaded shawarma with fries', description: 'Freshly made shawarma — chicken, beef, or loaded with fries and cheese', price: 65, priceNote: 'from ₵65', image: '/images/flyer.jpeg', tag: 'Fan Favourite' },
  { id: 5, name: 'Assorted Rice', details: 'Assorted fried or jollof rice with chicken, sausage and gizzard', description: 'Our popular assorted rice loaded with chicken, sausage and gizzard', price: 65, priceNote: '₵65', image: '/images/noodles.jpeg', tag: "Chef's Special" },
  { id: 6, name: 'Salad', details: 'Green salad, protein salad, tuna salad or chicken with cheese salad', description: 'Fresh house salads — green, protein-packed, tuna, or chicken with cheese', price: 30, priceNote: 'from ₵30', image: '/images/salad-protein.jpeg', tag: 'Fresh Daily' },
];

export const GALLERY_IMAGES = [
  { src: '/images/hero.jpeg', label: 'Fresh Salad Prep' },
  { src: '/images/salad-protein.jpeg', label: 'Protein Salad' },
  { src: '/images/sauce-dish.jpeg', label: 'Stir Fry Dish' },
  { src: '/images/noodles.jpeg', label: 'Assorted Noodles' },
  { src: '/images/salad-egg.jpeg', label: 'Special Salad' },
  { src: '/images/coleslaw.jpeg', label: 'Coleslaw & Noodles' },
];

export const CONTACT_INFO = {
  phone1: '0592 730 579',
  phone2: '0592 861 516',
  whatsapp: '233592730579',
  instagram: 'gentlemans_kitchen1',
  location: 'Greda Estate, Teshie',
  city: 'Accra, Ghana',
  opensAt: 'Opens 6:00 AM Daily',
  foodReady: 'Food ready from 11AM',
  mapsUrl: 'https://maps.google.com/?q=Greda+Estate+Teshie+Accra+Ghana',
};