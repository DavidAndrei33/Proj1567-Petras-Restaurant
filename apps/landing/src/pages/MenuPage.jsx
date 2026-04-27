import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { useDebounce } from '../hooks/useDebounce';
import client from '../api/client';

const localCategories = [
  { id: 'all', name: 'Toate', icon: 'UtensilsCrossed' },
  { id: 'pizza', name: 'Pizza', icon: 'Pizza' },
  { id: 'pui-rotisat', name: 'Pui Rotisat', icon: 'Drumstick' },
  { id: 'garnituri', name: 'Garnituri', icon: 'Leaf' },
  { id: 'bauturi', name: 'Băuturi', icon: 'CupSoda' },
  { id: 'desert', name: 'Desert', icon: 'Cake' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(localCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch settings first to get the limit
        const settingsRes = await client.get('/settings/menuProductLimit').catch(() => ({ data: '50' }));
        const productLimit = Number(settingsRes.data) || 50;
        
        const [productsRes, categoriesRes] = await Promise.all([
          client.get(`/products?limit=${productLimit}`),
          client.get('/categories'),
        ]);
        // API returns { products: [...], categories: [...] } after interceptor unwrap
        const productList = Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data?.products || []);
        const categoryList = Array.isArray(productsRes.data?.categories) ? productsRes.data.categories : (Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
        setProducts(productList);
        if (categoryList.length > 0) {
          setCategories([
            { id: 'all', name: 'Toate', icon: 'UtensilsCrossed' },
            ...categoryList.map((c) => ({ id: c.slug || c.id, name: c.name, icon: c.icon || 'UtensilsCrossed' })),
          ]);
        }
      } catch (err) {
        setError('Nu am putut încărca produsele. Încearcă din nou.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category?.slug === activeCategory || p.categorySlug === activeCategory || p.categoryId === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name?.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, debouncedSearch, sortBy, products]);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-dark mb-2">
            Meniul nostru
          </h1>
          <p className="text-dark/50">Descoperă preparatele noastre delicioase și comandă acum</p>
        </motion.div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
            <input
              type="text"
              placeholder="Caută preparate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-dark/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
            />
          </div>
          <div className="relative shrink-0">
            <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-11 pr-8 py-3 rounded-xl bg-white border border-dark/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="default">Sortare implicită</option>
              <option value="price-asc">Preț: crescător</option>
              <option value="price-desc">Preț: descrescător</option>
              <option value="name">Nume: A-Z</option>
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-dark/50">Se încarcă produsele...</span>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary font-medium hover:underline"
            >
              Reîncearcă
            </button>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        ) : !loading && !error && (
          <div className="text-center py-20">
            <p className="text-dark/40 text-lg">Nu am găsit produse care să corespundă căutării tale.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Resetează filtrele
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
