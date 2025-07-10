import { apiFetch } from './api-client';
import { Order, OrderSchema } from '../types';
import { z } from 'zod';

export const OrdersArraySchema = z.array(OrderSchema);

export const ordersService = {
  async getAll() {
    return apiFetch<Order[]>(`/api/orders`, undefined, OrdersArraySchema);
  },
  async getById(id: string) {
    return apiFetch<Order>(`/api/orders/${id}`, undefined, OrderSchema);
  },
  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    return apiFetch<Order>(`/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }, OrderSchema);
  },
}; 