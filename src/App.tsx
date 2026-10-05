import React, { useMemo } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { StorySection } from './components/StorySection';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { Star, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

const ShopContent: React.FC = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    inStockOnly,
    setSelectedCategory,
    setInStockOnly
  } = useShop();

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // In-stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockCount > 0);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.designer.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'curated':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, inStockOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900">
      {/* Top Bar with One-Row, Three-Zone Contract */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero />

        {/* Featured Collection Grid */}
        <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                Curated Catalogue
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                {selectedCategory === 'All' ? 'Permanent Works & Editions' : `${selectedCategory} Collection`}
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md font-light">
              Each piece is individually registered with a unique studio serial number,
              signed certificate of origin, and lifetime repair support.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <FilterBar totalCount={filteredProducts.length} />

          {/* Product Grid (3-column desktop / 2-column tablet) */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-stone-100/60 rounded-2xl border border-stone-200 p-8">
              <span className="font-display text-2xl text-stone-800 mb-2">
                No matching pieces found
              </span>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mb-6 font-light">
                There are currently no items matching your criteria "{searchQuery || selectedCategory}".
                Try clearing your filters or exploring our all works catalogue.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Provenance & Craftsmanship Section */}
        <StorySection />

        {/* Attributable Client Acclaim Section (Claim-to-Proof Adjacency) */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Architectural Reception
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
              Collected across residences, galleries & private studios.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                "The Koto chair possesses that rare balance of sculptural presence and genuine physical comfort.
                Clients immediately notice the bouclé texture and Danish joinery."
              </p>
              <div className="pt-2 border-t border-stone-100 flex flex-col text-xs">
                <span className="font-semibold text-stone-900">Marta Enevoldsen</span>
                <span className="text-stone-500 text-[11px]">Principal Architect, Studio Vesterbro · Copenhagen</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                "Finding unlacquered brass lighting executed at this level is exceedingly rare.
                The Kallan pendant casts the most tranquil, glare-free ambient light across our gallery boardroom."
              </p>
              <div className="pt-2 border-t border-stone-100 flex flex-col text-xs">
                <span className="font-semibold text-stone-900">Dr. Lucas Baumgartner</span>
                <span className="text-stone-500 text-[11px]">Curator, Alpine Contemporary Arts · Zurich</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                "The Kyoto stoneware vessels arrived in custom timber-reinforced crating.
                The unglazed mineral texture shifts subtly under morning sun. A true work of meditative art."
              </p>
              <div className="pt-2 border-t border-stone-100 flex flex-col text-xs">
                <span className="font-semibold text-stone-900">Yoko Takahashi</span>
                <span className="text-stone-500 text-[11px]">Interior Designer, Oku Living · Tokyo</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <ToastNotification />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}
