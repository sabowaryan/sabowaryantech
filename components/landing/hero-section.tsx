"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

// --- Typewriter Hook ---
function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    let stopped = false;
    function type() {
      if (stopped) return;
      setDisplayed(text.slice(0, i));
      if (i <= text.length) {
        i++;
        setTimeout(type, speed);
      }
    }
    type();
    return () => { stopped = true; };
  }, [text, speed]);
  return displayed;
}

// --- Particle Canvas (WebGL-like, lazy loaded) ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0 });

  useEffect(() => { setIsVisible(visible); }, [visible]);

  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    let particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      o: Math.random() * 0.5 + 0.2,
    }));
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100vw", height: "100vh", display: "block", willChange: "opacity, transform" }}
        aria-hidden="true"
      />
    </div>
  );
};

// --- Scroll Indicator ---
const ScrollIndicator: React.FC = () => (
  <motion.div
    aria-hidden
    initial={{ y: 0 }}
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20"
    style={{ willChange: "transform" }}
  >
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
      <motion.rect
        x="8" y="8" width="16" height="32" rx="8"
        stroke="#fff" strokeWidth="2" fill="none"
        animate={{
          rx: [8, 16, 8],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="16" cy="20" r="3" fill="#fff"
        animate={{ cy: [20, 28, 20] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </motion.div>
);

// --- Magnetic Button ---
const MagneticButton: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!isHover) {
      setPos({ x: 0, y: 0 });
      return;
    }
    const handle = (e: MouseEvent | TouchEvent) => {
      const btn = ref.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      let x = 0, y = 0;
      if (e instanceof MouseEvent) {
        x = e.clientX - (rect.left + rect.width / 2);
        y = e.clientY - (rect.top + rect.height / 2);
      } else if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX - (rect.left + rect.width / 2);
        y = e.touches[0].clientY - (rect.top + rect.height / 2);
      }
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handle);
    window.addEventListener("touchmove", handle);
    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("touchmove", handle);
    };
  }, [isHover]);

  return (
    <motion.button
      ref={ref}
      className={"relative px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300 " + (className || "")}
      style={{
        transform: `translate3d(${pos.x * 0.18}px, ${pos.y * 0.18}px, 0) scale(${isHover ? 1.04 : 1})`,
        willChange: "transform",
        contain: "layout style paint",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={() => setIsHover(true)}
      onTouchEnd={() => setIsHover(false)}
    >
      {children}
      <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: isHover ? "0 4px 32px 0 rgba(0,0,0,0.18)" : undefined, transition: "box-shadow 0.3s" }} />
    </motion.button>
  );
};

// --- Main Hero Section ---
const heroTitle = ["Des composants", "et templates", "pour le web moderne"];
const heroSubtitle = "Boostez vos projets avec des ressources professionnelles, prêtes à l'emploi.";

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const subtitle = useTypewriter(heroSubtitle, 24);

  useEffect(() => {
    if (isVisible) controls.start("visible");
  }, [isVisible, controls]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full grid place-items-center overflow-hidden"
      style={{
        background: "linear-gradient(120deg, var(--primary-600, #C51F5D) 0%, var(--secondary-600, #243447) 100%)",
        '--animate-gradient': 'gradient-move 8s ease-in-out infinite',
      } as React.CSSProperties}
      aria-label="Section d'introduction"
    >
      {/* Fond animé (dégradé + particules) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 animate-[gradient-move_8s_ease-in-out_infinite]"
        style={{
          background: "linear-gradient(120deg, var(--primary-600, #C51F5D) 0%, var(--secondary-600, #243447) 100%)",
          opacity: 0.95,
          willChange: "background-position, opacity",
        }}
      />
      <ParticleBackground />

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center select-none">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {heroTitle.map((line, i) => (
            <motion.h1
              key={i}
              className="text-4xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-light-200 to-primary-200"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
              }}
            >
              {line}
            </motion.h1>
          ))}
        </motion.div>
        <motion.p
          className="mt-6 text-lg md:text-2xl text-white/90 min-h-[2.5em]"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { delay: 0.7 } },
            hidden: { opacity: 0 },
          }}
          aria-live="polite"
        >
          {subtitle}
        </motion.p>
        <div className="mt-10">
          <MagneticButton>
            Explorer la collection
          </MagneticButton>
        </div>
      </div>
      <ScrollIndicator />
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;