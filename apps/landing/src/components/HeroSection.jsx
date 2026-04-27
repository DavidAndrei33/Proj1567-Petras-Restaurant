import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Clock, Star, Truck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Optimized gradient backgrounds (no blur) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - single motion wrapper with CSS stagger for children */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-stagger-item inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Flame size={14} className="text-primary" />
              <span className="text-white/80 text-xs font-medium tracking-wide">#1 în Moinești</span>
            </div>

            <h1 className="hero-stagger-item font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
              Pizza <span className="text-gradient">Artizanală</span>
              <br />
              <span className="text-accent">& Pui Rotisat</span>
              <br />
              <span className="text-white/90">Proaspăt</span>
            </h1>

            <p className="hero-stagger-item text-white/60 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              Comandă online preparatele noastre delicioase, pregătite cu pasiune 
              din ingrediente proaspete. Livrare rapidă direct la ușa ta în Moinești.
            </p>

            <div className="hero-stagger-item flex flex-wrap gap-4 mb-10">
              <Link
                to="/meniu"
                className="group inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              >
                Vezi meniul
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/meniu"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                Comandă acum
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stagger-item flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Star size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">4.9</p>
                  <p className="text-white/40 text-xs">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Clock size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">25 min</p>
                  <p className="text-white/40 text-xs">Livrare</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Truck size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Gratuit</p>
                  <p className="text-white/40 text-xs">Livrare</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right image - single motion wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div 
                className="absolute -inset-4 rounded-[3rem]"
                style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(245,158,11,0.1) 50%, rgba(42,157,143,0.15) 100%)'
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&h=700&fit=crop"
                alt="Pizza delicioasă"
                className="relative rounded-[2.5rem] shadow-2xl w-full max-w-lg mx-auto animate-float"
                loading="eager"
                decoding="async"
              />

              {/* Floating badge - CSS animation instead of motion */}
              <div className="hero-badge-right absolute -right-4 top-10 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Flame size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">Proaspăt gătit</p>
                    <p className="text-dark/50 text-xs">La comandă</p>
                  </div>
                </div>
              </div>

              {/* Price badge - CSS animation instead of motion */}
              <div className="hero-badge-left absolute -left-4 bottom-20 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <span className="text-secondary font-bold text-lg">%</span>
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">-20% reducere</p>
                    <p className="text-dark/50 text-xs">La prima comandă</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
