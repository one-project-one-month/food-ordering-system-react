export type Menu = {
  id: number;
  dish: string;
  status: 'active' | 'inactive';
  price: number;
  dish_Img: string | File | undefined;
  res_Id?: number;
  cat_Id?: number[];
};

export interface MenuCardProps {
  menu: Menu | null;
}

export interface MenuProps {
  menus: Menu[];
}
