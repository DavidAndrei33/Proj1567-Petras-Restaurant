import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, ArrowLeft, UserPlus, Loader2 } from 'lucide-react';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validări frontend detaliate
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('⚠️ Completează toate câmpurile obligatorii');
      return;
    }
    
    if (form.name.trim().length < 2) {
      setError('⚠️ Numele trebuie să aibă minim 2 caractere');
      return;
    }
    
    if (form.email.trim().length < 5 || !form.email.includes('@')) {
      setError('⚠️ Adresa de email nu este validă');
      return;
    }
    
    if (form.phone.trim().length < 10) {
      setError('⚠️ Numărul de telefon trebuie să aibă minim 10 cifre');
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError('⚠️ Parolele nu coincid. Verifică și încearcă din nou.');
      return;
    }
    
    if (form.password.length < 8) {
      setError('⚠️ Parola trebuie să aibă minim 8 caractere (litere, cifre, simboluri)');
      return;
    }
    
    setLoading(true);
    const result = await register(form.name, form.email, form.phone, form.password);
    setLoading(false);
    
    if (result.success) {
      navigate('/cont');
    } else {
      // Traducere mesaje de eroare din backend în română
      let msg = result.error;
      
      // Erori specifice de la backend
      if (msg === 'Email already registered' || msg?.includes('already registered')) {
        msg = '📧 Acest email este deja înregistrat. Încearcă să te loghezi sau folosește alt email.';
      } else if (msg === 'Invalid email address' || msg?.includes('Invalid email')) {
        msg = '📧 Adresa de email nu este validă. Verifică formatul.';
      } else if (msg?.includes('Password must be at least') || msg?.includes('minim 8')) {
        msg = '🔒 Parola trebuie să aibă minim 8 caractere.';
      } else if (msg?.includes('Name must be at least') || msg?.includes('minim 2 caractere')) {
        msg = '👤 Numele trebuie să aibă minim 2 caractere.';
      } else if (msg === 'Validation failed' || msg?.includes('validation')) {
        msg = '⚠️ Datele introduse nu sunt valide. Verifică toate câmpurile.';
      } else if (msg?.includes('network') || msg?.includes('Network Error')) {
        msg = '🌐 Eroare de conexiune. Verifică internetul și încearcă din nou.';
      } else if (msg?.includes('server') || msg?.includes('500')) {
        msg = '🔧 Eroare server. Încearcă din nou peste câteva momente.';
      } else if (!msg || msg === 'Eroare la înregistrare') {
        msg = '❌ A apărut o eroare la înregistrare. Încearcă din nou.';
      }
      
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-wine hover:text-wine-dark mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la meniu</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-wine mb-2">Creează cont</h1>
            <p className="text-dark/60">Comandă mai rapid și urmărește comenzile</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Nume complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Andrei Popescu"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-wine/10 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="exemplu@email.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-wine/10 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="0722 123 456"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-wine/10 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Parolă</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="password" name="password" value={form.password} onChange={handleChange}
                  placeholder="Minim 6 caractere"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-wine/10 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Confirmă parola</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-wine/10 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-wine text-white py-4 rounded-xl font-semibold hover:bg-wine-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Se procesează...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Creează cont
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark/60 text-sm">
              Ai deja cont?{' '}
              <Link to="/login" className="text-wine font-semibold hover:underline">
                Intră în cont
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;