export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  name: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  customerName: string;
  phone: string;
  customerAddress: string;
  paymentMethod: string;
  total: number;
  notes?: string;
  allergies?: string;
  createdAt: Date;
}

export interface FilterTab {
  id: 'all' | OrderStatus;
  label: string;
}
