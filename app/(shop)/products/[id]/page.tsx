import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/shop/product-detail';

// Mock product data - in a real app, this would come from your database
const products = [
  {
    id: '1',
    name: 'Dashboard Analytics Pro',
    description: 'Un tableau de bord complet avec des graphiques interactifs, des métriques en temps réel et une interface utilisateur moderne. Parfait pour les applications d\'analyse de données et de business intelligence.',
    longDescription: `
      <h3>Fonctionnalités principales</h3>
      <ul>
        <li>Graphiques interactifs avec Chart.js et D3.js</li>
        <li>Métriques en temps réel</li>
        <li>Interface responsive et moderne</li>
        <li>Thème sombre/clair</li>
        <li>Exportation des données (PDF, Excel)</li>
        <li>Filtres avancés et recherche</li>
      </ul>
      
      <h3>Technologies utilisées</h3>
      <ul>
        <li>React 18+ avec TypeScript</li>
        <li>Tailwind CSS pour le styling</li>
        <li>Framer Motion pour les animations</li>
        <li>Recharts pour les graphiques</li>
        <li>Zustand pour la gestion d'état</li>
      </ul>
      
      <h3>Compatibilité</h3>
      <p>Compatible avec Next.js 13+, Vite, et Create React App. Fonctionne parfaitement avec les dernières versions de React.</p>
    `,
    price: 49,
    originalPrice: 79,
    images: [
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Dashboard',
    tags: ['React', 'TypeScript', 'Analytics', 'Charts', 'Dashboard'],
    rating: 4.9,
    reviews: 156,
    featured: true,
    downloadCount: 1250,
    lastUpdated: '2024-01-15',
    version: '2.1.0',
    fileSize: '2.5 MB',
    license: 'Commercial',
    support: '1 an inclus',
    requirements: {
      react: '18.0.0+',
      node: '16.0.0+',
      typescript: '4.5.0+',
    },
    files: [
      { name: 'Source Code', type: 'ZIP', size: '2.5 MB' },
      { name: 'Documentation', type: 'PDF', size: '1.2 MB' },
      { name: 'Figma Design', type: 'FIGMA', size: '850 KB' },
    ],
  },
  {
    id: '2',
    name: 'E-commerce Components',
    description: 'Collection complète de composants e-commerce incluant panier, checkout, catalogue produits et gestion des commandes.',
    longDescription: `
      <h3>Composants inclus</h3>
      <ul>
        <li>Catalogue produits avec filtres avancés</li>
        <li>Panier d'achat avec persistance</li>
        <li>Processus de checkout sécurisé</li>
        <li>Gestion des commandes</li>
        <li>Système de reviews et ratings</li>
        <li>Wishlist et favoris</li>
      </ul>
      
      <h3>Intégrations</h3>
      <ul>
        <li>Stripe pour les paiements</li>
        <li>PayPal integration</li>
        <li>Gestion d'inventaire</li>
        <li>Système de coupons</li>
        <li>Calcul automatique des taxes</li>
      </ul>
    `,
    price: 39,
    originalPrice: 59,
    images: [
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'E-commerce',
    tags: ['Vue', 'E-commerce', 'Shopping', 'Cart', 'Checkout'],
    rating: 4.8,
    reviews: 203,
    featured: true,
    downloadCount: 890,
    lastUpdated: '2024-01-10',
    version: '1.8.2',
    fileSize: '3.1 MB',
    license: 'Commercial',
    support: '1 an inclus',
    requirements: {
      vue: '3.0.0+',
      node: '16.0.0+',
      typescript: '4.5.0+',
    },
    files: [
      { name: 'Vue Components', type: 'ZIP', size: '3.1 MB' },
      { name: 'Documentation', type: 'PDF', size: '1.8 MB' },
      { name: 'Demo Project', type: 'ZIP', size: '5.2 MB' },
    ],
  },
];

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return {
      title: 'Produit non trouvé - SaboWaryan Tech',
    };
  }

  // Ensure we have a valid image URL
  const imageUrl = product.images[0] || '/og-default.jpg';

  return {
    title: `${product.name} - SaboWaryan Tech`,
    description: product.description,
    keywords: [product.name, ...product.tags, 'SaboWaryan', 'composants premium'],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  // Structured Data for Product
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'SaboWaryan Tech',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'SaboWaryan Tech',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetail product={product} />
    </>
  );
}