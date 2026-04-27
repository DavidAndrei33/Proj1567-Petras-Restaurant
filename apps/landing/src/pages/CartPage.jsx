import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Memoized CartItem to prevent re-renders when other items change
const CartItem = memo(function CartItem({ item, index, updateQuantity, removeItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl p-4 flex gap-4 card-shadow"
    >
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="w-24 h-24 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-playfair font-semibold text-dark truncate">{item.name}</h3>
          <button
            onClick={() => removeItem(item.id)}
            className="shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <p className="text-dark/40 text-xs mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-playfair font-bold text-lg text-primary">{item.price} lei</span>
          <div className="flex items-center bg-light rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-9 h-9 flex items-center justify-center text-dark/50 hover:text-dark hover:bg-dark/5 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-dark">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-dark/50 hover:text-dark hover:bg-dark/5 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if item data actually changed
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.quantity === nextProps.item.quantity &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.index === nextProps.index
  );
});

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-light flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-dark/20" />
          </div>
          <h1 className="font-playfair font-bold text-2xl text-dark mb-2">Coșul tău este gol</h1>
          <p className="text-dark/50 mb-8">Adaugă produse delicioase din meniul nostru!</p>
          <Link
            to="/meniu"
            className="inline-flex items-center gap-2 px-8 py-3 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30"
          >
            <ArrowLeft size={18} />
            Înapoi la meniu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-playfair font-bold text-3xl text-dark mb-2">Coșul tău</h1>
          <p className="text-dark/50 mb-8">{totalItems} {totalItems === 1 ? 'produs' : 'produse'} în coș</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}

            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
            >
              Golește coșul
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 card-shadow sticky top-28"
            >
              <h2 className="font-playfair font-semibold text-lg text-dark mb-6">Rezumat comandă</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark/60">Subtotal</span>
                  <span className="font-medium text-dark">{totalPrice} lei</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark/60">Livrare</span>
                  <span className="text-secondary font-medium">Gratuită</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark/60">Reducere prima comandă</span>
                  <span className="text-primary font-medium">-20%</span>
                </div>
                <div className="border-t border-light pt-3 flex items-center justify-between">
                  <span className="font-semibold text-dark">Total</span>
                  <span className="font-playfair font-bold text-2xl text-primary">
                    {Math.round(totalPrice * 0.8)} lei
                  </span>
                </div>
              </div>

              {isLoggedIn ? (
                <motion.button
                  onClick={() => navigate('/checkout')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow flex items-center justify-center gap-2"
                >
                  Continuă la plată
                  <ArrowRight size={18} />
                </motion.button>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="w-full py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow flex items-center justify-center gap-2"
                  >
                    <LogIn size={18} />
                    Intră în cont pentru a comanda
                  </Link>
                  <p className="text-center text-dark/50 text-sm">
                    Nu ai cont?{' '}
                    <Link to="/inregistrare" className="text-wine font-medium hover:underline">
                      Înregistrează-te
                    </Link>
                  </p>
                </div>
              )}

              <Link
                to="/meniu"
                className="block text-center mt-4 text-dark/50 hover:text-dark text-sm transition-colors"
              >
                Continuă cumpărăturile
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
