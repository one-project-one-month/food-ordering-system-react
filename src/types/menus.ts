interface ExtraOption {
  id: string;
  name: string;
  price?: number;
}
interface Extra {
  id: string;
  name: string;
  options: ExtraOption[];
}
export type Menu = {
  id: number;
  dish: string;
  status: 'active' | 'inactive';
  price: number;
  dish_Img: string | File | undefined;
  res_Id?: number;
  cat_Id?: number[];
  description?: string;
  extras?: Extra[];
};

export interface MenuCardProps {
  menu: Menu | null;
}

export interface MenuProps {
  menus: Menu[];
}
