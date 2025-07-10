import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ScrollToTop from '@/components/layout/scroll-to-top';
import ErrorBoundary from '@/components/layout/error-boundary';
import { ThemeProvider } from '@/components/layout/theme-provider';
import CommandPalette from '@/components/layout/command-palette';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ProgressBar from '@/components/layout/progress-bar';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import NetworkStatus from '@/components/layout/network-status';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SaboWaryan - Composants Premium pour Développeurs',
    template: '%s | SaboWaryan'
  },
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
    title: 'SaboWaryan - Composants Premium pour Développeurs',
    description: 'Découvrez notre collection de composants React, Vue et Angular premium. Téléchargement instantané, licence commerciale incluse.',
    url: 'https://sabowaryan.tech',
    siteName: 'SaboWaryan',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SaboWaryan - Composants Premium',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaboWaryan - Composants Premium pour Développeurs',
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
  name: 'SaboWaryan',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#C51F5D" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Analytics placeholder - replace with your actual analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID');
                `,
              }}
            />
          </>
        )}
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressBar />
            <NetworkStatus />
            <CommandPalette />
            <Header />
            <Breadcrumbs />
            <main className="flex-1 pt-16 lg:pt-20">
              {children}
            </main>
            <Footer />
            
            <ScrollToTop />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </ErrorBoundary>
        
        {/* Smooth Scrolling Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.style.scrollBehavior = 'smooth';
              
              // Handle smooth scrolling for anchor links
              document.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                  e.preventDefault();
                  const target = document.querySelector(e.target.getAttribute('href'));
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              });
              
              // Keyboard navigation support
              document.addEventListener('keydown', function(e) {
                // ESC key to close modals/menus
                if (e.key === 'Escape') {
                  const event = new CustomEvent('escape-pressed');
                  document.dispatchEvent(event);
                }
                
                // Tab navigation improvements
                if (e.key === 'Tab') {
                  document.body.classList.add('keyboard-navigation');
                }
              });
              
              // Remove keyboard navigation class on mouse use
              document.addEventListener('mousedown', function() {
                document.body.classList.remove('keyboard-navigation');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}