import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaboWaryanTech',
  description: 'Advanced technology solutions platform',
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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        
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
            `,
          }}
        />
      </body>
    </html>
  );
}