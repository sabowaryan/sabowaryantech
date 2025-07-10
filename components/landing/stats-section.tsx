'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, Users, Award, Download } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<any>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const stats: StatItem[] = [
  {
    icon: Download,
    value: 500,
    suffix: '+',
    label: 'Composants',
    description: 'Composants premium disponibles',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Téléchargements',
    description: 'Téléchargements par nos utilisateurs',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Award,
    value: 95,
    suffix: '%',
    label: 'Satisfaction',
    description: 'Taux de satisfaction client',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: TrendingUp,
    value: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Support technique disponible',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  suffix, 
  duration = 2 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return unsubscribe;
  }, [springValue]);

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(displayValue)}{suffix}
    </span>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-500/15 to-primary-600/15 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} 
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Nos Performances
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Des Chiffres qui{' '}
            <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
              Parlent d'Eux-Mêmes
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'impact de SaboWaryan sur la communauté des développeurs 
            et la confiance que nous accordent nos utilisateurs
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="relative w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                  
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-30 rounded-xl blur-xl transition-opacity duration-300`} />
                </motion.div>

                {/* Stats Content */}
                <div className="relative">
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                    />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
                    {stat.label}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-medium">
                Mise à jour en temps réel
              </span>
            </div>
            
            <div className="hidden md:block w-px h-8 bg-white/20" />
            
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-primary-300" />
              <span className="text-white font-medium">
                Certifié Premium
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;