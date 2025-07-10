import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  
  // Computed values
  getTotalPrice: () => number;
  getItemCount: () => number;
  getItem: (id: string) => CartItem | undefined;
  hasItem: (id: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        
        if (existingItem) {
          // Update quantity if item already exists
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
          toast.success(`Increased ${item.name} quantity`);
        } else {
          // Add new item
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
          toast.success(`${item.name} added to cart`);
        }
      },

      removeItem: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          }));
          toast.success(`${item.name} removed from cart`);
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const item = get().items.find((i) => i.id === id);
        if (item) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          }));
        }
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => {
          return count + item.quantity;
        }, 0);
      },

      getItem: (id) => {
        return get().items.find((item) => item.id === id);
      },

      hasItem: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: 'sabowaryan-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        items: state.items 
      }),
    }
  )
);

// Selectors for better performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotal = () => useCartStore((state) => state.getTotalPrice());
export const useCartCount = () => useCartStore((state) => state.getItemCount());
export const useCartOpen = () => useCartStore((state) => state.isOpen);

// Actions
export const useCartActions = () => useCartStore((state) => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart,
  toggleCart: state.toggleCart,
  setCartOpen: state.setCartOpen,
}));