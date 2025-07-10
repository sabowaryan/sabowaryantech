import React, { Suspense } from "react";
import ProductGrid from "@/components/shop/product-grid";
import SearchInterface from "@/components/shop/search-interface";
import ProductFilters from "@/components/shop/product-filters";

// Simule une récupération de produits côté serveur (à remplacer par un vrai fetch)
async function fetchProducts({ q, filters, page }: { q?: string; filters?: any; page?: number }) {
  // Ici, tu pourrais faire un fetch API/DB
  await new Promise((r) => setTimeout(r, 500)); // Simule un délai
  return Array.from({ length: 20 }, (_, i) => ({
    id: `prod-${page || 1}-${i}`,
    name: `Produit ${i + 1}${q ? ` - ${q}` : ""}`,
    price: Math.round(Math.random() * 100) + 10,
    image: `https://source.unsplash.com/400x300/?product,${i}`,
    description: "Description du produit...",
    category: "UI",
    tags: ["UI", "React"],
  }));
}

export default async function ProductsPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const page = Number(searchParams.page) || 1;
  // Les filtres peuvent être extraits de searchParams
  const filters = {};
  // Pré-fetch SSR pour la première page
  const initialProducts = await fetchProducts({ q, filters, page });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catalogue produits</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <Suspense fallback={<div>Chargement des filtres...</div>}>
            <ProductFilters initialFilters={filters} />
          </Suspense>
        </aside>
        <main className="flex-1 min-w-0">
          <SearchInterface initialQuery={q} />
          <Suspense fallback={<div>Chargement des produits...</div>}>
            <ProductGrid initialProducts={initialProducts} initialQuery={q} initialFilters={filters} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}