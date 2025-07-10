import { Metadata } from 'next';
import ProductCatalog from '@/components/shop/product-catalog';

export const metadata: Metadata = {
  title: 'Produits - SaboWaryan Tech',
  description: 'Découvrez notre collection complète de composants React, Vue, Angular et templates premium pour accélérer vos projets de développement.',
  keywords: [
    'composants React',
    'templates Vue',
    'Angular components',
    'UI components',
    'premium templates',
    'développement web',
    'interface utilisateur',
    'catalogue produits'
  ],
  openGraph: {
    title: 'Catalogue Produits - SaboWaryan Tech',
    description: 'Explorez notre vaste collection de composants et templates premium.',
    images: ['/og-products.jpg'],
  },
};

// Structured Data for Product Catalog
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Catalogue Produits SaboWaryan',
  description: 'Collection de composants et templates premium pour développeurs',
  url: 'https://sabowaryan.tech/products',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Produits SaboWaryan',
    numberOfItems: 50,
  },
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductCatalog />
    </>
  );
}