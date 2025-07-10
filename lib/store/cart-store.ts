import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | undefined;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  total: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  immer((set, get) => ({
    items: [],
    isLoading: false,
    error: undefined,
    addToCart: (product, quantity = 1) => {
      set((state) => {
        // Si c'est un template, quantité = 1 max
        const isTemplate = product.type === 'template';
        const existing = state.items.find((i: CartItem) => i.product.id === product.id);
        if (existing) {
          if (isTemplate) return; // Pas de doublon pour les templates
          existing.quantity += quantity;
        } else {
          state.items.push({ product, quantity: isTemplate ? 1 : quantity, get total() { return this.product.price * this.quantity; } });
        }
      });
    },
    removeFromCart: (productId) => {
      set((state) => {
        state.items = state.items.filter((i: CartItem) => i.product.id !== productId);
      });
    },
    clearCart: () => set((state) => { state.items = []; }),
    updateQuantity: (productId, quantity) => {
      set((state) => {
        const item = state.items.find((i: CartItem) => i.product.id === productId);
        if (item && item.product.type !== 'template') {
          item.quantity = quantity;
        }
      });
    },
    total: () => get().items.reduce((sum, i: CartItem) => sum + i.product.price * i.quantity, 0),
    getItemCount: () => get().items.reduce((sum, i: CartItem) => sum + i.quantity, 0),
  }))
);

// Selectors for better performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotal = () => useCartStore((state) => state.total());
export const useCartLoading = () => useCartStore((state) => state.isLoading);
export const useCartError = () => useCartStore((state) => state.error);

// Actions
export const useCartActions = () => useCartStore((state) => ({
  addToCart: state.addToCart,
  removeFromCart: state.removeFromCart,
  clearCart: state.clearCart,
  updateQuantity: state.updateQuantity,
}));