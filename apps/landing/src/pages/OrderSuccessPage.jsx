import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-secondary" />
        </motion.div>

        <h1 className="font-playfair font-bold text-3xl text-dark mb-3">
          Comanda a fost plasată!
        </h1>
        <p className="text-dark/50 mb-8 leading-relaxed">
          Îți mulțumim pentru comandă! Vei primi un SMS cu confirmarea și detaliile livrării în curând. 
          Timp estimat de livrare: <span className="text-dark font-medium">25-35 minute</span>.
        </p>

        <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-dark/60">Număr comandă</span>
              <span className="font-mono font-semibold text-dark">#ORD-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark/60">Status</span>
              <span className="text-secondary font-medium">Confirmată</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark/60">Estimare livrare</span>
              <span className="text-dark font-medium">25-35 min</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-light text-dark font-semibold rounded-xl hover:bg-dark/5 transition-colors"
          >
            <Home size={18} />
            Acasă
          </Link>
          <Link
            to="/meniu"
            className="flex items-center justify-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            <ShoppingBag size={18} />
            Comandă din nou
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
