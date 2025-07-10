import { useCallback } from 'react';
import { useCartStore } from '../store/cart-store';
import { Product } from '../types';

export function useCart() {
  const items = useCartStore((s) => s.items);
  const isLoading = useCartStore((s) => s.isLoading);
  const error = useCartStore((s) => s.error);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total);

  // Optimistic update example (peut être enrichi avec API plus tard)
  const optimisticAdd = useCallback((product: Product, quantity = 1) => {
    addToCart(product, quantity);
    // Ici, on pourrait lancer une requête API et rollback si erreur
  }, [addToCart]);

  return {
    items,
    isLoading,
    error,
    addToCart: optimisticAdd,
    removeFromCart,
    updateQuantity,
    clearCart,
    total: total(),
  };
} 