'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 'all', name: 'Tous', count: 24 },
  { id: 'react', name: 'React', count: 12 },
  { id: 'vue', name: 'Vue', count: 8 },
  { id: 'angular', name: 'Angular', count: 6 },
  { id: 'templates', name: 'Templates', count: 15 },
];

const products = [
  {
    id: '1',
    name: 'Dashboard Analytics Pro',
    price: 49,
    originalPrice: 79,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'react',
    rating: 4.9,
    reviews: 156,
    featured: true,
    tags: ['Dashboard', 'Analytics', 'Charts'],
    description: 'Tableau de bord complet avec graphiques interactifs',
  },
  {
    id: '2',
    name: 'E-commerce Components',
    price: 39,
    originalPrice: 59,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'vue',
    rating: 4.8,
    reviews: 203,
    featured: true,
    tags: ['E-commerce', 'Shopping', 'Cart'],
    description: 'Composants e-commerce complets et optimisés',
  },
  {
    id: '3',
    name: 'Admin Template Modern',
    price: 69,
    originalPrice: 99,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'templates',
    rating: 4.7,
    reviews: 89,
    featured: false,
    tags: ['Admin', 'Template', 'Modern'],
    description: 'Template d\'administration moderne et responsive',
  },
  {
    id: '4',
    name: 'Form Builder Advanced',
    price: 29,
    originalPrice: 45,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'angular',
    rating: 4.6,
    reviews: 124,
    featured: true,
    tags: ['Forms', 'Builder', 'Validation'],
    description: 'Constructeur de formulaires avec validation avancée',
  },
  {
    id: '5',
    name: 'Landing Page Kit',
    price: 35,
    originalPrice: 55,
    image: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'templates',
    rating: 4.9,
    reviews: 267,
    featured: true,
    tags: ['Landing', 'Marketing', 'Conversion'],
    description: 'Kit complet pour créer des landing pages efficaces',
  },
  {
    id: '6',
    name: 'Data Visualization Suite',
    price: 59,
    originalPrice: 89,
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'react',
    rating: 4.8,
    reviews: 178,
    featured: false,
    tags: ['Charts', 'Data', 'Visualization'],
    description: 'Suite complète de visualisation de données',
  },
];

const ProductsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, filteredProducts.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentIndex(0);
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-4"
          >
            <Filter className="w-4 h-4 mr-2" />
            Produits Vedettes
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nos{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Meilleures Créations
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de composants et templates premium, 
            conçus pour accélérer vos projets de développement
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              animate={{ x: `${-currentIndex * (100 / itemsPerView)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex"
              style={{ width: `${(filteredProducts.length / itemsPerView) * 100}%` }}
            >
              <AnimatePresence mode="wait">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={`${activeCategory}-${product.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700">
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Featured Badge */}
                        {product.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                              Vedette
                            </Badge>
                          </div>
                        )}

                        {/* Discount Badge */}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 right-4">
                            <Badge variant="destructive">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          {product.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({product.reviews} avis)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary-600">
                              {product.price}€
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {product.originalPrice}€
                              </span>
                            )}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Voir Plus
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600'
                    : 'bg-gray-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Voir Tous les Produits
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsShowcase;