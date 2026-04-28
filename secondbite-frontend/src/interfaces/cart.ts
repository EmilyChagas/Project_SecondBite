import type { Product } from './products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subTotal: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}
