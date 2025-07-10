"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, ShoppingCart, User, Search, Sun, Moon } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { useCartStore } from "@/lib/store/cart-store";
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const cartCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 w-full transition-shadow border-b border-transparent" +
        (scrolled
          ? " shadow-lg border-slate-200 dark:border-dark-700"
          : "")
      }
      style={{
        background:
          "var(--header-bg, rgba(255,255,255,0.7))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent select-none"
          whileHover={{ scale: 1.08, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          aria-label="Accueil SaboWaryan"
        >
          <span className="drop-shadow-sm">Sabowaryan</span>
        </motion.a>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/shop" className="hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400">Boutique</a>
          <a href="/templates" className="hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400">Templates</a>
          <a href="/about" className="hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400">À propos</a>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Recherche */}
          <button
            className="p-2 rounded hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label="Recherche (Cmd+K)"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          >
            <Search className="w-5 h-5" />
          </button>
          {/* Panier */}
          <button
            className="relative p-2 rounded hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label="Voir le panier"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">
                {cartCount}
              </span>
            )}
          </button>
          {/* Theme toggle */}
          <motion.button
            className="p-2 rounded hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label="Changer le thème"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileTap={{ rotate: 180, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <span className="sr-only">Changer le thème</span>
            <span className="inline-block transition-transform duration-300">
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </span>
          </motion.button>
          {/* User menu */}
          <div className="relative group">
            <button className="p-2 rounded hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400" aria-haspopup="menu">
              <User className="w-5 h-5" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-800 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-30 border border-slate-100 dark:border-dark-700">
              <a href="/account" className="block px-4 py-2 hover:bg-primary-50 dark:hover:bg-dark-700/50 transition-colors">Mon compte</a>
              <a href="/orders" className="block px-4 py-2 hover:bg-primary-50 dark:hover:bg-dark-700/50 transition-colors">Commandes</a>
              <button className="w-full text-left px-4 py-2 hover:bg-primary-50 dark:hover:bg-dark-700/50 transition-colors">Déconnexion</button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <button className="md:hidden p-2 ml-2" aria-label="Ouvrir le menu" onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      {/* Panier drawer (à implémenter) */}
      {/* Command palette (à implémenter) */}
    </header>
  );
};

export default Header;