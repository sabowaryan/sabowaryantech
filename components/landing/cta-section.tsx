'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  Check, 
  Star, 
  Users, 
  Shield,
  Sparkles,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const socialProof = [
  {
    name: 'Marie Dubois',
    role: 'Lead Developer chez TechCorp',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    comment: 'SaboWaryan a révolutionné notre workflow de développement.',
    rating: 5,
  },
  {
    name: 'Thomas Martin',
    role: 'Freelance React Developer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    comment: 'Des composants de qualité exceptionnelle, je recommande !',
    rating: 5,
  },
  {
    name: 'Sophie Laurent',
    role: 'UI/UX Designer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    comment: 'Interface magnifique et composants très bien pensés.',
    rating: 5,
  },
];

const benefits = [
  'Accès immédiat à tous les composants',
  'Mises à jour gratuites à vie',
  'Support technique prioritaire',
  'Licence commerciale incluse',
  'Documentation complète',
  'Communauté exclusive',
];

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-900 dark:via-slate-800 dark:to-primary-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/30 to-secondary-200/30 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-200/20 to-primary-300/20 dark:from-secondary-500/15 dark:to-primary-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
          >
            <Gift className="w-4 h-4 mr-2" />
            Offre de Lancement - 50% de Réduction
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Prêt à{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Transformer
            </span>
            <br />
            Vos Projets ?
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Rejoignez des milliers de développeurs qui font confiance à SaboWaryan 
            pour créer des interfaces exceptionnelles
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              >
                Commencer Maintenant
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300"
              >
                Voir la Démo
              </Button>
            </motion.div>
          </div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-slate-700">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full mb-4">
                <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Restez Informé
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                Recevez nos derniers composants et offres exclusives
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 dark:border-slate-600 focus:border-primary-500 dark:focus:border-primary-400"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-4 text-lg font-semibold rounded-full transition-all duration-300"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      S'abonner Gratuitement
                      <Sparkles className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Merci pour votre inscription !
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Vous recevrez bientôt nos dernières nouveautés
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <Users className="w-5 h-5 text-primary-600" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Rejoint par plus de 10,000+ développeurs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialProof.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Paiement Sécurisé</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Garantie 30 jours</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">10k+ Utilisateurs</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;