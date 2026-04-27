import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <ShoppingBag size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-playfair font-semibold text-lg text-dark">Coșul tău</h2>
                  <p className="text-dark/50 text-xs">{totalItems} {totalItems === 1 ? 'produs' : 'produse'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="min-w-[44px] min-h-[44px] w-12 h-12 rounded-xl bg-light hover:bg-dark/5 flex items-center justify-center transition-colors"
                aria-label="Închide coșul"
              >
                <X size={20} className="text-dark/60" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-light flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-dark/20" />
                  </div>
                  <h3 className="font-playfair font-semibold text-lg text-dark/60 mb-2">Coșul este gol</h3>
                  <p className="text-dark/40 text-sm mb-6">Adaugă produse delicioase din meniul nostru!</p>
                  <Link
                    to="/meniu"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 gradient-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                  >
                    Vezi meniul
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 bg-light rounded-xl p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-20 h-20 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-dark truncate">{item.name}</h4>
                          <p className="text-primary font-semibold text-sm mt-1">{item.price} lei</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-white rounded-lg overflow-hidden border border-dark/10">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-dark/50 hover:text-dark transition-colors"
                                aria-label="Scade cantitate"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-sm font-semibold text-dark">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-dark/50 hover:text-dark transition-colors"
                                aria-label="Adaugă cantitate"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg bg-white border border-red-100 text-red-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                              aria-label="Șterge produs"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-light p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark/60">Subtotal</span>
                    <span className="font-medium text-dark">{totalPrice} lei</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark/60">Livrare</span>
                    <span className="text-secondary font-medium">Gratuită</span>
                  </div>
                  <div className="border-t border-light pt-2 flex items-center justify-between">
                    <span className="font-semibold text-dark">Total</span>
                    <span className="font-playfair font-bold text-xl text-primary">{totalPrice} lei</span>
                  </div>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow flex items-center justify-center gap-2"
                >
                  Continuă comanda
                  <ArrowRight size={18} />
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-dark/40 text-xs hover:text-red-500 transition-colors"
                >
                  Golește coșul
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
