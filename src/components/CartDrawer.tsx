import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotalUSD,
    cartDiscountUSD,
    freeShippingThresholdUSD,
    currency,
    setIsCheckoutOpen,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(false);

  if (!isCartOpen) return null;

  const rawSubtotalUSD = cart.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUSD - rawSubtotalUSD);
  const shippingProgressPct = Math.min(100, (rawSubtotalUSD / freeShippingThresholdUSD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (!success) {
      setCouponError(true);
    } else {
      setCouponError(false);
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Bag"
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
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-display text-xl font-medium text-stone-900">
                Acquisition Bag
              </h2>
              <span className="font-mono text-xs text-stone-500 tabular-nums">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Meter */}
          <div className="bg-stone-100/90 px-6 py-3 border-b border-stone-200/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-stone-800">
                {remainingForFreeShipping === 0
                  ? 'Complimentary insured shipping unlocked'
                  : `Add ${formatPrice(remainingForFreeShipping, currency)} more for complimentary shipping`}
              </span>
              <span className="font-mono text-[11px] text-stone-500 tabular-nums">
                {Math.round(shippingProgressPct)}%
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300"
                style={{ width: `${shippingProgressPct}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-500">
                <ShoppingBag className="w-10 h-10 text-stone-300 stroke-1 mb-3" />
                <p className="font-display text-lg text-stone-700">Your bag is empty</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover our curated works and add timeless objects to your collection.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const variantsSummary = Object.entries(item.selectedVariants)
                  .map(([_, v]) => v)
                  .join(' / ');

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/70"
                  >
                    <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display text-sm font-semibold text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="text-stone-400 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {variantsSummary && (
                          <p className="text-[11px] text-stone-500 capitalize truncate mt-0.5">
                            {variantsSummary}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-stone-200 rounded bg-stone-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono tabular-nums text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                          {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Order Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-4">
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.percentOff}% off)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-950 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. ATELIER10)"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError(false);
                    }}
                    className={`flex-1 px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none ${
                      couponError ? 'border-rose-400' : 'border-stone-300'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {formatPrice(rawSubtotalUSD, currency)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Studio Privilege ({appliedCoupon.percentOff}%)</span>
                    <span className="font-mono tabular-nums">
                      -{formatPrice(cartDiscountUSD, currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {remainingForFreeShipping === 0
                      ? 'Complimentary'
                      : formatPrice(25, currency)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-medium text-stone-900">
                  <span>Estimated Total</span>
                  <span className="font-mono font-bold text-base tabular-nums">
                    {formatPrice(
                      cartTotalUSD + (remainingForFreeShipping === 0 ? 0 : 25),
                      currency
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Order Finalization</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-stone-400 font-light">
                Encrypted checkout · 30-day effortless returns · Worldwide transit insurance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
