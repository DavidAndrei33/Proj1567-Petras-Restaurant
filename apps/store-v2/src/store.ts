import { create } from 'zustand';
import type { Order, OrderStatus } from './types';

interface KDSStore {
  orders: Order[];
  activeFilter: 'all' | OrderStatus;
  isOnline: boolean;
  soundEnabled: boolean;
  lastUpdated: Date;

  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setActiveFilter: (filter: 'all' | OrderStatus) => void;
  setIsOnline: (online: boolean) => void;
  toggleSound: () => void;
  setLastUpdated: (date: Date) => void;
}

export const useKDSStore = create<KDSStore>((set) => ({
  orders: [],
  activeFilter: 'RECEIVED',
  isOnline: true,
  soundEnabled: true,
  lastUpdated: new Date(),

  setOrders: (orders) => set({ orders, lastUpdated: new Date() }),

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
      lastUpdated: new Date(),
    })),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
      lastUpdated: new Date(),
    })),

  setActiveFilter: (activeFilter) => set({ activeFilter }),
  setIsOnline: (isOnline) => set({ isOnline }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setLastUpdated: (lastUpdated) => set({ lastUpdated }),
}));
