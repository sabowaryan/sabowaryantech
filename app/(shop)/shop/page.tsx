'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { toast } from 'react-hot-toast';

const products = [
  {
    id: '1',
    name: 'Premium Laptop',
    price: 1299,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    rating: 4.8,
    reviews: 156,
    featured: true,
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 199,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Audio',
    rating: 4.6,
    reviews: 89,
    featured: false,
  },
  {
    id: '3',
    name: 'Smart Watch',
    price: 299,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Wearables',
    rating: 4.7,
    reviews: 124,
    featured: true,
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 149,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    rating: 4.9,
    reviews: 203,
    featured: false,
  },
  {
    id: '5',
    name: 'Gaming Mouse',
    price: 79,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Gaming',
    rating: 4.5,
    reviews: 67,
    featured: false,
  },
  {
    id: '6',
    name: 'Webcam HD',
    price: 89,
    image: 'https://images.pexels.com/photos/4005462/pexels-photo-4005462.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    rating: 4.4,
    reviews: 45,
    featured: true,
  },
];

export default function ShopPage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Shop
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the latest technology products and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-2 left-2">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}