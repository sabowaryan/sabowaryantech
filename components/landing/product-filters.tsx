"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const categories = ["UI", "E-commerce", "Admin", "Landing", "Template"];
const tags = ["React", "Vue", "Angular", "Svelte", "Dark mode", "Dashboard"];
const priceRanges = [
  { label: "< 20€", min: 0, max: 20 },
  { label: "20€ - 50€", min: 20, max: 50 },
  { label: "> 50€", min: 50, max: 9999 },
];

interface ProductFiltersProps {
  onChange: (filters: Record<string, any>) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedCategory, setCategory] = useState(searchParams.get("cat") || "");
  const [selectedTags, setTags] = useState<string[]>(searchParams.getAll("tag"));
  const [selectedPrice, setPrice] = useState(searchParams.get("price") || "");

  const debouncedSearch = useDebounce(search, 200);

  // Met à jour l'URL et notifie le parent
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (selectedCategory) params.set("cat", selectedCategory);
    selectedTags.forEach(tag => params.append("tag", tag));
    if (selectedPrice) params.set("price", selectedPrice);
    router.replace("?" + params.toString());
    onChange({
      q: debouncedSearch,
      cat: selectedCategory,
      tags: selectedTags,
      price: selectedPrice,
    });
    // eslint-disable-next-line
  }, [debouncedSearch, selectedCategory, selectedTags, selectedPrice]);

  // FLIP animation pour tags
  return (
    <LayoutGroup>
      <form className="flex flex-wrap gap-4 items-center mb-8" role="search" aria-label="Filtres produits">
        <input
          type="search"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-64 focus:outline-none focus:ring"
          aria-label="Recherche de produits"
        />
        <select
          value={selectedCategory}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
          aria-label="Catégorie"
        >
          <option value="">Toutes catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="flex gap-2 items-center" aria-label="Tags">
          <AnimatePresence initial={false}>
            {tags.map(tag => (
              <motion.button
                key={tag}
                type="button"
                layoutId={tag}
                className={`px-3 py-1 rounded-full border text-xs transition-all ${selectedTags.includes(tag) ? "bg-primary-600 text-white border-primary-600" : "bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-300"}`}
                aria-pressed={selectedTags.includes(tag)}
                onClick={() => setTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag])}
              >
                {tag}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <select
          value={selectedPrice}
          onChange={e => setPrice(e.target.value)}
          className="border rounded px-3 py-2"
          aria-label="Prix"
        >
          <option value="">Tous prix</option>
          {priceRanges.map(pr => (
            <option key={pr.label} value={pr.label}>{pr.label}</option>
          ))}
        </select>
      </form>
    </LayoutGroup>
  );
};

export default ProductFilters; 