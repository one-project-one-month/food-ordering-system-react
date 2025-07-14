import type { Order } from '../types/orders.type';

export const orders: Order[] = [
  {
    id: 1001,
    status: 'completed',
    orderDateTime: '2024-06-01T10:00:00Z',
    user_Address: 'No. 56, Kyauktada Street, Sule Road, Kyauktada Township, Yangon',
    totalAmount: 45900,
    delivery_status: 'delivered',
  },
  {
    id: 1002,
    status: 'ongoing',
    orderDateTime: '2024-06-02T12:30:00Z',
    user_Address: 'No. 102, Pansodan Street, Strand Road, Latha Township, Yangon',
    totalAmount: 29500,
    delivery_status: 'delivered',
  },
  {
    id: 1003,
    status: 'ongoing',
    orderDateTime: '2024-06-03T14:15:00Z',
    user_Address: 'No. 31, Bogyoke Aung San Road, Pazundaung Road, Pazundaung Township, Yangon',
    totalAmount: 60000,
    delivery_status: 'pending',
  },
  {
    id: 1004,
    status: 'ongoing',
    orderDateTime: '2024-06-03T09:45:00Z',
    user_Address: 'No. 8, Lanmadaw Street, Lanmadaw Road, Lanmadaw Township, Yangon',
    totalAmount: 22750,
    delivery_status: 'pending',
  },
  {
    id: 1005,
    status: 'canceled',
    orderDateTime: '2024-06-02T16:20:00Z',
    user_Address: 'No. 19, Myaing Galay Street, Insein Road, Insein Township, Yangon',
    totalAmount: 38400,
    delivery_status: 'canceled',
  },
  {
    id: 1006,
    status: 'canceled',
    orderDateTime: '2024-06-01T18:00:00Z',
    user_Address: 'No. 45, Hledan Street, Hledan Road, Kamayut Township, Yangon',
    totalAmount: 50000,
    delivery_status: 'canceled',
  },
]; 