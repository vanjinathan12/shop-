import React, { useState } from 'react';
import { HERO_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setQuickViewProduct, products } = useShop();
  const [imageError, setImageError] = useState(false);

  const handleExplore = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredChair = products.find((p) => p.id === 'koto-lounge-chair');

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span>Kyoto & Copenhagen Studios</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.08] mb-6 [text-wrap:balance]">
              Sculpted forms for the architectural sanctuary.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-light">
              Tactile solid timbers, heavy cast brass, and wheel-thrown stoneware
              curated for spaces of considered calm. Crafted by master artisans in
              limited studio editions.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs group"
              >
                <span>Explore Works</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {featuredChair && (
                <button
                  onClick={() => setQuickViewProduct(featuredChair)}
                  className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium rounded-lg border border-stone-300 transition-colors inline-flex items-center gap-2"
                >
                  <span>Featured: Koto Chair</span>
                </button>
              )}
            </div>

            {/* Quiet trust markers adjacent to CTA */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 flex items-center gap-6 text-xs text-stone-500">
              <div className="flex flex-col">
                <span className="font-medium text-stone-800 tabular-nums">100%</span>
                <span className="text-[11px]">FSC-Certified Hardwoods</span>
              </div>
              <div className="h-6 w-px bg-stone-200" />
              <div className="flex flex-col">
                <span className="font-medium text-stone-800 tabular-nums">30-Day</span>
                <span className="text-[11px]">In-Home Trial Guarantee</span>
              </div>
              <div className="h-6 w-px bg-stone-200" />
              <div className="flex flex-col">
                <span className="font-medium text-stone-800 tabular-nums">Lifetime</span>
                <span className="text-[11px]">Structural Integrity Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Campaign Imagery (16:9 or Architectural Frame) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/60 bg-stone-100 aspect-16/10 group">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Architectural living room with sculptural oak armchair and brass pendant lamp in natural morning daylight"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                />
              ) : (
                /* Fallback styled container adhering to zero-broken-image policy */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-200 text-stone-700">
                  <span className="font-display text-2xl mb-2">ATELIER Editorial Space</span>
                  <span className="text-xs text-stone-500">Kyoto & Copenhagen Architectural Study</span>
                </div>
              )}

              {/* Scrim and subtle corner attribution */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs pointer-events-auto">
                <div className="bg-stone-950/40 backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-medium tracking-wide">
                  Solstice Living Room Study · Milan Edition
                </div>
                <button
                  onClick={() => setSelectedCategory('Living')}
                  className="bg-white/90 hover:bg-white text-stone-900 px-3 py-1.5 rounded text-[11px] font-semibold transition-colors"
                >
                  View Living Pieces
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
