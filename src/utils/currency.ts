import { CurrencyCode, CurrencyConfig } from '../types/shop';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

export function formatPrice(amountUSD: number, currencyCode: CurrencyCode = 'USD'): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * config.rate;
  
  return `${config.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatPriceExact(amountUSD: number, currencyCode: CurrencyCode = 'USD'): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * config.rate;
  
  return `${config.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
