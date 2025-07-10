'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, 
  Search, 
  ShoppingCart, 
  User, 
  ChevronRight,
  ChevronDown,
  Home,
  Package,
  Grid,
  Info,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cart-store';
import { useAuthStore } from '@/lib/store/auth';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  submenu?: Array<{
    name: string;
    href: string;
  }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

const navigationIcons = {
  'Accueil': Home,
  'Produits': Package,
  'Catégories': Grid,
  'À Propos': Info,
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  
  const cartCount = useCartStore((state) => state.getItemCount());
  const { user, isAuthenticated } = useAuthStore();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      onClose();
    }
  };

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Menu
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-slate-800 border-0 rounded-xl focus:ring-2 focus:ring-primary-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </form>
              </div>

              {/* User Section */}
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" onClick={onClose}>
                      <Button variant="outline" className="w-full justify-start">
                        <LogIn className="w-4 h-4 mr-3" />
                        Se Connecter
                      </Button>
                    </Link>
                    <Link href="/register" onClick={onClose}>
                      <Button className="w-full justify-start bg-gradient-to-r from-primary-600 to-secondary-600">
                        <UserPlus className="w-4 h-4 mr-3" />
                        S'Inscrire
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6">
                <div className="space-y-2">
                  {navigation.map((item, index) => {
                    const Icon = navigationIcons[item.name as keyof typeof navigationIcons];
                    const isExpanded = expandedItems.includes(item.name);
                    const isActive = pathname === item.href || pathname.startsWith(item.href);

                    return (
                      <motion.div
                        key={item.name}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        {item.submenu ? (
                          <div>
                            <button
                              onClick={() => toggleExpanded(item.name)}
                              className={cn(
                                'w-full flex items-center justify-between p-3 rounded-xl transition-colors duration-200',
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                {Icon && <Icon className="w-5 h-5" />}
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <ChevronDown 
                                className={cn(
                                  'w-4 h-4 transition-transform duration-200',
                                  isExpanded ? 'rotate-180' : ''
                                )} 
                              />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-8 mt-2 space-y-1">
                                    {item.submenu.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-xl transition-colors duration-200',
                              isActive
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                            )}
                          >
                            {Icon && <Icon className="w-5 h-5" />}
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Cart & Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-slate-700">
                <Link href="/cart" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Panier</span>
                    </div>
                    {cartCount > 0 && (
                      <Badge className="bg-primary-600 text-white">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;