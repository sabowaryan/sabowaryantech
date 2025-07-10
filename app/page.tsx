import { Metadata } from 'next';
import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import ProductsShowcase from '@/components/landing/products-showcase';
import StatsSection from '@/components/landing/stats-section';
import CTASection from '@/components/landing/cta-section';

export const metadata: Metadata = {
  title: 'SaboWaryan - Composants Premium pour Développeurs',
  description: 'Découvrez notre collection de composants React, Vue et Angular premium. Téléchargement instantané, licence commerciale incluse, support technique 24/7.',
  keywords: [
    'composants React',
    'templates Vue',
    'Angular components',
    'UI components',
    'premium templates',
    'développement web',
    'interface utilisateur',
    'SaboWaryan'
  ],
  authors: [{ name: 'SaboWaryan Team' }],
  creator: 'SaboWaryan',
  publisher: 'SaboWaryan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sabowaryan.tech'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'SaboWaryanTech - Composants Premium pour Développeurs',
    description: 'Découvrez notre collection de composants React, Vue et Angular premium. Téléchargement instantané, licence commerciale incluse.',
    url: 'https://sabowaryan.tech',
    siteName: 'SaboWaryanTech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SaboWaryanTech - Composants Premium',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaboWaryanTech - Composants Premium pour Développeurs',
    description: 'Découvrez notre collection de composants React, Vue et Angular premium.',
    images: ['/og-image.jpg'],
    creator: '@sabowaryantech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SaboWaryanTech',
  url: 'https://sabowaryan.tech',
  logo: 'https://sabowaryan.tech/logo.png',
  description: 'Plateforme de composants premium pour développeurs web',
  sameAs: [
    'https://twitter.com/sabowaryantech',
    'https://github.com/sabowaryantech',
    'https://linkedin.com/company/sabowaryantech',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-1-23-45-67-89',
    contactType: 'customer service',
    availableLanguage: ['French', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: 'Paris',
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Products Showcase */}
        <ProductsShowcase />

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
}