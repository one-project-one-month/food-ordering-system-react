import type { Menu } from './menus.type';

export interface CartItem extends Menu {
  quantity: number;
  selectedExtras: string[];
  notes?: string;
  totalAmount: number;
  dish_Img?: string;
  dishSizeId?: number;
}

  export interface RequestState<T = any> {
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    contents?: T;
    data?: T;
  }
export interface CartState {
  items: CartItem[];
  quantity: number;
  new: RequestState<CartItem[]>;
}
