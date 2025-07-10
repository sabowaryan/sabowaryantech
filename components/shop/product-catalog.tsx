'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from './product-card';
import ProductFilters from './product-filters';
import { cn } from '@/lib/utils';

// Mock products data
const allProducts = [
  {
    id: '1',
    name: 'Dashboard Analytics Pro',
    description: 'Tableau de bord complet avec graphiques interactifs',
    price: 49,
    originalPrice: 79,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dashboard',
    tags: ['React', 'TypeScript', 'Analytics'],
    rating: 4.9,
    reviews: 156,
    featured: true,
    downloadCount: 1250,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'E-commerce Components',
    description: 'Composants e-commerce complets et optimisés',
    price: 39,
    originalPrice: 59,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'E-commerce',
    tags: ['Vue', 'E-commerce', 'Shopping'],
    rating: 4.8,
    reviews: 203,
    featured: true,
    downloadCount: 890,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Admin Template Modern',
    description: 'Template d\'administration moderne et responsive',
    price: 69,
    originalPrice: 99,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Admin',
    tags: ['Angular', 'Admin', 'Template'],
    rating: 4.7,
    reviews: 89,
    featured: false,
    downloadCount: 567,
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    name: 'Form Builder Advanced',
    description: 'Constructeur de formulaires avec validation avancée',
    price: 29,
    originalPrice: 45,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Forms',
    tags: ['React', 'Forms', 'Validation'],
    rating: 4.6,
    reviews: 124,
    featured: true,
    downloadCount: 734,
    createdAt: '2024-01-08',
  },
  {
    id: '5',
    name: 'Landing Page Kit',
    description: 'Kit complet pour créer des landing pages efficaces',
    price: 35,
    originalPrice: 55,
    image: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Landing',
    tags: ['HTML', 'CSS', 'Marketing'],
    rating: 4.9,
    reviews: 267,
    featured: true,
    downloadCount: 1456,
    createdAt: '2024-01-12',
  },
  {
    id: '6',
    name: 'Data Visualization Suite',
    description: 'Suite complète de visualisation de données',
    price: 59,
    originalPrice: 89,
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Charts',
    tags: ['React', 'Charts', 'Data'],
    rating: 4.8,
    reviews: 178,
    featured: false,
    downloadCount: 623,
    createdAt: '2024-01-03',
  },
];

const categories = ['Tous', 'Dashboard', 'E-commerce', 'Admin', 'Forms', 'Landing', 'Charts'];
const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'oldest', label: 'Plus anciens' },
  { value: 'price-low', label: 'Prix croissant' },
  { value: 'price-high', label: 'Prix décroissant' },
  { value: 'popular', label: 'Plus populaires' },
  { value: 'rating', label: 'Mieux notés' },
];

interface Filters {
  categories: string[];
  priceRange: [number, number];
  tags: string[];
  featured: boolean | null;
}

const ProductCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 100],
    tags: [],
    featured: null,
  });

  const itemsPerPage = 12;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Tags
      if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
        return false;
      }

      // Featured
      if (filters.featured !== null && product.featured !== filters.featured) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.downloadCount - a.downloadCount;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy]);

  // Simulate loading
  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 100],
      tags: [],
      featured: null,
    });
    setSearchQuery('');
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.tags.length > 0 || 
                          filters.featured !== null ||
                          searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Catalogue Produits
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Découvrez notre collection complète de composants et templates premium 
              pour accélérer vos projets de développement.
            </p>
          </motion.div>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 w-full"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-3 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-3 transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Filtres actifs:
                </span>
                
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Recherche: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        categories: prev.categories.filter(c => c !== category)
                      }))}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}

                {filters.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        tags: prev.tags.filter(t => t !== tag)
                      }))}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  Tout effacer
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            'lg:block lg:w-80 flex-shrink-0',
            showFilters ? 'block' : 'hidden'
          )}>
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              allProducts={allProducts}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  'Recherche en cours...'
                ) : (
                  `${filteredProducts.length} produit${filteredProducts.length !== 1 ? 's' : ''} trouvé${filteredProducts.length !== 1 ? 's' : ''}`
                )}
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              )}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-4" />
                    <div className="space-y-2">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4" />
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Products */}
                <AnimatePresence mode="wait">
                  {paginatedProducts.length > 0 ? (
                    <motion.div
                      key={`${currentPage}-${sortBy}-${JSON.stringify(filters)}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'grid gap-6',
                        viewMode === 'grid' 
                          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                          : 'grid-cols-1'
                      )}
                    >
                      {paginatedProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <ProductCard 
                            product={product} 
                            viewMode={viewMode}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Aucun produit trouvé
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Essayez de modifier vos critères de recherche ou vos filtres.
                      </p>
                      <Button onClick={clearAllFilters}>
                        Effacer tous les filtres
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Précédent
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                          className="w-10 h-10 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;