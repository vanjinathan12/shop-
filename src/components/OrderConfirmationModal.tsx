import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { CheckCircle2, PackageCheck, Printer, Copy, Check, ArrowRight } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { completedOrder, setCompletedOrder, currency } = useShop();
  const [copied, setCopied] = useState(false);

  if (!completedOrder) return null;

  const order = completedOrder;

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order Confirmation"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#FAF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
      >
        {/* Success Header */}
        <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">
            Studio Acquisition Verified
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
            Order {order.orderId} Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md font-light">
            A confirmation dossier and dispatch tracking invite have been transmitted to{' '}
            <strong className="text-white font-medium">{order.shippingAddress.email}</strong>.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleCopyOrderNumber}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{order.orderId}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Estimated Delivery Status */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider block font-medium">
                Estimated White-Glove Arrival
              </span>
              <span className="text-sm font-semibold text-stone-900">
                {order.estimatedDelivery} · Insured Freight
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
            <h4 className="font-medium text-xs uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
              Itemized Acquisition Breakdown
            </h4>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover border border-stone-200"
                    />
                    <div>
                      <span className="font-semibold text-stone-900 block">
                        {item.product.name}
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        Qty: {item.quantity} · {Object.values(item.selectedVariants).join(', ') || 'Standard'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-stone-800 tabular-nums">
                    {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {formatPrice(order.subtotalUSD, currency)}
                </span>
              </div>
              {order.discountUSD > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Studio Privilege Discount</span>
                  <span className="font-mono tabular-nums">
                    -{formatPrice(order.discountUSD, currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Freight Logistics ({order.shippingMethod})</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {order.shippingFeeUSD === 0 ? 'Complimentary' : formatPrice(order.shippingFeeUSD, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated VAT / Regional Tax</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {formatPrice(order.taxUSD, currency)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                <span>Total Settled</span>
                <span className="font-mono font-bold tabular-nums">
                  {formatPrice(order.totalUSD, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Destination */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
            <h4 className="font-medium text-xs uppercase tracking-wider text-stone-500 mb-2">
              Delivery Address & Recipient
            </h4>
            <p className="font-semibold text-stone-900">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
            <p className="text-stone-500 pt-1">Tel: {order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-stone-200">
          <button
            onClick={() => setCompletedOrder(null)}
            className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 group"
          >
            <span>Return to ATELIER Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
