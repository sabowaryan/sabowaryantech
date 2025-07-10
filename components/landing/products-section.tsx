"use client";
import React, { useState } from "react";
import ProductFilters from "./product-filters";
import ProductShowcase from "./product-showcase";
import { useCompareStore } from "@/lib/store/compare-store";
import CompareModal from "./compare-modal";
import ProductCard from "@/components/product/product-card";
import { mockProducts } from "./product-showcase"; // ou adapte selon ta source de données

const ProductsSection: React.FC = () => {
  const [filters, setFilters] = useState({});
  const selected = useCompareStore((s) => s.selected);
  const clear = useCompareStore((s) => s.clear);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <section>
      <ProductFilters onChange={setFilters} />
      <ProductShowcase filters={filters} />
      {selected.length >= 2 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-slate-900 shadow-lg rounded-full px-6 py-3 flex items-center gap-4">
          <span className="font-semibold">{selected.length} produits sélectionnés</span>
          <button className="btn btn-primary" onClick={() => setCompareOpen(true)}>Comparer</button>
          <button className="btn btn-link" onClick={clear}>Vider</button>
        </div>
      )}
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        products={mockProducts.filter(p => selected.includes(p.id))}
      />
    </section>
  );
};

export default ProductsSection; 