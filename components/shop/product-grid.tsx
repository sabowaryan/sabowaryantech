"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCompareStore } from "@/lib/store/compare-store";
import CompareTable from "./compare-table";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  tags: string[];
}

interface ProductGridProps {
  initialProducts: Product[];
  initialQuery?: string;
  initialFilters?: any;
}

const SKELETON_COUNT = 12;

const ProductGrid: React.FC<ProductGridProps> = ({ initialProducts, initialQuery, initialFilters }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  const selected = useCompareStore(s => s.selected);
  const [compareOpen, setCompareOpen] = useState(false);
  const selectedProducts = products.filter(p => selected.includes(p.id));

  // Infinite scroll (Intersection Observer)
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: 0.1 });
    if (endRef.current) observer.observe(endRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [hasMore, loading, products]);

  const loadMore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simule un fetch API/DB (à remplacer par un vrai fetch)
      await new Promise((r) => setTimeout(r, 700));
      const newProducts = Array.from({ length: 12 }, (_, i) => ({
        id: `prod-${page + 1}-${i}`,
        name: `Produit ${products.length + i + 1}${initialQuery ? ` - ${initialQuery}` : ""}`,
        price: Math.round(Math.random() * 100) + 10,
        image: `https://source.unsplash.com/400x300/?product,${products.length + i}`,
        description: "Description du produit...",
        category: "UI",
        tags: ["UI", "React"],
      }));
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((p) => p + 1);
      if (newProducts.length < 12) setHasMore(false);
    } catch (e) {
      setError("Erreur lors du chargement des produits.");
    } finally {
      setLoading(false);
    }
  }, [page, products.length, initialQuery]);

  // Retry handler
  const handleRetry = () => {
    setError(null);
    loadMore();
  };

  // Empty state
  if (!products.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <img src="/empty-state.svg" alt="Aucun produit" className="w-40 h-40 mb-6 opacity-70" />
        <p className="text-lg text-slate-500 mb-2">Aucun produit trouvé</p>
        <button className="btn btn-primary" onClick={handleRetry}>Réessayer</button>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg text-red-600 mb-2">{error}</p>
        <button className="btn btn-primary" onClick={handleRetry}>Réessayer</button>
      </div>
    );
  }

  return (
    <div>
      {selected.length >= 2 && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-slate-900 shadow-lg rounded-full px-6 py-3 flex items-center gap-4"
        >
          <span className="font-semibold">{selected.length} produits sélectionnés</span>
          <button className="btn btn-primary" onClick={() => setCompareOpen(true)}>Comparer</button>
          <button className="btn btn-link" onClick={useCompareStore.getState().clear}>Vider</button>
        </motion.div>
      )}
      <AnimatePresence>
        {compareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
            onClick={() => setCompareOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-6xl w-full mx-4 p-8 relative overflow-x-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setCompareOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-primary-600 text-2xl font-bold focus:outline-none"
                aria-label="Fermer la comparaison"
              >
                ×
              </button>
              <CompareTable
                products={selectedProducts}
                onRemove={id => useCompareStore.getState().toggle(id)}
                onClear={useCompareStore.getState().clear}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{ gridAutoRows: "1fr" }}
      >
        <AnimatePresence initial={false}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow p-4 flex flex-col"
              style={{ minHeight: 260 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
                loading="lazy"
              />
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-slate-500 mb-2 flex-1">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-primary-600">{product.price} €</span>
                <button className="btn btn-outline btn-sm">Voir</button>
              </div>
            </motion.div>
          ))}
          {/* Skeleton loading */}
          {loading &&
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse p-4 min-h-[260px]"
              >
                <div className="w-full h-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
        </AnimatePresence>
      </div>
      {/* Infinite scroll trigger */}
      {hasMore && <div ref={endRef} style={{ minHeight: 1 }} />}
    </div>
  );
};

export default ProductGrid; 