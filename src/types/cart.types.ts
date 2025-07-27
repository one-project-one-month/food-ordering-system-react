import type { Menu } from './menus.type';

export interface CartItem extends Menu {
  quantity: number;
  selectedExtras: string[];
  notes?: string;
  totalAmount: number;
}

export interface CartState {
  items: CartItem[];
  quantity: number;
}
