export interface Order {
  id: number;
  status?: OrderStatus;
  cart_Id?: number;
  orderDateTime: string;
  user_Address: string;
  totalAmount: number;
  paymentId?: number;
  delivery_status?: DeliveryStatus;
  deli_order_status?: DeliOrderStatus;
}

export interface OrderProps {
  orders: Order[];
}

export type OrderStatus = 'completed' | 'ongoing' | 'canceled';

export type DeliveryStatus = 'pending' | 'delivered' | 'canceled';

export type DeliOrderStatus = 'pending_approval'| 'approved' | 'rejected';
