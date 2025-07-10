"use client";
import React from "react";
import { X, Copy } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  tags: string[];
}

interface CompareTableProps {
  products: Product[];
  onRemove?: (id: string) => void;
  onClear?: () => void;
}

const fields = [
  { key: "image", label: "" },
  { key: "name", label: "Nom" },
  { key: "price", label: "Prix" },
  { key: "category", label: "Catégorie" },
  { key: "tags", label: "Tags" },
  { key: "description", label: "Description" },
];

const CompareTable: React.FC<CompareTableProps> = ({ products, onRemove, onClear }) => {
  if (!products.length) return null;

  // Export CSV
  const handleExportCSV = () => {
    const header = ["Champ", ...products.map(p => p.name)].join(",");
    const rows = fields.map(f => [f.label, ...products.map(p => {
      if (f.key === "tags") return p.tags.join(" | ");
      if (f.key === "image") return p.image;
      return (p as any)[f.key];
    })].join(",")).join("\n");
    const csv = header + "\n" + rows;
    navigator.clipboard.writeText(csv);
  };

  // Export URL (IDs dans l’URL)
  const handleExportURL = () => {
    const url = window.location.origin + "/compare?ids=" + products.map(p => p.id).join(",");
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-lg">Comparaison de produits</span>
        <button className="btn btn-outline btn-sm" onClick={handleExportCSV}><Copy className="w-4 h-4 mr-1" /> Copier CSV</button>
        <button className="btn btn-outline btn-sm" onClick={handleExportURL}><Copy className="w-4 h-4 mr-1" /> Copier URL</button>
        {onClear && <button className="btn btn-link text-red-600 ml-auto" onClick={onClear}>Vider</button>}
      </div>
      <table className="min-w-full border rounded-xl bg-white dark:bg-slate-900 shadow text-sm" aria-label="Tableau de comparaison produits">
        <thead>
          <tr>
            <th className="w-32 text-left font-semibold">Caractéristique</th>
            {products.map(p => (
              <th key={p.id} className="text-center font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <span>{p.name}</span>
                  {onRemove && (
                    <button className="text-red-500 hover:text-red-700" onClick={() => onRemove(p.id)} aria-label="Retirer">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map(f => (
            <tr key={f.key} className="border-t">
              <td className="font-medium py-2 px-2 text-slate-600 dark:text-slate-300">{f.label}</td>
              {products.map(p => (
                <td key={p.id} className="text-center py-2 px-2">
                  {f.key === "image" ? (
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded mx-auto" />
                  ) : f.key === "tags" ? (
                    <span className="inline-flex flex-wrap gap-1 justify-center">
                      {p.tags.map(t => <span key={t} className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200 px-2 py-0.5 rounded text-xs">{t}</span>)}
                    </span>
                  ) : (
                    <span>{(p as any)[f.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable; 