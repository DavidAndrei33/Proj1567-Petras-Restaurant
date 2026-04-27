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
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Clock,
      title: 'Livrare rapidă',
      description: 'Primești comanda în maxim 35 de minute. Rapid și proaspăt!',
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      icon: ShieldCheck,
      title: 'Calitate garantată',
      description: 'Folosim doar ingrediente proaspete și de cea mai bună calitate.',
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      icon: ChefHat,
      title: 'Bucătari experimentați',
      description: 'Echipa noastră de bucătari cu experiență pregătește fiecare fel cu pasiune.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div>
      <HeroSection />
      <MenuPreview />

      {/* Features section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-dark mb-4">
              De ce să ne <span className="text-gradient">alegi?</span>
            </h2>
            <p className="text-dark/50 max-w-xl mx-auto">
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
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="font-playfair font-semibold text-lg text-dark mb-2">{feature.title}</h3>
                <p className="text-dark/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair font-bold text-3xl sm:text-5xl text-white mb-6">
              Comandă acum și bucură-te de <span className="text-accent">gustul autentic</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Pizza proaspătă din cuptor, pui rotisat aromat și garnituri delicioase te așteaptă. 
              Plasează comanda acum și te vom răsplăti cu o reducere de 20%!
            </p>
            <a
              href="/meniu"
              className="inline-flex items-center gap-2 px-10 py-4 gradient-primary text-white font-semibold rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 text-lg"
            >
              Comandă acum
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
