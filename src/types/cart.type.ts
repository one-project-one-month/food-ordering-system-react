import type { Extra } from './menus.type';

export interface Cart {
  cartId: number;
  quantity: number;
  dish: {
    id: number;
    name: string;
    image: string | null;
    price: number;
    restaurant: {
      id: number;
      name: string;
    };
  };
  extra: Extra[] | null;
}

export interface CartIncludedTotalPrice extends Cart {
  totalPrice?: number;
}

export interface CartItemProps {
  cartItem: Cart;
  includedExtras?: Extra[];
  handleUpdateQuantity: (q: number, item: Cart) => void;
  removeItemHandler: (id: number) => void;
}
