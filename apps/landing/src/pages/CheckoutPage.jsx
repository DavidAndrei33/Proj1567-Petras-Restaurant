import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, MapPin, User, Phone, Mail, Lock, LogIn, Loader2, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: 'Moinești',
    notes: '',
    paymentMethod: 'cash',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city}`,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
      };

      await client.post('/orders', orderData);
      clearCart();
      navigate('/comanda-confirmata');
    } catch (err) {
      setSubmitError(err.response?.data?.error || err.response?.data?.message || 'Eroare la plasarea comenzii. Încearcă din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0e] pt-32 pb-20 flex items-center justify-center">
        {/* Background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 60%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4 relative z-10">
          <div className="w-20 h-20 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center mx-auto mb-6">
            <LogIn size={32} className="text-[#fbbf24]" />
          </div>
          <h1 className="font-cinzel font-bold text-2xl text-white mb-3 tracking-wide">Intră în cont</h1>
          <p className="text-white/50 mb-6">Pentru a plasa o comandă, trebuie să fii autentificat.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-[#020204] font-semibold rounded-xl shadow-[0_8px_30px_rgba(245,158,11,0.3)]">
              Intră în cont
            </Link>
            <Link
              to="/inregistrare"
              className="px-8 py-3 border-2 border-[#f59e0b] text-[#fbbf24] font-semibold rounded-xl hover:bg-[#f59e0b]/10 transition-colors">
              Creează cont
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/meniu');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0e] pt-32 pb-20 relative">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/cos')}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#fbbf24] text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Înapoi la coș
          </button>
          <h1 className="font-cinzel font-bold text-3xl text-white mb-2 tracking-wide">Finalizare comandă</h1>
          <p className="text-white/50 mb-8">Completează datele pentru a finaliza comanda</p>
        </motion.div>

        {submitError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {submitError}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="font-cinzel font-semibold text-lg text-[#fbbf24] mb-5 flex items-center gap-2">
                  <User size={18} className="text-[#f59e0b]" />
                  Date de contact
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Nume complet *</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ion Popescu"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#f59e0b]/50 focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Telefon *</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="07xx xxx xxx"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#f59e0b]/50 focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ion@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#f59e0b]/50 focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Delivery info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="font-cinzel font-semibold text-lg text-[#fbbf24] mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-[#f59e0b]" />
                  Adresă de livrare
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Adresă completă *</label>
                    <input
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Strada, număr, bloc, apartament..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#f59e0b]/50 focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Oraș</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#f59e0b]/50 focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Observații (opțional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Instrucțiuni pentru livrare, etaj, interfon..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#f59e0b]/50 focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition-all text-sm resize-none"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="font-cinzel font-semibold text-lg text-[#fbbf24] mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#f59e0b]" />
                  Metodă de plată
                </h2>
                <div className="space-y-3">
                  {/* Numerar la livrare */}
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cash' ? 'border-[#f59e0b] bg-[#f59e0b]/10' : 'border-white/10 hover:border-white/20'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                      <Banknote size={20} className="text-[#fbbf24]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">Numerar la livrare</p>
                      <p className="text-white/40 text-xs">Plătești când primești comanda</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.paymentMethod === 'cash' ? 'border-[#f59e0b]' : 'border-white/20'
                    }`}>
                      {formData.paymentMethod === 'cash' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      )}
                    </div>
                  </label>

                  {/* Card la livrare (POS) */}
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card_on_delivery' ? 'border-[#f59e0b] bg-[#f59e0b]/10' : 'border-white/10 hover:border-white/20'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card_on_delivery"
                      checked={formData.paymentMethod === 'card_on_delivery'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                      <CreditCard size={20} className="text-[#fbbf24]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">Card la livrare (POS)</p>
                      <p className="text-white/40 text-xs">Plătești cu cardul când primești comanda</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.paymentMethod === 'card_on_delivery' ? 'border-[#f59e0b]' : 'border-white/20'
                    }`}>
                      {formData.paymentMethod === 'card_on_delivery' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      )}
                    </div>
                  </label>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-[#020204] font-semibold rounded-xl shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Se procesează...
                  </>
                ) : (
                  <>Plasează comanda - {Math.round(totalPrice * 0.8)} lei</>
                )}
              </motion.button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-28"
            >
              <h2 className="font-cinzel font-semibold text-lg text-[#fbbf24] mb-5">Comanda ta</h2>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-white/40">{item.quantity} x {item.price} lei</p>
                    </div>
                    <span className="text-sm font-semibold text-[#fbbf24]">{item.quantity * item.price} lei</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-medium text-white">{totalPrice} lei</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Livrare</span>
                  <span className="text-green-400 font-medium">Gratuită</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Reducere prima comandă</span>
                  <span className="text-[#fbbf24] font-medium">-20%</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-cinzel font-bold text-xl text-[#fbbf24]">
                    {Math.round(totalPrice * 0.8)} lei
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
