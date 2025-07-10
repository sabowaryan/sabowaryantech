'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles, Zap, Code2, Palette } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  delay = 0, 
  duration = 3,
  className = '' 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ 
        y: [-10, 10, -10],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

interface BackgroundShapeProps {
  mouseX: any;
  mouseY: any;
  className?: string;
  parallaxStrength?: number;
}

const BackgroundShape: React.FC<BackgroundShapeProps> = ({ 
  mouseX, 
  mouseY, 
  className = '',
  parallaxStrength = 0.1 
}) => {
  const x = useTransform(mouseX, [0, 1], [-50 * parallaxStrength, 50 * parallaxStrength]);
  const y = useTransform(mouseY, [0, 1], [-50 * parallaxStrength, 50 * parallaxStrength]);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  );
};

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-dark-900 via-secondary-800 to-primary-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <BackgroundShape
          mouseX={mouseXSpring}
          mouseY={mouseYSpring}
          parallaxStrength={0.15}
          className="top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-3xl"
        />
        <BackgroundShape
          mouseX={mouseXSpring}
          mouseY={mouseYSpring}
          parallaxStrength={0.1}
          className="top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-primary-600/20 rounded-full blur-3xl"
        />
        <BackgroundShape
          mouseX={mouseXSpring}
          mouseY={mouseYSpring}
          parallaxStrength={0.2}
          className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl"
        />

        {/* Geometric Shapes */}
        <BackgroundShape
          mouseX={mouseXSpring}
          mouseY={mouseYSpring}
          parallaxStrength={0.3}
          className="top-20 right-20 w-4 h-4 bg-primary-400 rotate-45"
        />
        <BackgroundShape
          mouseX={mouseXSpring}
          mouseY={mouseYSpring}
          parallaxStrength={0.25}
          className="bottom-32 left-20 w-6 h-6 border-2 border-secondary-400 rounded-full"
        />
        <BackgroundShape
          mouseX={mouseXSpring}
          mouseY={mouseYSpring}
          parallaxStrength={0.2}
          className="top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 transform rotate-12"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <FloatingElement delay={0} className="absolute top-20 left-10 text-primary-400">
              <Code2 size={24} />
            </FloatingElement>
            <FloatingElement delay={1} className="absolute top-32 right-16 text-secondary-400">
              <Palette size={20} />
            </FloatingElement>
            <FloatingElement delay={2} className="absolute bottom-40 left-20 text-primary-300">
              <Zap size={28} />
            </FloatingElement>
            <FloatingElement delay={1.5} className="absolute bottom-32 right-12 text-secondary-300">
              <Sparkles size={22} />
            </FloatingElement>
          </div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-light-200 to-primary-200 bg-clip-text text-transparent">
                Sabo
              </span>
              <motion.span 
                className="bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                waryan
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-secondary-300 to-primary-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Tech
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl text-light-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Découvrez les{' '}
            <motion.span 
              className="text-primary-300 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              composants
            </motion.span>
            {' '}et{' '}
            <motion.span 
              className="text-secondary-300 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              templates web
            </motion.span>
            {' '}les plus innovants
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="
                  relative px-12 py-6 text-lg font-semibold
                  bg-gradient-to-r from-primary-600 to-primary-500
                  hover:from-primary-500 hover:to-primary-400
                  text-white border-0 rounded-full
                  shadow-2xl shadow-primary-500/25
                  transition-all duration-300
                  group overflow-hidden
                "
                onClick={() => window.location.href = '/shop'}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explorez la Collection
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                </span>
                
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats or Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          >
            {[
              { number: '100+', label: 'Composants' },
              { number: '50+', label: 'Templates' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-light-400 text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-light-400 hover:text-primary-300 transition-colors duration-300"
        >
          <span className="text-sm mb-2 font-medium">Découvrir</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* Mobile Optimizations */}
      <style jsx>{`
        @media (max-width: 640px) {
          .hero-title {
            font-size: 3rem;
            line-height: 1.1;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;