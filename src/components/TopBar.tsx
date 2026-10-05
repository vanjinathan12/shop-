import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, X, Check } from 'lucide-react';
import { CurrencyCode, Category } from '../types/shop';
import { CURRENCIES } from '../utils/currency';

export const TopBar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    currency,
    setCurrency,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks: { label: string; cat: Category }[] = [
    { label: 'Living', cat: 'Living' },
    { label: 'Lighting', cat: 'Lighting' },
    { label: 'Ceramics', cat: 'Ceramics' },
    { label: 'Objects', cat: 'Objects' },
  ];

  const handleNavClick = (cat: Category) => {
    setSelectedCategory(cat);
    // Smooth scroll down to catalog section if not already in view
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Slim Dismissible Top Banner */}
      {!bannerDismissed && (
        <aside
          aria-label="Promotional Announcement"
          className="relative bg-stone-900 text-stone-100 text-xs px-4 py-2 flex items-center justify-between transition-all"
        >
          <div className="mx-auto flex items-center gap-3 text-center">
            <span className="font-light tracking-wide">
              Complimentary insured white-glove delivery on orders over $250
            </span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="hidden sm:inline text-stone-400">
              Use code <strong className="font-semibold text-white tracking-wider">ATELIER10</strong> for 10% off your first acquisition
            </span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss promotional banner"
            className="text-stone-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1-2 Primary Actions) */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl sm:text-3xl font-medium tracking-widest text-stone-900 hover:opacity-90 transition-opacity uppercase shrink-0"
        >
          ATELIER
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('All')}
            className={`transition-colors hover:text-stone-900 relative py-1 ${
              selectedCategory === 'All' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            All Works
            {selectedCategory === 'All' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.cat)}
              className={`transition-colors hover:text-stone-900 relative py-1 ${
                selectedCategory === link.cat ? 'text-stone-900 font-semibold' : ''
              }`}
            >
              {link.label}
              {selectedCategory === link.cat && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
              )}
            </button>
          ))}

          <a
            href="#craftsmanship"
            className="transition-colors hover:text-stone-900 py-1"
          >
            Heritage
          </a>
        </nav>

        {/* Zone 3: Actions (Currency selector, Search, Wishlist, Bag) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className="relative inline-flex items-center text-xs font-medium text-stone-700">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Select Currency"
              className="bg-transparent border border-stone-300 rounded px-2 py-1 text-xs text-stone-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors"
            >
              {Object.keys(CURRENCIES).map((cur) => (
                <option key={cur} value={cur}>
                  {cur} ({CURRENCIES[cur as CurrencyCode].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Search Trigger */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-stone-100 rounded-lg px-2.5 py-1 border border-stone-300 animate-in fade-in duration-200">
                <Search className="w-3.5 h-3.5 text-stone-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search works, materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none text-xs text-stone-900 w-28 sm:w-44 focus:outline-none"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-stone-400 hover:text-stone-700 ml-1"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="Open search input"
                className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Icon Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`View Wishlist (${wishlist.length} saved)`}
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors relative"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-stone-900 rounded-full" />
            )}
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping Bag (${cartCount} items)`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-mono text-xs bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};
