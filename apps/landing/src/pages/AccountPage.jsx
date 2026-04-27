import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, MapPin, Phone, Mail, Package, Clock, CheckCircle, Truck, ChevronRight, Loader2 } from 'lucide-react';
import client from '../api/client';

const statusConfig = {
  RECEIVED: { label: 'Nouă', color: 'bg-red-100 text-red-700', icon: Package },
  PREPARING: { label: 'În preparare', color: 'bg-amber-100 text-amber-700', icon: Clock },
  READY: { label: 'Gata', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  OUT_FOR_DELIVERY: { label: 'În livrare', color: 'bg-purple-100 text-purple-700', icon: Truck },
  DELIVERED: { label: 'Livrată', color: 'bg-gray-100 text-gray-700', icon: CheckCircle },
};

function AccountPage() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await client.get('/orders/me');
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Nu am putut încărca comenzile.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-wine mb-4">Intră în cont</h1>
          <p className="text-dark/60 mb-6">Trebuie să fii autentificat pentru a vedea contul</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="bg-wine text-white px-6 py-3 rounded-xl font-semibold hover:bg-wine-dark transition-colors">
              Login
            </Link>
            <Link to="/inregistrare" className="border-2 border-wine text-wine px-6 py-3 rounded-xl font-semibold hover:bg-wine hover:text-white transition-colors">
              Creează cont
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-wine" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-wine">{user?.name}</h1>
                <div className="flex items-center gap-4 mt-1 text-dark/60 text-sm flex-wrap">
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {user?.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {user?.phone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Ieșire</span>
            </button>
          </div>

          <div className="border-t border-wine/10 pt-6">
            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-wine" />
              Adresele mele
            </h2>
            <div className="bg-cream rounded-xl p-4">
              <p className="text-dark/60 text-sm">Str. Principală 10, Moinești, 605400</p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-xl font-serif font-bold text-wine mb-6">Comenzile mele</h2>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-wine animate-spin" />
              <span className="ml-3 text-dark/50">Se încarcă comenzile...</span>
            </div>
          )}

          {error && !loading && (
            <p className="text-red-500 text-center py-8">{error}</p>
          )}

          {!loading && !error && orders.length === 0 && (
            <p className="text-dark/50 text-center py-8">Nu ai plasat nicio comandă încă.</p>
          )}

          <div className="space-y-4">
            {!loading && orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.RECEIVED;
              const StatusIcon = status.icon;
              const itemNames = order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ') || '';
              return (
                <Link
                  key={order.id}
                  to={`/comanda/${order.id}`}
                  className="block bg-cream rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-wine">#{order.id}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-dark/30" />
                  </div>
                  <p className="text-dark/60 text-sm mb-2">{itemNames}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark/40">{formatDate(order.createdAt)}</span>
                    <span className="text-lg font-bold text-wine">{order.total} lei</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;