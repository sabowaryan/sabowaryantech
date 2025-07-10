"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompareStore } from "@/lib/store/compare-store";
import ProductCard from "@/components/product/product-card";

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  products: any[]; // à typer selon ton Product
}

const CompareModal: React.FC<CompareModalProps> = ({ open, onClose, products }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // Focus trap
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    return () => { prev?.focus(); };
  }, [open]);

  // Fermer avec ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          ref={modalRef}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-6xl w-full mx-4 p-8 relative overflow-x-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary-600 text-2xl font-bold focus:outline-none"
              aria-label="Fermer la comparaison"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Comparaison de produits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="min-w-[260px]">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareModal; 