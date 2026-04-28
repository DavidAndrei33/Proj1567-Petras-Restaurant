import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Clock, Star, Truck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Honey gradient orbs */}
        <div 
          className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 60%)',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute bottom-10 right-[5%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 60%)',
            filter: 'blur(50px)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)'
          }}
        />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8"
            >
              <Flame size={14} className="text-[#fbbf24]" />
              <span className="text-[#fbbf24] text-xs font-medium tracking-widest uppercase">#1 în Moinești</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-cinzel font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-8 tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="block">PIZZA</span>
              <span className="block gradient-honey-text">ARTIZANALĂ</span>
              <span className="block" style={{ color: 'var(--text-secondary)' }}>& PUI ROTISAT</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Comandă online preparatele noastre delicioase, pregătite cu pasiune 
              din ingrediente proaspete. Livrare rapidă direct la ușa ta în Moinești.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/meniu"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#f97316] font-semibold rounded-xl shadow-[0_10px_40px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.4)] transition-all duration-300"
                style={{ color: 'var(--text-inverse)' }}
              >
                Vezi meniul
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/meniu"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm font-medium rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                style={{ color: 'var(--text-primary)' }}
              >
                Comandă acum
              </Link>
            </motion.div>

            {/* Stats - Cinematic */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                  <Star size={20} className="text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>4.9</p>
                  <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                  <Clock size={20} className="text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>25 min</p>
                  <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Livrare</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                  <Truck size={20} className="text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Gratuit</p>
                  <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Livrare</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div 
                className="absolute -inset-8 rounded-[3rem] opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(249,115,22,0.1) 50%, rgba(234,179,8,0.15) 100%)',
                  filter: 'blur(40px)'
                }}
              />
              
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&h=700&fit=crop"
                alt="Pizza delicioasă"
                className="relative rounded-[2rem] shadow-2xl w-full max-w-lg mx-auto border border-white/10"
                loading="eager"
                decoding="async"
              />

              {/* Floating badge - Proaspät */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -right-6 top-12 glass-cinematic rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/30 flex items-center justify-center">
                    <Flame size={24} className="text-[#fbbf24]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Proaspăt gătit</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>La comandă</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge - Reducere */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -left-6 bottom-24 glass-cinematic rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/30 flex items-center justify-center">
                    <span className="text-[#fbbf24] font-bold text-xl">%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>-20% reducere</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>La prima comandă</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
