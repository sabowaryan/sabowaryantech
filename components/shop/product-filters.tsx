"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const mockCategories = ["UI", "Templates", "E-commerce", "Admin"];
const mockTags = ["React", "Vue", "Angular", "Svelte"];
const PRICE_MIN = 0;
const PRICE_MAX = 200;

interface ProductFiltersProps {
  initialFilters?: any;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ initialFilters = {} }) => {
  const [openGroups, setOpenGroups] = useState<{ [k: string]: boolean }>({
    categories: true,
    tags: false,
    price: true,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories || []);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialFilters.tags || []);
  const [price, setPrice] = useState<[number, number]>(initialFilters.price || [PRICE_MIN, PRICE_MAX]);
  const [history, setHistory] = useState<any[]>([]);
  const [showUndo, setShowUndo] = useState(false);

  // Collapsible
  const toggleGroup = (g: string) => setOpenGroups(o => ({ ...o, [g]: !o[g] }));

  // Multi-select
  const toggleCategory = (cat: string) => setSelectedCategories(c => c.includes(cat) ? c.filter(x => x !== cat) : [...c, cat]);
  const toggleTag = (tag: string) => setSelectedTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag]);

  // Price slider
  const handlePrice = (idx: 0 | 1, value: number) => {
    setPrice(p => {
      const next = [...p] as [number, number];
      next[idx] = value;
      if (next[0] > next[1]) next[0] = next[1];
      if (next[1] < next[0]) next[1] = next[0];
      return next;
    });
  };

  // Clear filters with undo
  const handleClear = () => {
    setHistory(h => [{ categories: selectedCategories, tags: selectedTags, price }, ...h]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setPrice([PRICE_MIN, PRICE_MAX]);
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 5000);
  };
  const handleUndo = () => {
    const last = history[0];
    if (last) {
      setSelectedCategories(last.categories);
      setSelectedTags(last.tags);
      setPrice(last.price);
      setHistory(h => h.slice(1));
      setShowUndo(false);
    }
  };

  // Chips actifs
  const activeChips = [
    ...selectedCategories.map(c => ({ label: c, onRemove: () => toggleCategory(c) })),
    ...selectedTags.map(t => ({ label: t, onRemove: () => toggleTag(t) })),
    ...(price[0] !== PRICE_MIN || price[1] !== PRICE_MAX ? [{ label: `Prix: ${price[0]}€ - ${price[1]}€`, onRemove: () => setPrice([PRICE_MIN, PRICE_MAX]) }] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">Filtres</span>
        <button className="text-primary-600 text-sm hover:underline" onClick={handleClear}>Effacer</button>
      </div>
      {/* Undo */}
      {showUndo && (
        <div className="mb-2 flex items-center gap-2 text-sm bg-primary-50 dark:bg-primary-900/20 p-2 rounded">
          Filtres effacés
          <button className="text-primary-600 font-bold" onClick={handleUndo}>Annuler</button>
        </div>
      )}
      {/* Chips actifs */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {activeChips.map((chip, i) => (
            <span key={i} className="flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200 px-3 py-1 rounded-full text-xs">
              {chip.label}
              <button className="ml-1" onClick={chip.onRemove} aria-label="Supprimer le filtre"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}
      {/* Catégories */}
      <div>
        <button className="flex items-center gap-2 w-full mb-2" onClick={() => toggleGroup("categories")}>Catégories {openGroups.categories ? <ChevronUp /> : <ChevronDown />}</button>
        {openGroups.categories && (
          <div className="pl-2 space-y-1">
            {mockCategories.map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Tags */}
      <div>
        <button className="flex items-center gap-2 w-full mb-2" onClick={() => toggleGroup("tags")}>Tags {openGroups.tags ? <ChevronUp /> : <ChevronDown />}</button>
        {openGroups.tags && (
          <div className="pl-2 space-y-1">
            {mockTags.map(tag => (
              <label key={tag} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Prix */}
      <div>
        <button className="flex items-center gap-2 w-full mb-2" onClick={() => toggleGroup("price")}>Prix {openGroups.price ? <ChevronUp /> : <ChevronDown />}</button>
        {openGroups.price && (
          <div className="pl-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={price[0]}
                onChange={e => handlePrice(0, Number(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">{price[0]}€</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={price[1]}
                onChange={e => handlePrice(1, Number(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">{price[1]}€</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;