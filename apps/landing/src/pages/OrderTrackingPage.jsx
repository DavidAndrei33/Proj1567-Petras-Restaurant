import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle, Clock, ChefHat, Truck, MapPin, Phone, Loader2 } from 'lucide-react';
import client from '../api/client';

const steps = [
  { id: 'RECEIVED', label: 'Comandă plasată', icon: Package },
  { id: 'PREPARING', label: 'În preparare', icon: ChefHat },
  { id: 'READY', label: 'Gata de livrare', icon: CheckCircle },
  { id: 'OUT_FOR_DELIVERY', label: 'În livrare', icon: Truck },
  { id: 'DELIVERED', label: 'Livrată', icon: MapPin },
];

const statusLabels = {
  RECEIVED: 'Nouă',
  ACCEPTED: 'Acceptată',
  PREPARING: 'În preparare',
  READY: 'Gata de livrare',
  OUT_FOR_DELIVERY: 'În livrare',
  DELIVERED: 'Livrată',
};

const statusColors = {
  RECEIVED: 'bg-red-500/20 text-red-400',
  ACCEPTED: 'bg-[#06b6d4]/20 text-[#06b6d4]',
  PREPARING: 'bg-[#f59e0b]/20 text-[#fbbf24]',
  READY: 'bg-green-500/20 text-green-400',
  OUT_FOR_DELIVERY: 'bg-[#8b5cf6]/20 text-[#a78bfa]',
  DELIVERED: 'bg-white/10 text-white/60',
};

function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        // Use authenticated endpoint instead of public track endpoint
        const res = await client.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        setError('Nu am putut încărca detaliile comenzii.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const currentStepIndex = order ? steps.findIndex((s) => s.id === order.status) : -1;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0e] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#f59e0b] animate-spin" />
        <span className="ml-3 text-white/50">Se încarcă...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#0a0a0e] py-8 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-red-400 text-lg mb-4">{error || 'Comanda nu a fost găsită.'}</p>
          <Link to="/cont" className="text-[#fbbf24] hover:underline">Înapoi la comenzi</Link>
        </div>
      </div>
    );
  }

  const itemNames = order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ') || '';

  return (
    <div className="min-h-screen bg-[#0a0a0e] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/cont" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la comenzi</span>
        </Link>

        {/* Order Header */}
        <div className="bg-[#12121a] rounded-3xl border border-white/[0.06] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-cinzel font-bold text-[#fbbf24]">Comanda #{order.id}</h1>
              <p className="text-white/60 text-sm mt-1">Plasată pe {formatDate(order.createdAt)}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 ${statusColors[order.status] || statusColors.RECEIVED}`}>
              <Clock className="w-4 h-4" />
              {statusLabels[order.status] || 'Nouă'}
            </div>
          </div>
          {order.estimatedDelivery && (
            <div className="bg-[#0a0a0e] rounded-xl p-4 border border-white/[0.06]">
              <p className="text-sm text-white/60">Livrare estimată: <span className="font-semibold text-white">{order.estimatedDelivery}</span></p>
            </div>
          )}
        </div>

        {/* Tracking Timeline */}
        <div className="bg-[#12121a] rounded-3xl border border-white/[0.06] p-6 mb-6">
          <h2 className="text-lg font-cinzel font-semibold text-white mb-6">Status comandă</h2>
          <div className="relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex gap-4 relative">
                  {/* Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-white/10">
                      <div
                        className="w-full bg-[#f59e0b] transition-all duration-500"
                        style={{ height: isCompleted ? '100%' : '0%' }}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    isCompleted ? 'bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-[#020204]' : 'bg-white/10 text-white/40'
                  } ${isCurrent ? 'ring-4 ring-[#f59e0b]/20' : ''}`}>
                    <StepIcon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <p className={`font-semibold ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-[#fbbf24] font-medium mt-1">În desfășurare...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-[#12121a] rounded-3xl border border-white/[0.06] p-6 mb-6">
          <h2 className="text-lg font-cinzel font-semibold text-white mb-4">Detalii comandă</h2>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0">
                <span className="text-white">{item.quantity}x {item.name}</span>
                <span className="font-semibold text-white">{item.price * item.quantity} lei</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{order.total} lei</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#fbbf24] pt-2">
                <span>Total</span>
                <span>{order.total} lei</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-[#12121a] rounded-3xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-cinzel font-semibold text-white mb-4">Livrare</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white">
              <MapPin className="w-5 h-5 text-[#f59e0b]" />
              <span>{order.customerAddress || 'Nespecificată'}</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Phone className="w-5 h-5 text-[#f59e0b]" />
              <span>{order.customerPhone || 'Nespecificat'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingPage;
