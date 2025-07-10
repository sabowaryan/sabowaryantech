import { apiFetch } from './api-client';
import { Product, ProductSchema } from '../types';
import { z } from 'zod';

export const ProductsArraySchema = z.array(ProductSchema);

export const productsService = {
  async getAll() {
    return apiFetch<Product[]>(`/api/products`, undefined, ProductsArraySchema);
  },
  async getById(id: string) {
    return apiFetch<Product>(`/api/products/${id}`, undefined, ProductSchema);
  },
  async search(query: string) {
    return apiFetch<Product[]>(`/api/products?search=${encodeURIComponent(query)}`, undefined, ProductsArraySchema);
  },
}; 