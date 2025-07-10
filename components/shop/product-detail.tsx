'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Star, 
  Download, 
  ShoppingCart, 
  Heart, 
  Share2,
  ChevronRight,
  Calendar,
  Package,
  Shield,
  Headphones,
  FileText,
  Code,
  Palette,
  Monitor,
  Smartphone,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'react-hot-toast';
import { formatPrice, formatDate } from '@/lib/utils';
import ProductGallery from './product-gallery';
import ProductCard from './product-card';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    tags: string[];
    rating: number;
    reviews: number;
    featured: boolean;
    downloadCount: number;
    lastUpdated: string;
    version: string;
    fileSize: string;
    license: string;
    support: string;
    requirements: {
      react?: string;
      vue?: string;
      angular?: string;
      node?: string;
      typescript?: string;
    };
    files: Array<{
      name: string;
      type: string;
      size: string;
    }>;
  };
}

// Mock related products
const relatedProducts = [
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
];

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'requirements' | 'files' | 'reviews'>('description');
  const addItem = useCartStore((state) => state.addItem);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
      
      toast.success(`${product.name} ajouté au panier !`);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout au panier');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'requirements', label: 'Prérequis', icon: Code },
    { id: 'files', label: 'Fichiers', icon: Package },
    { id: 'reviews', label: 'Avis', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary-600 transition-colors">
            Produits
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Badges */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.featured && (
                <Badge className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                  Vedette
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  -{discountPercentage}% de réduction
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Rating and Downloads */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {product.rating}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.reviews} avis)
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Download className="w-5 h-5" />
                <span>{product.downloadCount.toLocaleString()} téléchargements</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dernière mise à jour</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(new Date(product.lastUpdated))}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Version</p>
                  <p className="font-medium text-gray-900 dark:text-white">{product.version}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Taille</p>
                  <p className="font-medium text-gray-900 dark:text-white">{product.fileSize}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Licence</p>
                  <p className="font-medium text-gray-900 dark:text-white">{product.license}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                Ajouter au panier
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleLike}
                className={isLiked ? 'text-red-600 border-red-600' : ''}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">Téléchargement instantané</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">Mises à jour gratuites à vie</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">{product.support}</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">Garantie satisfait ou remboursé 30 jours</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            {activeTab === 'description' && (
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Prérequis techniques
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.requirements).map(([tech, version]) => (
                    <div key={tech} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {tech}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Version {version}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Compatibilité
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Ce produit est compatible avec les dernières versions des frameworks mentionnés. 
                        Pour une compatibilité optimale, nous recommandons d'utiliser les versions spécifiées ou plus récentes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Fichiers inclus
                </h3>
                
                <div className="space-y-4">
                  {product.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{file.type}</Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                        Accès instantané
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Après l'achat, vous recevrez immédiatement un lien de téléchargement pour tous les fichiers. 
                        Aucun compte requis, téléchargement illimité.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Avis clients
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.rating} sur 5
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({product.reviews} avis)
                    </span>
                  </div>
                </div>

                {/* Mock Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: 'Marie Dubois',
                      rating: 5,
                      date: '2024-01-10',
                      comment: 'Excellent produit ! La qualité du code est exceptionnelle et la documentation très claire. Je recommande vivement.',
                    },
                    {
                      name: 'Thomas Martin',
                      rating: 5,
                      date: '2024-01-08',
                      comment: 'Parfait pour mon projet. L\'intégration s\'est faite sans problème et le support client est très réactif.',
                    },
                    {
                      name: 'Sophie Laurent',
                      rating: 4,
                      date: '2024-01-05',
                      comment: 'Très bon produit avec de nombreuses fonctionnalités. Quelques petites améliorations possibles mais globalement très satisfaite.',
                    },
                  ].map((review, index) => (
                    <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {review.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(new Date(review.date))}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Produits similaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;