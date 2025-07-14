export type Extra = {
  id: number;
  name: string;
  price: number;
  status?: 'active' | 'inactive' | undefined;
  menuId: number[];
};
