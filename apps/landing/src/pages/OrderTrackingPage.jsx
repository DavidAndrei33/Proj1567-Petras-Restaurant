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
  RECEIVED: 'bg-red-100 text-red-700',
  ACCEPTED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-amber-100 text-amber-700',
  READY: 'bg-green-100 text-green-700',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-gray-100 text-gray-700',
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
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-wine animate-spin" />
        <span className="ml-3 text-dark/50">Se încarcă...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-red-500 text-lg mb-4">{error || 'Comanda nu a fost găsită.'}</p>
          <Link to="/cont" className="text-wine hover:underline">Înapoi la comenzi</Link>
        </div>
      </div>
    );
  }

  const itemNames = order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ') || '';

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/cont" className="inline-flex items-center gap-2 text-wine hover:text-wine-dark mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la comenzi</span>
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-wine">Comanda #{order.id}</h1>
              <p className="text-dark/60 text-sm mt-1">Plasată pe {formatDate(order.createdAt)}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 ${statusColors[order.status] || statusColors.RECEIVED}`}>
              <Clock className="w-4 h-4" />
              {statusLabels[order.status] || 'Nouă'}
            </div>
          </div>
          {order.estimatedDelivery && (
            <div className="bg-cream rounded-xl p-4">
              <p className="text-sm text-dark/60">Livrare estimată: <span className="font-semibold text-dark">{order.estimatedDelivery}</span></p>
            </div>
          )}
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-dark mb-6">Status comandă</h2>
          <div className="relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex gap-4 relative">
                  {/* Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200">
                      <div
                        className="w-full bg-wine transition-all duration-500"
                        style={{ height: isCompleted ? '100%' : '0%' }}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    isCompleted ? 'bg-wine text-white' : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-wine/20' : ''}`}>
                    <StepIcon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <p className={`font-semibold ${isCompleted ? 'text-dark' : 'text-dark/40'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-wine font-medium mt-1">În desfășurare...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Detalii comandă</h2>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-wine/5 last:border-0">
                <span className="text-dark">{item.quantity}x {item.name}</span>
                <span className="font-semibold text-dark">{item.price * item.quantity} lei</span>
              </div>
            ))}
            <div className="border-t border-wine/10 pt-3 mt-3 space-y-2">
              <div className="flex justify-between text-dark/60">
                <span>Subtotal</span>
                <span>{order.total} lei</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-wine pt-2">
                <span>Total</span>
                <span>{order.total} lei</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Livrare</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-dark">
              <MapPin className="w-5 h-5 text-wine" />
              <span>{order.customerAddress || 'Nespecificată'}</span>
            </div>
            <div className="flex items-center gap-3 text-dark">
              <Phone className="w-5 h-5 text-wine" />
              <span>{order.customerPhone || 'Nespecificat'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingPage;