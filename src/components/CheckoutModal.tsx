import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { X, ShieldCheck, CreditCard, Truck, Check, Lock, DollarSign } from 'lucide-react';
import { ShippingAddress } from '../types/shop';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalUSD,
    cartDiscountUSD,
    freeShippingThresholdUSD,
    appliedCoupon,
    currency,
    placeOrder
  } = useShop();

  // Form states
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Henrik Lindqvist',
    email: 'h.lindqvist@cph-studio.dk',
    phone: '+45 32 98 44 10',
    addressLine1: 'Bredgade 42, 3. sal',
    addressLine2: '',
    city: 'Copenhagen',
    postalCode: '1260',
    country: 'Denmark'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVC, setCardCVC] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const rawSubtotalUSD = cart.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);
  const isFreeShipping = rawSubtotalUSD >= freeShippingThresholdUSD;
  const shippingFeeUSD = isFreeShipping
    ? (shippingMethod === 'express' ? 20 : 0)
    : (shippingMethod === 'express' ? 45 : 25);
  const taxUSD = Math.round((cartTotalUSD) * 0.08);
  const finalTotalUSD = cartTotalUSD + shippingFeeUSD + taxUSD;

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      placeOrder({
        shippingAddress: address,
        shippingMethod,
        paymentMethod
      });
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure Checkout"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#FAF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-stone-700" />
            <span className="font-display text-lg font-medium text-stone-900">
              ATELIER · Encrypted Order Dispatch
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Customer & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Destination & Client Info */}
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h3 className="font-medium text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-mono">
                      1
                    </span>
                    <span>Client & Delivery Destination</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Email for Dispatch Receipt</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Contact Phone (Carrier SMS)</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Country / Region</label>
                    <input
                      type="text"
                      required
                      value={address.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Street name, suite, building..."
                      value={address.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">City / Municipality</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={address.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Logistics */}
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h3 className="font-medium text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-mono">
                      2
                    </span>
                    <span>Transit Logistics & White-Glove Care</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3.5 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">Standard White-Glove</span>
                      <span className="font-mono text-stone-800 font-semibold tabular-nums">
                        {isFreeShipping ? 'Complimentary' : formatPrice(25, currency)}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">
                      Scheduled room-of-choice placement & packing material removal. 5–7 business days.
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`p-3.5 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                      shippingMethod === 'express'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">Express Courier Air</span>
                      <span className="font-mono text-stone-800 font-semibold tabular-nums">
                        {isFreeShipping ? formatPrice(20, currency) : formatPrice(45, currency)}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">
                      Priority priority dispatch with climate-controlled tracking. 2–3 business days.
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h3 className="font-medium text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-mono">
                      3
                    </span>
                    <span>Settlement Method</span>
                  </h3>
                </div>

                {/* Method selector buttons */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-2.5 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Digital Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* Payment method forms */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-1 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• 4242"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">Security CVC</label>
                        <input
                          type="text"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          placeholder="CVC"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-center text-xs text-stone-600 space-y-1">
                    <p className="font-medium text-stone-800">Direct biometric authentication enabled</p>
                    <p className="text-[11px] text-stone-500">
                      Your default card and shipping billing address from Apple/Google Wallet will be synchronized.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-semibold">Cash on Delivery (White Glove Courier)</p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      You will pay the courier upon inside placement. An SMS dispatch PIN will be sent to <strong>{address.phone || 'your phone'}</strong> prior to arrival.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-4 sticky top-4">
                <h3 className="font-medium text-sm text-stone-900 border-b border-stone-100 pb-2">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} works)
                </h3>

                {/* Items preview list */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="w-12 h-12 rounded bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-stone-500 block truncate">
                          Qty: {item.quantity} · {Object.values(item.selectedVariants).join(', ') || 'Standard'}
                        </span>
                      </div>
                      <span className="font-mono text-stone-800 font-semibold tabular-nums shrink-0">
                        {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Breakdown */}
                <div className="border-t border-stone-200 pt-3 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-stone-900">
                      {formatPrice(rawSubtotalUSD, currency)}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Code ({appliedCoupon.code})</span>
                      <span className="font-mono tabular-nums">
                        -{formatPrice(cartDiscountUSD, currency)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Logistics ({shippingMethod === 'standard' ? 'White Glove' : 'Express Air'})</span>
                    <span className="font-mono tabular-nums text-stone-900">
                      {shippingFeeUSD === 0 ? 'Complimentary' : formatPrice(shippingFeeUSD, currency)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated VAT / Regional Tax</span>
                    <span className="font-mono tabular-nums text-stone-900">
                      {formatPrice(taxUSD, currency)}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-stone-200 text-sm font-semibold text-stone-900">
                    <span>Final Acquisition Total</span>
                    <span className="font-mono text-lg font-bold tabular-nums">
                      {formatPrice(finalTotalUSD, currency)}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Registering with Studio Vault...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Confirm & Authorize Dispatch</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400 pt-2">
                  <span>TLS 256-bit encryption</span>
                  <span>·</span>
                  <span>Direct Artisan Settlement</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
