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
}

export interface MenuCardProps {
  menu: Menu | null;
  setIsOpened: (prev: boolean) => void;
}
export interface MenuState {
  items: Menu[] | [];
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
