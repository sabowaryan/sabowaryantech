"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { useDebounce } from "@/lib/hooks/useDebounce";
import ProductCard from "@/components/product/product-card";
// import { products } from "@/lib/data/mock-products" // <-- à remplacer par tes données

// Virtualisation simple (windowing)
const VISIBLE_COUNT = 8;

const mockProducts = Array.from({ length: 40 }, (_, i) => ({
  id: `prod-${i}`,
  name: `Composant ${i + 1}`,
  description: "Description du composant...",
  price: Math.round(Math.random() * 100) + 10,
  images: ["https://source.unsplash.com/400x300/?web,code," + i],
  type: "component",
  framework: "react",
  files: [],
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  stock: 100,
  category: "UI",
  tags: ["UI", "React"],
}));

export interface ProductShowcaseProps {
  filters?: Record<string, any>;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ filters = {} }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtrage (recherche temps réel + facettes)
  const filtered = useMemo(() =>
    mockProducts.filter(p => {
      const q = (filters.q || "").toLowerCase();
      const cat = filters.cat || "";
      const tags = filters.tags || [];
      const price = filters.price || "";
      let match = true;
      if (q && !p.name.toLowerCase().includes(q) && !(p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))) match = false;
      if (cat && p.category !== cat) match = false;
      if (tags.length && !tags.every((t: string) => p.tags?.includes(t))) match = false;
      if (price) {
        if (price === "< 20€" && !(p.price < 20)) match = false;
        if (price === "20€ - 50€" && !(p.price >= 20 && p.price <= 50)) match = false;
        if (price === "> 50€" && !(p.price > 50)) match = false;
      }
      return match;
    }),
    [filters]
  );

  // Virtualisation (windowing)
  const visibleProducts = useMemo(() =>
    filtered.slice(scrollIndex, scrollIndex + VISIBLE_COUNT),
    [filtered, scrollIndex]
  );

  // Scroll horizontal (snap)
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const cardWidth = containerRef.current.firstElementChild?.clientWidth || 1;
    setScrollIndex(Math.round(scrollLeft / cardWidth));
  }, []);

  // Intersection Observer pour lazy loading
  const [endRef, isEndVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  React.useEffect(() => {
    if (isEndVisible && scrollIndex + VISIBLE_COUNT < filtered.length) {
      setScrollIndex(idx => Math.min(idx + VISIBLE_COUNT, filtered.length - VISIBLE_COUNT));
    }
  }, [isEndVisible, filtered.length, scrollIndex]);

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Nos produits</h2>
          <input
            type="search"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-64 focus:outline-none focus:ring"
            aria-label="Recherche de produits"
          />
        </div>
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="Liste horizontale de produits"
        >
          <LayoutGroup>
            <AnimatePresence initial={false}>
              {visibleProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="snap-center flex-shrink-0 w-80"
                  style={{ willChange: "transform, opacity" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
          {/* Lazy loading trigger */}
          <div ref={endRef} style={{ minWidth: 1, minHeight: 1 }} aria-hidden />
        </div>
        {/* Pagination/scrollbar custom, à ajouter si besoin */}
      </div>
    </section>
  );
};

export default ProductShowcase; 