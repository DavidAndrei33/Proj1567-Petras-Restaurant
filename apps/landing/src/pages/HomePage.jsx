import React from 'react';
import HeroSection from '../components/HeroSection';
import MenuPreview from '../components/MenuPreview';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, ChefHat } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Truck,
      title: 'Livrare gratuită',
      description: 'Livrare gratuită în toată zona Moineștiului pentru comenzi peste 50 lei.',
      color: 'text-[#fbbf24]',
      bg: 'bg-[#f59e0b]/10 border-[#f59e0b]/20',
    },
    {
      icon: Clock,
      title: 'Livrare rapidă',
      description: 'Primești comanda în maxim 35 de minute. Rapid și proaspăt!',
      color: 'text-[#06b6d4]',
      bg: 'bg-[#06b6d4]/10 border-[#06b6d4]/20',
    },
    {
      icon: ShieldCheck,
      title: 'Calitate garantată',
      description: 'Folosim doar ingrediente proaspete și de cea mai bună calitate.',
      color: 'text-[#10b981]',
      bg: 'bg-[#10b981]/10 border-[#10b981]/20',
    },
    {
      icon: ChefHat,
      title: 'Bucătari experimentați',
      description: 'Echipa noastră de bucătari cu experiență pregătește fiecare fel cu pasiune.',
      color: 'text-[#f97316]',
      bg: 'bg-[#f97316]/10 border-[#f97316]/20',
    },
  ];

  return (
    <div className="bg-[#0a0a0e]">
      <HeroSection />
      <MenuPreview />

      {/* Features section */}
      <section className="py-20 bg-[#0a0a0e] relative">
        {/* Background glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl text-white mb-4 tracking-wide">
              De ce să ne <span className="gradient-honey-text">alegi?</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Suntem dedicați să oferim cea mai bună experiență culinară din Moinești
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 border`}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="font-cinzel font-semibold text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-[#0a0a0e] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f97316]/10 rounded-full blur-[150px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-cinzel font-bold text-3xl sm:text-5xl text-white mb-6 tracking-wide">
              Comandă acum și bucură-te de <span className="text-[#fbbf24]">gustul autentic</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Pizza proaspătă din cuptor, pui rotisat aromat și garnituri delicioase te așteaptă. 
              Plasează comanda acum și te vom răsplăti cu o reducere de 20%!
            </p>
            <a
              href="/meniu"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-[#020204] font-semibold rounded-xl shadow-[0_10px_40px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.4)] transition-all duration-300 text-lg"
            >
              Comandă acum
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
