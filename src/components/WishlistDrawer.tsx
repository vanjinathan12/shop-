import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    currency
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl border-l border-stone-200 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-stone-900 fill-stone-900" />
              <h2 className="font-display text-xl font-medium text-stone-900">
                Curated Wishlist
              </h2>
              <span className="font-mono text-xs text-stone-500 tabular-nums">
                ({savedProducts.length})
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-500">
                <Heart className="w-10 h-10 text-stone-300 stroke-1 mb-3" />
                <p className="font-display text-lg text-stone-700">No saved works yet</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Save pieces while you browse to reflect on spatial pairings and finishes.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-6 px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Browse Storefront
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/70"
                >
                  <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display text-sm font-semibold text-stone-900 truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="text-stone-400 hover:text-stone-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 capitalize truncate mt-0.5">
                        {product.material}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        {formatPrice(product.priceUSD, currency)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-medium rounded flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
