"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Fermer avec ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);
  // Focus trap
  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 w-72 max-w-full h-full shadow-xl p-6 flex flex-col gap-4 safe-area-inset-y"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
            ref={ref}
          >
            <a href="/" className="font-extrabold text-xl mb-6">Sabowaryan</a>
            <a href="/shop" className="py-2 font-medium hover:text-primary-600">Boutique</a>
            <a href="/templates" className="py-2 font-medium hover:text-primary-600">Templates</a>
            <a href="/about" className="py-2 font-medium hover:text-primary-600">À propos</a>
            <div className="flex-1" />
            <button className="w-full text-left py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">Déconnexion</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;