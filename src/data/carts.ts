import type { Cart } from '../types/cart.type';
import Img1 from '../data/images/beef.png';

export const carts: Cart[] = [
  {
    menuId: 1,
    dish: 'Shan',
    price: 2500,
    quantity: 2,
    size: 'medium',
    extras: [2, 3],
    dish_Img: Img1,
  },
  {
    menuId: 2,
    dish: 'Si Chet',
    price: 2000,
    quantity: 3,
    size: 'small',
    extras: [1, 2, 3],
    dish_Img: Img1,
  },
  {
    menuId: 3,
    dish: 'Kyay Owle',
    price: 2000,
    quantity: 3,
    size: 'small',
    extras: [2, 4],
    dish_Img: Img1,
  },
];
