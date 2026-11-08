import { Currency } from '../types';

export const EXCHANGE_RATES: Record<Currency, number> = {
  TZS: 1,
  USD: 1 / 2620,
  EUR: 1 / 2850,
  GBP: 1 / 3380,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TZS: 'TZS',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export function convertFromTzs(amountTzs: number, targetCurrency: Currency): number {
  return amountTzs * EXCHANGE_RATES[targetCurrency];
}

export function formatPrice(amountTzs: number, currency: Currency): string {
  const converted = convertFromTzs(amountTzs, currency);
  
  if (currency === 'TZS') {
    return `TZS ${Math.round(converted).toLocaleString()}`;
  }
  
  const symbol = CURRENCY_SYMBOLS[currency];
  return `${symbol}${Math.round(converted).toLocaleString()}`;
}
