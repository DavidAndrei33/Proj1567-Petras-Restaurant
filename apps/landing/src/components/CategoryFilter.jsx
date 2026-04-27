import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Pizza, Drumstick, Leaf, CupSoda, Cake } from 'lucide-react';

const iconMap = {
  UtensilsCrossed,
  Pizza,
  Drumstick,
  Leaf,
  CupSoda,
  Cake,
};

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar category-scroll pb-2">
        {categories.map((cat, index) => {
          const Icon = iconMap[cat.icon] || UtensilsCrossed;
          const isActive = activeCategory === cat.id;
          
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0 ${
                isActive
                  ? 'gradient-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-dark/70 hover:bg-dark/5 border border-dark/10'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={16} />
              {cat.name}
            </motion.button>
          );
        })}
      </div>
      {/* Fade edges */}
      <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-cream to-transparent pointer-events-none" />
    </div>
  );
}
