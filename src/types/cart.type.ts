import type { Extra } from './menus.type';

export interface Cart {
  menuId: number;
  dish: string;
  extras: number[];
  price: number;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  dish_Img: string | File | undefined;
  quantity: number;
}

export interface CartIncludedTotalPrice extends Cart {
  totalPrice?: number;
}

export interface CartItemProps {
  cartItem: Cart;
  includedExtras: Extra[];
  extraPrice: number;
  handleUpdateQuantity: (q: number, item: Cart) => void;
}
