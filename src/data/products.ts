export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  badge?: 'sale' | 'hit';
  image: string;
}

// Prices are transcribed from Figma and must be confirmed before publication.
export const products: Product[] = [
  { id: 'mini', title: '10–12 см (мини-крона)', price: 500, image: import.meta.env.BASE_URL + 'assets/figma/photo1.png' },
  { id: 'single', title: '12–15 см (1 крона)', price: 700, image: import.meta.env.BASE_URL + 'assets/figma/photo2.png' },
  { id: 'double-small', title: '15–20 см (2 кроны)', price: 1000, oldPrice: 1300, badge: 'sale', image: import.meta.env.BASE_URL + 'assets/figma/photo3.png' },
  { id: 'triple-small', title: '15–20 см (3 кроны)', price: 1500, image: import.meta.env.BASE_URL + 'assets/figma/photo4.png' },
  { id: 'double', title: '20–24 см (2 кроны)', price: 1500, image: import.meta.env.BASE_URL + 'assets/figma/photo5.png' },
  { id: 'triple', title: '20–24 см (3 кроны)', price: 2000, badge: 'hit', image: import.meta.env.BASE_URL + 'assets/figma/photo6.png' },
  { id: 'triple-large', title: '25–29 см (3 кроны)', price: 2700, oldPrice: 3000, badge: 'sale', image: import.meta.env.BASE_URL + 'assets/figma/photo7.png' },
  { id: 'quadruple', title: '25–29 см (4 кроны)', price: 3500, image: import.meta.env.BASE_URL + 'assets/figma/photo8.png' },
  { id: 'large', title: 'От 34 см (от 5 крон)', price: 5000, image: import.meta.env.BASE_URL + 'assets/figma/photo9.png' },
];
