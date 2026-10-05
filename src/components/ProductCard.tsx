import React, { useState } from 'react';
import { Product } from '../types/shop';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    currency,
    addToCart,
    setQuickViewProduct,
    isInWishlist,
    toggleWishlist
  } = useShop();

  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use default variants if any
    const defaultVariants: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach(v => {
        if (v.options[0]) {
          defaultVariants[v.name] = v.options[0].value;
        }
      });
    }
    addToCart(product, defaultVariants, 1);
  };

  return (
    <article
      onClick={() => setQuickViewProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#F7F6F2] rounded-xl overflow-hidden border border-stone-200/70 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Visual Slot (65-75% visual weight) */}
      <div className="relative aspect-4/3 sm:aspect-square bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-200 text-stone-600">
            <span className="font-display text-lg text-stone-700">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.material}</span>
          </div>
        )}

        {/* Wishlist Button (Quiet Affordance) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white/80 hover:bg-white text-stone-700 shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Subtle Single Text Tag (NO PILL BADGE CLUSTERS) */}
        {product.stockCount <= 5 ? (
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-200 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide">
            Only {product.stockCount} editions remaining
          </div>
        ) : product.featured ? (
          <div className="absolute top-3 left-3 bg-stone-950/60 backdrop-blur-sm text-stone-200 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide">
            Studio Selection
          </div>
        ) : null}

        {/* Quick Actions Hover Overlay */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-medium rounded-lg shadow-sm backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Specifications</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Product Information Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean unboxed metadata with typographic dot separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 tracking-wider uppercase font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.origin}</span>
          </div>

          <h3 className="font-display text-lg font-medium text-stone-900 leading-snug group-hover:text-stone-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 font-light mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
              {formatPrice(product.priceUSD, currency)}
            </span>
            {product.originalPriceUSD && (
              <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(product.originalPriceUSD, currency)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium tabular-nums">{product.rating.toFixed(2)}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
