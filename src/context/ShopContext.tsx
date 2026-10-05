import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Review,
  CurrencyCode,
  Order,
  Category,
  SortOption
} from '../types/shop';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { CURRENCIES } from '../utils/currency';

interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warn';
}

interface ShopContextType {
  products: Product[];
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variants?: Record<string, string>, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  cartDiscountUSD: number;
  cartCount: number;
  freeShippingThresholdUSD: number;
  
  // Coupon
  appliedCoupon: { code: string; percentOff: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;

  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: Order | null;
  setCompletedOrder: (order: Order | null) => void;
  placeOrder: (details: {
    shippingAddress: Order['shippingAddress'];
    shippingMethod: 'standard' | 'express';
    paymentMethod: 'card' | 'apple_pay' | 'cod';
  }) => Order;

  // Filters & Browsing
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;

  // Toast feedback
  toasts: ToastItem[];
  addToast: (message: string, type?: 'info' | 'success' | 'warn') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const FREE_SHIPPING_THRESHOLD_USD = 250;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Saved Cart in local state
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Start with 1 default item so user sees a rich ready-to-interact cart state immediately
    const firstProduct = INITIAL_PRODUCTS[0];
    const initialVariants: Record<string, string> = {
      'Timber Finish': 'natural-oak',
      'Bouclé Tone': 'cream'
    };
    return [
      {
        id: `${firstProduct.id}-natural-oak-cream`,
        productId: firstProduct.id,
        product: firstProduct,
        selectedVariants: initialVariants,
        quantity: 1,
        unitPriceUSD: firstProduct.priceUSD
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(['kallan-brass-pendant']);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percentOff: number } | null>(null);

  // Panels & Views
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('curated');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'warn' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, variants?: Record<string, string>, quantity: number = 1) => {
    const variantRecord = variants || {};
    // Calculate variant price adjustment
    let adjustedPrice = product.priceUSD;
    if (product.variants && Object.keys(variantRecord).length > 0) {
      product.variants.forEach(v => {
        const chosenVal = variantRecord[v.name];
        const opt = v.options.find(o => o.value === chosenVal);
        if (opt && opt.priceAdjustmentUSD) {
          adjustedPrice += opt.priceAdjustmentUSD;
        }
      });
    }

    const variantKey = Object.entries(variantRecord)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const itemId = `${product.id}-${variantKey || 'default'}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === itemId);
      if (existing) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedVariants: variantRecord,
          quantity,
          unitPriceUSD: adjustedPrice
        }
      ];
    });

    addToast(`Added "${product.name}" to your bag`, 'success');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const rawSubtotalUSD = cart.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);
  const cartDiscountUSD = appliedCoupon ? (rawSubtotalUSD * appliedCoupon.percentOff) / 100 : 0;
  const cartTotalUSD = Math.max(0, rawSubtotalUSD - cartDiscountUSD);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ATELIER10' || clean === 'WELCOME10') {
      setAppliedCoupon({ code: clean, percentOff: 10 });
      addToast('10% savings coupon applied', 'success');
      return true;
    } else if (clean === 'ARCHITECT20' || clean === 'SPRING20') {
      setAppliedCoupon({ code: clean, percentOff: 20 });
      addToast('20% studio privilege coupon applied', 'success');
      return true;
    } else {
      addToast('Coupon code is invalid or expired', 'warn');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(`Removed ${prod ? `"${prod.name}"` : 'item'} from saved list`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast(`Saved ${prod ? `"${prod.name}"` : 'item'} to your wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Reviews
  const addReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setReviews(prev => [fullReview, ...prev]);
    addToast('Your review has been verified and published', 'success');
  };

  // Order Placement
  const placeOrder = (details: {
    shippingAddress: Order['shippingAddress'];
    shippingMethod: 'standard' | 'express';
    paymentMethod: 'card' | 'apple_pay' | 'cod';
  }): Order => {
    const subtotal = rawSubtotalUSD;
    const discount = cartDiscountUSD;
    const shippingFee =
      subtotal >= FREE_SHIPPING_THRESHOLD_USD
        ? 0
        : details.shippingMethod === 'express'
        ? 45
        : 25;
    const tax = Math.round((subtotal - discount) * 0.08); // 8% estimated tax
    const total = subtotal - discount + shippingFee + tax;

    const currConfig = CURRENCIES[currency];
    const orderNumber = `AT-${Math.floor(10000 + Math.random() * 90000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (details.shippingMethod === 'express' ? 3 : 7));

    const newOrder: Order = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      shippingAddress: details.shippingAddress,
      shippingMethod: details.shippingMethod,
      paymentMethod: details.paymentMethod,
      subtotalUSD: subtotal,
      discountUSD: discount,
      shippingFeeUSD: shippingFee,
      taxUSD: tax,
      totalUSD: total,
      currency,
      currencySymbol: currConfig.symbol,
      currencyRate: currConfig.rate,
      status: 'Confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    };

    setCompletedOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        reviews,
        addReview,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotalUSD,
        cartDiscountUSD,
        cartCount,
        freeShippingThresholdUSD: FREE_SHIPPING_THRESHOLD_USD,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        placeOrder,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
