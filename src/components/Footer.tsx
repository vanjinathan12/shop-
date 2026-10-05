import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    addToast('Subscribed to ATELIER Studio Monographs & Journal', 'success');
  };

  const handleCategoryClick = (cat: 'Living' | 'Lighting' | 'Ceramics' | 'Objects') => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-stone-800">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl font-normal tracking-widest text-white uppercase block">
              ATELIER
            </span>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              A studio devoted to physical permanence, tactile resonance, and timeless spatial forms.
              Distributed worldwide from Copenhagen and Kyoto.
            </p>
            <div className="pt-2 text-xs text-stone-500">
              <span>Showroom: Bredgade 42, 1260 Copenhagen K</span>
              <br />
              <span>Studio: 18-2 Kamitoba, Minami Ward, Kyoto</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Collection
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryClick('Living')}
                  className="hover:text-white transition-colors"
                >
                  Living & Seating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Lighting')}
                  className="hover:text-white transition-colors"
                >
                  Architectural Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Ceramics')}
                  className="hover:text-white transition-colors"
                >
                  Kiln Stoneware
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Objects')}
                  className="hover:text-white transition-colors"
                >
                  Curated Objects
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care & Trade */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Provenance
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  Material Sincerity
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => addToast('Care guide download requested')}>
                  Wood & Brass Care
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => addToast('Architect trade program opened')}>
                  Trade & Interior Architects
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => addToast('Carbon-neutral documentation: 100% verified')}>
                  Sustainability Dossier
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Monographs */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Studio Monographs
            </h4>
            <p className="text-stone-400 text-xs font-light">
              Receive quarterly architectural essays, kiln releases, and private acquisition invitations.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
                <Check className="w-4 h-4" />
                <span>You are registered with the Studio Journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 text-white placeholder-stone-500 rounded-lg text-xs border border-stone-700 focus:outline-none focus:border-stone-500"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to monographs"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-stone-700 hover:bg-stone-600 text-white rounded text-xs flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500">
                  Strict privacy. No commercial promotions or spam.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Clean Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ATELIER Design Studio ApS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Terms of Acquisition</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy & Cookies</span>
            <span className="hover:text-stone-400 cursor-pointer">Global Logistics Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
