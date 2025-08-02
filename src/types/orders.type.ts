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

export interface OrdersState {
  new: RequestState<OrderState[]>;
  searched: RequestState<OrderState[]>;
  detailed: RequestState<OrderState>;
  orderId: string;
  canAccessPayment: boolean;
}

export interface RequestState<T = any> {
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    data?: T;
  }

export interface OrderRequestProps{
  orderDateTime?: string;
  addressId: number;
  totalAmount: number;
  customerId: number;
  paymentId?: number;
};

export type OrderState = Record<string, unknown>;
export type OrderStatus = 'completed' | 'pending' | 'canceled';

export type DeliveryStatus = 'pending' | 'delivered' | 'canceled';

export type DeliOrderStatus = 'pending_approval'| 'approved' | 'rejected';
