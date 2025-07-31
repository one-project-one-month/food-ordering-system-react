import type { Category } from './category.types';

export interface Extra {
  id?: string;
  name: string;
  price: number;
  menuId: number;
}

export interface ExtraState {
  items: Extra[];
  loading: boolean;
  error: Error | null;
}

export interface DishSize {
  id?: string;
  name: string;
  price: number;
  menuId: number;
}

export type Status = 'ACTIVE' | 'INACTIVE';

export interface Menu {
  id?: number;
  dish: string;
  status: Status;
  price: number;
  dishImg?: string | File | undefined;
  restaurantId?: number;
  categoryId?: number;
  extras?: Extra[];
  dishSizes?: DishSize[];
  dish_Img?: string;
}

export interface MenuCardProps {
  menu: Menu | null;
  setIsOpened: () => void;
  categories?: Category[];
}
export interface MenuState {
  items: Menu[] | [];
  totalPage: number;
  loading: boolean;
  error: Error | null | string | undefined;
}
export interface MenuProps {
  menus: Menu[];
}
export interface UploadMenuImagePayload {
  dishImg: File | undefined;
  id: number;
}
