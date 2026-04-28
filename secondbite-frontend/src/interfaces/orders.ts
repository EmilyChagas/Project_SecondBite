export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface OrderItemType {
  productId: string;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  price: number;
  subTotal: number;
}

export interface Order {
  id: string;
  consumerName: string;
  marketerName: string;
  marketerId: string;
  status: OrderStatus;
  items: OrderItemType[];
  totalAmount: number;
  deliveryCode: string;
  createdAt: string;
}

export type OrderListResponse = Order[];
