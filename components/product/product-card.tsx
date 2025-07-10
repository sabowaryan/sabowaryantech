"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, CheckSquare, Square } from "lucide-react";
import { useCompareStore } from "@/lib/store/compare-store";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    type: string;
    framework: string;
    demoUrl?: string;
    status: string;
    stock: number;
    category: string;
    tags?: string[];
  };
}

const priceAnim = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wish, setWish] = useState(false);
  const compareSelected = useCompareStore(s => s.selected.includes(product.id));
  const toggleCompare = () => useCompareStore.getState().toggle(product.id);

  return (
    <motion.article
      tabIndex={0}
      aria-label={product.name}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full focus-within:ring-2 ring-primary-400"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: "transform, box-shadow" }}
    >
      {/* Sélecteur de comparaison */}
      <button
        className={"absolute top-2 right-2 z-10 p-1 rounded bg-white/80 hover:bg-primary-100 transition " + (compareSelected ? "text-primary-600" : "text-slate-400")}
        onClick={toggleCompare}
        aria-label={compareSelected ? "Retirer de la comparaison" : "Ajouter à la comparaison"}
      >
        {compareSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
      </button>
      {/* Image avec blur-up */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-slate-800 overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="320px"
          className={`object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg width='16' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23e2e2e2' width='16' height='12'/%3E%3C/svg%3E"
        />
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 animate-pulse" />
        )}
        {/* Boutons flottants */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <motion.button
            aria-label={wish ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow hover:bg-pink-100 dark:hover:bg-pink-900 transition"
            onClick={e => { e.stopPropagation(); setWish(w => !w); }}
            whileTap={{ scale: 0.85 }}
          >
            <motion.span
              animate={{ scale: wish ? 1.2 : 1, color: wish ? "#e11d48" : "#888" }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Heart fill={wish ? "#e11d48" : "none"} className="w-5 h-5" />
            </motion.span>
          </motion.button>
          <motion.button
            aria-label="Ajouter au panier"
            className="bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow hover:bg-primary-100 dark:hover:bg-primary-900 transition"
            whileTap={{ scale: 0.85 }}
          >
            <ShoppingCart className="w-5 h-5 text-primary-600" />
          </motion.button>
        </div>
      </div>
      {/* Contenu */}
      <div className="flex-1 flex flex-col p-5 gap-2">
        <h3 className="text-lg font-bold line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center gap-2 mt-auto">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-xl font-bold text-primary-600 dark:text-primary-400"
            aria-label={`Prix : ${product.price} €`}
          >
            {product.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
          </motion.span>
          {product.type && (
            <span className="ml-2 px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-300">
              {product.type}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard; 