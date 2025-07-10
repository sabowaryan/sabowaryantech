'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Star,
  Filter,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Filters {
  categories: string[];
  priceRange: [number, number];
  tags: string[];
  featured: boolean | null;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  categories: string[];
  allProducts: any[];
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PriceRangeSlider: React.FC<{
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}> = ({ value, onChange, min, max }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (index: number, newValue: number) => {
    const newRange: [number, number] = [...localValue];
    newRange[index] = newValue;
    
    // Ensure min <= max
    if (index === 0 && newValue > localValue[1]) {
      newRange[1] = newValue;
    } else if (index === 1 && newValue < localValue[0]) {
      newRange[0] = newValue;
    }
    
    setLocalValue(newRange);
    onChange(newRange);
  };

  const percentage = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        {/* Track */}
        <div
          className="absolute h-2 bg-primary-600 rounded-full"
          style={{
            left: `${percentage(localValue[0])}%`,
            width: `${percentage(localValue[1]) - percentage(localValue[0])}%`,
          }}
        />
        
        {/* Min Handle */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-primary-600 rounded-full cursor-pointer transform -translate-y-1.5 -translate-x-2.5 shadow-md hover:scale-110 transition-transform"
          style={{ left: `${percentage(localValue[0])}%` }}
        />
        
        {/* Max Handle */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-primary-600 rounded-full cursor-pointer transform -translate-y-1.5 -translate-x-2.5 shadow-md hover:scale-110 transition-transform"
          style={{ left: `${percentage(localValue[1])}%` }}
        />
      </div>
      
      {/* Input Fields */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Min
          </label>
          <input
            type="number"
            value={localValue[0]}
            onChange={(e) => handleChange(0, Number(e.target.value))}
            min={min}
            max={max}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max
          </label>
          <input
            type="number"
            value={localValue[1]}
            onChange={(e) => handleChange(1, Number(e.target.value))}
            min={min}
            max={max}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>
    </div>
  );
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  allProducts,
}) => {
  // Extract unique tags from all products
  const allTags = Array.from(
    new Set(allProducts.flatMap(product => product.tags))
  ).sort();

  // Calculate price range
  const prices = allProducts.map(product => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags,
    });
  };

  const handlePriceRangeChange = (priceRange: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange,
    });
  };

  const handleFeaturedChange = (featured: boolean | null) => {
    onFiltersChange({
      ...filters,
      featured,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [minPrice, maxPrice],
      tags: [],
      featured: null,
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.tags.length > 0 || 
                          filters.featured !== null ||
                          filters.priceRange[0] !== minPrice ||
                          filters.priceRange[1] !== maxPrice;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Filtres
          </h2>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Catégories">
        <div className="space-y-3">
          {categories.filter(cat => cat !== 'Tous').map((category) => {
            const isSelected = filters.categories.includes(category);
            const count = allProducts.filter(p => p.category === category).length;
            
            return (
              <motion.label
                key={category}
                whileHover={{ x: 2 }}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className={cn(
                    'text-sm transition-colors',
                    isSelected 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600'
                  )}>
                    {category}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </motion.label>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Fourchette de prix">
        <PriceRangeSlider
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
          min={minPrice}
          max={maxPrice}
        />
      </FilterSection>

      {/* Featured */}
      <FilterSection title="Type de produit">
        <div className="space-y-3">
          <motion.label
            whileHover={{ x: 2 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name="featured"
              checked={filters.featured === null}
              onChange={() => handleFeaturedChange(null)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className={cn(
              'text-sm transition-colors',
              filters.featured === null
                ? 'text-primary-600 font-medium' 
                : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600'
            )}>
              Tous les produits
            </span>
          </motion.label>
          
          <motion.label
            whileHover={{ x: 2 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name="featured"
              checked={filters.featured === true}
              onChange={() => handleFeaturedChange(true)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className={cn(
                'text-sm transition-colors',
                filters.featured === true
                  ? 'text-primary-600 font-medium' 
                  : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600'
              )}>
                Produits vedettes
              </span>
            </div>
          </motion.label>
          
          <motion.label
            whileHover={{ x: 2 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name="featured"
              checked={filters.featured === false}
              onChange={() => handleFeaturedChange(false)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className={cn(
              'text-sm transition-colors',
              filters.featured === false
                ? 'text-primary-600 font-medium' 
                : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600'
            )}>
              Produits standards
            </span>
          </motion.label>
        </div>
      </FilterSection>

      {/* Tags */}
      <FilterSection title="Technologies">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = filters.tags.includes(tag);
            const count = allProducts.filter(p => p.tags.includes(tag)).length;
            
            return (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTagChange(tag)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border',
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300'
                )}
              >
                {tag}
                <span className="ml-1 text-xs opacity-75">
                  ({count})
                </span>
              </motion.button>
            );
          })}
        </div>
      </FilterSection>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Filtres actifs
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map(category => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category}
                <button
                  onClick={() => handleCategoryChange(category)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {filters.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => handleTagChange(tag)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {filters.featured === true && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Vedettes
                <button
                  onClick={() => handleFeaturedChange(null)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;