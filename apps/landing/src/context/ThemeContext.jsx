import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Citim tema salvată din localStorage sau default 'cinematic'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'cinematic';
    }
    return 'cinematic';
  });

  // Salvăm tema când se schimbă
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Adăugăm class pe body pentru CSS global
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Inițializare la mount
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'cinematic' ? 'light' : 'cinematic');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isCinematic: theme === 'cinematic' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default ThemeContext;
