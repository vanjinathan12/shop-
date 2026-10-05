import React from 'react';
import { useShop } from '../context/ShopContext';
import { Category, SortOption } from '../types/shop';
import { SlidersHorizontal, Check, X } from 'lucide-react';

interface FilterBarProps {
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ totalCount }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    setSearchQuery
  } = useShop();

  const categories: Category[] = ['All', 'Living', 'Lighting', 'Ceramics', 'Objects'];

  return (
    <div className="py-6 border-b border-stone-200 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Segmented Controls (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-stone-100 shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
              }`}
            >
              {cat === 'All' ? 'All Works' : cat}
            </button>
          ))}
        </div>

        {/* Right side controls: In-Stock Toggle, Sort Dropdown, Results counter */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
          {/* Active Search Indicator */}
          {searchQuery && (
            <div className="flex items-center gap-1.5 bg-stone-200/70 text-stone-800 px-2.5 py-1 rounded text-xs">
              <span>Query: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-stone-950 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* In-Stock Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 hover:text-stone-900">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-3.5 h-3.5 accent-stone-900 cursor-pointer"
            />
            <span className="font-medium">Ready to Dispatch</span>
          </label>

          <span className="text-stone-300 hidden sm:inline">|</span>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-normal">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort products"
              className="bg-stone-100 border border-stone-300 text-stone-800 rounded px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="curated">Curated Studio Picks</option>
              <option value="price-asc">Price: Ascending</option>
              <option value="price-desc">Price: Descending</option>
              <option value="rating">Highest Acclaim</option>
            </select>
          </div>

          <span className="text-stone-300 hidden sm:inline">|</span>

          {/* Results Count in Tabular Numbers */}
          <div className="text-stone-500 font-mono text-xs tabular-nums">
            {totalCount} {totalCount === 1 ? 'work' : 'works'}
          </div>
        </div>
      </div>
    </div>
  );
};
