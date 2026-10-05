import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { X, Star, Heart, Check, Truck, ShieldCheck, RefreshCw, Plus, Minus } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    currency,
    reviews,
    addReview
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);

  // Variant selections
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach(v => {
        if (v.options[0]) {
          initial[v.name] = v.options[0].value;
        }
      });
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Calculate price with variant adjustments
  let calculatedUnitPriceUSD = product.priceUSD;
  if (product.variants) {
    product.variants.forEach(v => {
      const chosenVal = selectedVariants[v.name];
      const opt = v.options.find(o => o.value === chosenVal);
      if (opt && opt.priceAdjustmentUSD) {
        calculatedUnitPriceUSD += opt.priceAdjustmentUSD;
      }
    });
  }

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariants, quantity);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      location: reviewLocation.trim() || undefined,
      rating: reviewRating,
      title: reviewTitle.trim() || 'Verified Acquisition',
      comment: reviewComment.trim(),
      verified: true
    });

    setReviewAuthor('');
    setReviewLocation('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#FAF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Close & Wishlist Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white/80">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ref. {product.id.slice(0, 8)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-stone-900 text-stone-900' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close product view"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Left Column */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-stone-600 text-center">
                <div className="p-2.5 bg-stone-100 rounded-lg flex flex-col items-center justify-center">
                  <Truck className="w-4 h-4 text-stone-800 mb-1" />
                  <span className="text-[11px] font-medium leading-tight text-stone-900">White Glove</span>
                  <span className="text-[10px] text-stone-500">Inside delivery</span>
                </div>
                <div className="p-2.5 bg-stone-100 rounded-lg flex flex-col items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-stone-800 mb-1" />
                  <span className="text-[11px] font-medium leading-tight text-stone-900">Heirloom</span>
                  <span className="text-[10px] text-stone-500">10-yr warranty</span>
                </div>
                <div className="p-2.5 bg-stone-100 rounded-lg flex flex-col items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-stone-800 mb-1" />
                  <span className="text-[11px] font-medium leading-tight text-stone-900">30 Days</span>
                  <span className="text-[10px] text-stone-500">In-home trial</span>
                </div>
              </div>
            </div>

            {/* Purchase & Details Right Column */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-stone-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-stone-600 text-sm mt-1">{product.subtitle}</p>

                {/* Rating & Availability */}
                <div className="flex items-center gap-3 mt-3 pb-4 border-b border-stone-200">
                  <div className="flex items-center gap-1 text-xs text-stone-700">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-medium tabular-nums">{product.rating.toFixed(2)}</span>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-stone-500 hover:underline ml-1"
                    >
                      ({product.reviewCount} customer reviews)
                    </button>
                  </div>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-xs font-medium text-emerald-800">
                    {product.leadTime}
                  </span>
                </div>

                {/* Price Display */}
                <div className="py-4 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                    {formatPrice(calculatedUnitPriceUSD, currency)}
                  </span>
                  {product.originalPriceUSD && (
                    <span className="font-mono text-sm text-stone-400 line-through tabular-nums">
                      {formatPrice(product.originalPriceUSD, currency)}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 font-light">Taxes & insured freight calculated at step 2</span>
                </div>

                {/* Variants Selection */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-4 py-2 border-t border-stone-200">
                    {product.variants.map((v) => (
                      <div key={v.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-stone-800">{v.name}:</span>
                          <span className="text-stone-500">
                            {v.options.find(o => o.value === selectedVariants[v.name])?.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {v.options.map((opt) => {
                            const isChosen = selectedVariants[v.name] === opt.value;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => handleVariantChange(v.name, opt.value)}
                                className={`px-3 py-1.5 text-xs rounded-md border flex items-center gap-2 transition-all ${
                                  isChosen
                                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                                    : 'border-stone-300 bg-white hover:border-stone-400 text-stone-700'
                                }`}
                              >
                                {opt.swatchColor && (
                                  <span
                                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                                    style={{ backgroundColor: opt.swatchColor }}
                                  />
                                )}
                                <span>{opt.label}</span>
                                {opt.priceAdjustmentUSD && (
                                  <span className={`tabular-nums font-mono text-[10px] ${isChosen ? 'text-stone-200' : 'text-stone-500'}`}>
                                    +{formatPrice(opt.priceAdjustmentUSD, currency)}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantity & Add to Cart Module */}
                <div className="pt-4 mt-2 border-t border-stone-200 flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-medium text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Acquire for Bag</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {formatPrice(calculatedUnitPriceUSD * quantity, currency)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs (Overview / Specs / Reviews) */}
              <div className="mt-8 border-t border-stone-200 pt-4">
                <div className="flex items-center gap-4 border-b border-stone-200 pb-2 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-1 transition-colors relative ${
                      activeTab === 'overview'
                        ? 'text-stone-900 font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Overview & Craft
                    {activeTab === 'overview' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 -mb-2.5" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1 transition-colors relative ${
                      activeTab === 'specs'
                        ? 'text-stone-900 font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Dimensions & Specifications
                    {activeTab === 'specs' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 -mb-2.5" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-1 transition-colors relative ${
                      activeTab === 'reviews'
                        ? 'text-stone-900 font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Reviews ({productReviews.length})
                    {activeTab === 'reviews' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 -mb-2.5" />
                    )}
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="py-4 text-xs text-stone-600 leading-relaxed min-h-[140px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      <ul className="space-y-1.5 list-disc pl-4 text-stone-700">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Primary Material</span>
                        <span className="font-medium text-stone-800">{product.material}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Dimensions</span>
                        <span className="font-medium text-stone-800">{product.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Net Weight</span>
                        <span className="font-medium text-stone-800">{product.weight}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Designer / Studio</span>
                        <span className="font-medium text-stone-800">{product.designer}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-stone-400 block text-[11px]">Place of Origin</span>
                        <span className="font-medium text-stone-800">{product.origin}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-stone-900">
                          Verified Collector Impressions
                        </span>
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium transition-colors"
                        >
                          {showReviewForm ? 'Cancel' : 'Write an Impression'}
                        </button>
                      </div>

                      {showReviewForm && (
                        <form
                          onSubmit={handleSubmitReview}
                          className="p-3 bg-stone-100 rounded-lg space-y-2 border border-stone-200"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Your Name (e.g. Henrik L.)"
                              value={reviewAuthor}
                              onChange={(e) => setReviewAuthor(e.target.value)}
                              className="px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="City, Country"
                              value={reviewLocation}
                              onChange={(e) => setReviewLocation(e.target.value)}
                              className="px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-stone-600">Rating:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setReviewRating(star)}
                                  className="p-0.5 text-stone-400 hover:text-amber-500"
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      star <= reviewRating
                                        ? 'fill-amber-500 text-amber-500'
                                        : 'text-stone-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <input
                            type="text"
                            placeholder="Headline summary"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs focus:outline-none"
                          />

                          <textarea
                            required
                            rows={2}
                            placeholder="Share your thoughts on craftsmanship, material touch, or delivery..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs focus:outline-none resize-none"
                          />

                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-stone-900 text-white rounded font-medium hover:bg-stone-800 transition-colors"
                          >
                            Publish Impression
                          </button>
                        </form>
                      )}

                      {productReviews.length === 0 ? (
                        <p className="text-stone-400 italic">
                          Be the first collector to record an impression of this piece.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {productReviews.map((rev) => (
                            <div
                              key={rev.id}
                              className="p-3 bg-white rounded-lg border border-stone-200/80 space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-stone-900">{rev.title}</span>
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: rev.rating }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-stone-700">{rev.comment}</p>
                              <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-1">
                                <span>{rev.author}</span>
                                {rev.location && <span>· {rev.location}</span>}
                                <span>· {rev.date}</span>
                                {rev.verified && (
                                  <span className="text-emerald-700 font-medium">✓ Verified Acquisition</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
