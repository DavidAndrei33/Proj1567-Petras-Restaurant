import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Flame, MapPin, Phone, LogIn, User, UserPlus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close auth menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.auth-menu-container')) {
        setAuthMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Acasă' },
    { path: '/meniu', label: 'Meniu' },
    { path: '/cos', label: 'Coș' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top bar */}
      <div className="bg-dark text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin size={13} className="text-primary" />
              Str. Tudor Vladimirescu 10, Moinești
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Phone size={13} className="text-primary" />
              <a href="tel:+40754292740" className="hover:text-primary transition-colors">+40 754 292 740</a>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80">
            <Flame size={13} className="text-primary" />
            <span>Deschis acum · Livrare rapidă</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <motion.header
        className={`fixed top-0 md:top-8 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-lg py-2'
            : 'bg-transparent py-4'
        } md:top-8 top-0`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Flame size={20} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-playfair font-bold text-lg leading-tight text-dark">
                  Rotiserie <span className="text-primary">&</span> Pizza
                </h1>
                <p className="text-[10px] text-dark/60 font-medium tracking-widest uppercase">Moinești</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-dark/70 hover:text-dark hover:bg-dark/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Auth icon button */}
              <div className="auth-menu-container relative">
                <motion.button
                  onClick={() => setAuthMenuOpen(!authMenuOpen)}
                  className={`relative p-2.5 rounded-xl transition-colors ${
                    isLoggedIn
                      ? 'bg-wine/10 text-wine hover:bg-wine/20'
                      : 'bg-dark/5 text-dark hover:bg-dark/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isLoggedIn ? user?.name : 'Cont'}
                >
                  {isLoggedIn ? <User size={20} /> : <LogIn size={20} />}
                </motion.button>

                {/* Auth dropdown */}
                <AnimatePresence>
                  {authMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-dark/10 py-2 z-50"
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="px-4 py-2 border-b border-dark/5">
                            <p className="text-sm font-semibold text-dark truncate">{user?.name}</p>
                            <p className="text-xs text-dark/50 truncate">{user?.email}</p>
                          </div>
                          <Link
                            to="/cont"
                            onClick={() => setAuthMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark/70 hover:text-wine hover:bg-wine/5 transition-colors"
                          >
                            <User size={16} />
                            Contul meu
                          </Link>
                          <button
                            onClick={() => { logout(); setAuthMenuOpen(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-dark/70 hover:text-red-500 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogIn size={16} />
                            Ieșire
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setAuthMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark/70 hover:text-wine hover:bg-wine/5 transition-colors"
                          >
                            <LogIn size={16} />
                            Intră în cont
                          </Link>
                          <Link
                            to="/inregistrare"
                            onClick={() => setAuthMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark/70 hover:text-wine hover:bg-wine/5 transition-colors"
                          >
                            <UserPlus size={16} />
                            Creează cont
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart button */}
              <motion.button
                onClick={() => {
                  if (location.pathname !== '/meniu') {
                    navigate('/meniu');
                  }
                  setIsOpen(true);
                }}
                className="relative p-2.5 rounded-xl bg-dark/5 hover:bg-dark/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} className="text-dark" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-dark/5 hover:bg-dark/10 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden glass shadow-xl"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-dark/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-dark/10 mt-2 pt-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/cont"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-wine"
                    >
                      <User size={16} />
                      Contul meu
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-500 text-left"
                    >
                      <LogIn size={16} />
                      Ieșire
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-dark/70"
                    >
                      <LogIn size={16} />
                      Intră în cont
                    </Link>
                    <Link
                      to="/inregistrare"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-wine"
                    >
                      <UserPlus size={16} />
                      Creează cont
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
