'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram,
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

const footerSections = {
  company: {
    title: 'Entreprise',
    links: [
      { name: 'À Propos', href: '/about' },
      { name: 'Notre Équipe', href: '/team' },
      { name: 'Carrières', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Presse', href: '/press' },
    ],
  },
  products: {
    title: 'Produits',
    links: [
      { name: 'Composants React', href: '/shop?category=react' },
      { name: 'Templates Vue', href: '/shop?category=vue' },
      { name: 'Modules Angular', href: '/shop?category=angular' },
      { name: 'Templates Complets', href: '/shop?category=templates' },
      { name: 'Nouveautés', href: '/shop?filter=new' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Centre d\'Aide', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api-docs' },
      { name: 'Communauté', href: '/community' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    title: 'Légal',
    links: [
      { name: 'Conditions d\'Utilisation', href: '/terms' },
      { name: 'Politique de Confidentialité', href: '/privacy' },
      { name: 'Politique de Cookies', href: '/cookies' },
      { name: 'Licences', href: '/licenses' },
      { name: 'RGPD', href: '/gdpr' },
    ],
  },
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sabowaryantech', color: 'hover:text-blue-400' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/sabowaryantech', color: 'hover:text-gray-900 dark:hover:text-white' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/sabowaryantech', color: 'hover:text-blue-600' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/sabowaryantech', color: 'hover:text-pink-500' },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Merci pour votre inscription à notre newsletter !');
      setEmail('');
    } catch (error) {
      toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-500/5 to-primary-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                      SaboWaryan
                    </h2>
                    <p className="text-sm text-gray-400 -mt-1">
                      Tech Solutions
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Créez des interfaces exceptionnelles avec nos composants premium. 
                  Accélérez votre développement avec des solutions de qualité professionnelle.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-primary-400" />
                    <span>contact@sabowaryan.tech</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-primary-400" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    <span>Paris, France</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 bg-slate-800 rounded-lg text-gray-400 transition-colors duration-200 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerSections).map(([key, section], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="lg:col-span-1"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-slate-700"
          >
            <div className="max-w-md">
              <h3 className="text-lg font-semibold text-white mb-2">
                Restez Informé
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Recevez nos derniers composants et offres exclusives directement dans votre boîte mail.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-primary-500"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-6"
                >
                  {isSubscribing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>© 2024 SaboWaryan. Tous droits réservés.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Fait avec <Heart className="w-4 h-4 text-red-500" /> en France
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Conditions
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Confidentialité
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;