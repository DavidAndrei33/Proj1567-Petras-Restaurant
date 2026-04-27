import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ArrowLeft, Loader2 } from 'lucide-react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Completează toate câmpurile');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/cont');
    } else {
      setError(result.error);
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
            <h1 className="text-3xl font-serif font-bold text-wine mb-2">Bun venit!</h1>
            <p className="text-dark/60">Intră în contul tău</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplu@email.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-wine/10 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Parolă</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Se autentifică...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Intră în cont
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark/60 text-sm">
              Nu ai cont?{' '}
              <Link to="/inregistrare" className="text-wine font-semibold hover:underline">
                Înregistrează-te
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
