"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

const mockData = [
  { type: "page", label: "Accueil", value: "/" },
  { type: "page", label: "Boutique", value: "/shop" },
  { type: "page", label: "Templates", value: "/templates" },
  { type: "action", label: "Changer le thème", value: "theme" },
  { type: "product", label: "Composant Button", value: "/shop/prod-1" },
  { type: "product", label: "Template Dashboard", value: "/shop/prod-2" },
];

const fuse = new Fuse(mockData, { keys: ["label"], threshold: 0.3 });

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [results, setResults] = useState(mockData);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Open/close via Cmd+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  // Open via custom event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-palette", handler);
    return () => window.removeEventListener("open-command-palette", handler);
  }, []);
  // Focus input on open
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  // Fuzzy search
  useEffect(() => {
    if (!query) setResults(mockData);
    else setResults(fuse.search(query).map(r => r.item));
    setSelected(0);
  }, [query]);
  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { setSelected(s => Math.min(s + 1, results.length - 1)); e.preventDefault(); }
      if (e.key === "ArrowUp") { setSelected(s => Math.max(s - 1, 0)); e.preventDefault(); }
      if (e.key === "Enter" && results[selected]) {
        handleSelect(results[selected]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, selected]);

  function handleSelect(item: typeof mockData[0]) {
    setOpen(false);
    if (item.type === "action" && item.value === "theme") {
      window.dispatchEvent(new CustomEvent("toggle-theme"));
    } else if (item.value.startsWith("/")) {
      window.location.href = item.value;
    }
  }

  // Group results by type
  const grouped = results.reduce((acc, item) => {
    (acc[item.type] ??= []).push(item);
    return acc;
  }, {} as Record<string, typeof mockData>);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="mt-32 w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-4 relative"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
            ref={listRef}
          >
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-lg outline-none mb-2"
              placeholder="Recherche (Cmd+K)"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Recherche globale"
            />
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-200 dark:divide-slate-800">
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type} className="py-2">
                  <div className="text-xs uppercase font-bold text-slate-400 mb-1 pl-2">{type}</div>
                  {items.map((item, i) => (
                    <button
                      key={item.value}
                      className={
                        "w-full text-left px-4 py-2 rounded-lg transition-colors " +
                        (selected === results.indexOf(item)
                          ? "bg-primary-600 text-white"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800")
                      }
                      onClick={() => handleSelect(item)}
                      tabIndex={0}
                      aria-selected={selected === results.indexOf(item)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
              {results.length === 0 && (
                <div className="text-center text-slate-400 py-8">Aucun résultat</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette; 