export type Category = 'All' | 'Living' | 'Lighting' | 'Ceramics' | 'Objects';

export interface ProductVariant {
  name: string; // e.g. "Wood Finish", "Shade Color", "Size"
  options: {
    label: string;
    value: string;
    swatchColor?: string; // hex or CSS color
    priceAdjustmentUSD?: number;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Living' | 'Lighting' | 'Ceramics' | 'Objects';
  priceUSD: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  additionalImages?: string[];
  material: string;
  dimensions: string;
  weight: string;
  designer: string;
  origin: string;
  leadTime: string;
  description: string;
  details: string[];
  variants?: ProductVariant[];
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id e.g. productId-variantKeys
  productId: string;
  product: Product;
  selectedVariants: Record<string, string>;
  quantity: number;
  unitPriceUSD: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from USD
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'cod';
  subtotalUSD: number;
  discountUSD: number;
  shippingFeeUSD: number;
  taxUSD: number;
  totalUSD: number;
  currency: CurrencyCode;
  currencySymbol: string;
  currencyRate: number;
  status: 'Confirmed' | 'Preparing' | 'Shipped';
  estimatedDelivery: string;
}

export type SortOption = 'curated' | 'price-asc' | 'price-desc' | 'rating';
