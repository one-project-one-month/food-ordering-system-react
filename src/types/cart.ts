export type Cart = {
  menuId: number;
  dish: string;
  extras: number[];
  price: number;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  dish_Img: string | File | undefined;
  quantity: number;
};

export interface CartIncludedTotalPrice extends Cart {
  totalPrice?: number;
}
