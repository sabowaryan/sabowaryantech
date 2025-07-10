"use client";
import React, { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { Search, Mic, X, ChevronDown } from "lucide-react";

const mockSuggestions = [
  "React Button", "Dashboard", "Template", "E-commerce", "UI Kit", "Admin Panel"
];

const mockFacets = [
  { label: "UI", count: 42 },
  { label: "Templates", count: 18 },
  { label: "E-commerce", count: 12 },
  { label: "Admin", count: 7 },
];

const mockSorts = [
  { label: "Pertinence", value: "relevance" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Nouveautés", value: "new" },
];

interface SearchInterfaceProps {
  initialQuery?: string;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState(mockSorts[0].value);
  const [selectedFacets, setSelectedFacets] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Fuzzy search (mock)
  const fuse = new Fuse(mockSuggestions, { threshold: 0.4 });
  const suggestions = query
    ? fuse.search(query).map(r => r.item)
    : mockSuggestions;

  // Historique localStorage
  useEffect(() => {
    const h = localStorage.getItem("search-history");
    if (h) setHistory(JSON.parse(h));
  }, []);
  useEffect(() => {
    localStorage.setItem("search-history", JSON.stringify(history));
  }, [history]);

  // Recherche vocale (Web Speech API)
  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    if (!recognitionRef.current) {
      const rec = new (window as any).webkitSpeechRecognition();
      rec.lang = "fr-FR";
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setQuery(transcript);
        setShowSuggestions(true);
      };
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
    }
    setListening(true);
    recognitionRef.current.start();
  };

  // Gère la sélection d'une suggestion
  const handleSelect = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
    setHistory((h) => [s, ...h.filter(x => x !== s)].slice(0, 8));
  };

  // Facettes
  const toggleFacet = (facet: string) => {
    setSelectedFacets(f => f.includes(facet) ? f.filter(x => x !== facet) : [...f, facet]);
  };

  // Tri
  const handleSort = (v: string) => setSelectedSort(v);

  // Effet debounce (pour la recherche réelle)
  useEffect(() => {
    const t = setTimeout(() => {
      // Ici, déclencher la recherche réelle (API, etc.)
    }, 300);
    return () => clearTimeout(t);
  }, [query, selectedFacets, selectedSort]);

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        {/* Champ de recherche */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="search"
            className="w-full px-4 py-2 rounded-lg border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Rechercher un produit, un tag, ..."
            value={query}
            onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            aria-label="Recherche de produits"
            autoComplete="off"
          />
          {query && (
            <button className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setQuery("")}> <X className="w-4 h-4" /> </button>
          )}
          <button
            className={"absolute right-2 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-800" + (listening ? " animate-pulse" : "")}
            onClick={handleVoice}
            aria-label="Recherche vocale"
            type="button"
          >
            <Mic className="w-5 h-5" />
          </button>
          {/* Suggestions */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
              {suggestions.length > 0 ? suggestions.map(s => (
                <button
                  key={s}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  onClick={() => handleSelect(s)}
                >
                  <Search className="w-4 h-4 mr-2 inline" /> {s}
                </button>
              )) : (
                <div className="px-4 py-2 text-slate-400">Aucune suggestion</div>
              )}
              {history.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs text-slate-400 border-t">Historique</div>
                  {history.map(h => (
                    <button
                      key={h}
                      className="w-full text-left px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      onClick={() => handleSelect(h)}
                    >
                      <Search className="w-4 h-4 mr-2 inline" /> {h}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        {/* Facettes */}
        <div className="flex flex-wrap gap-2">
          {mockFacets.map(f => (
            <button
              key={f.label}
              className={
                "px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition " +
                (selectedFacets.includes(f.label)
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-primary-50 dark:hover:bg-primary-900/20")
              }
              onClick={() => toggleFacet(f.label)}
            >
              {f.label}
              <span className="text-xs bg-white/30 rounded px-1">{f.count}</span>
            </button>
          ))}
        </div>
        {/* Tri */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-3 py-2 rounded-lg border bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20"
            onClick={() => setShowSuggestions(false)}
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            {mockSorts.find(s => s.value === selectedSort)?.label}
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute left-0 mt-2 bg-white dark:bg-slate-900 border rounded-lg shadow-lg z-10 min-w-[160px]">
            {mockSorts.map(s => (
              <button
                key={s.value}
                className={
                  "w-full text-left px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 " +
                  (selectedSort === s.value ? "font-bold text-primary-600" : "")
                }
                onClick={() => handleSort(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface; 