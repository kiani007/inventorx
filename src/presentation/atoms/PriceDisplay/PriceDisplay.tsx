import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface PriceDisplayProps {
  amount: number;
  currency?: string;
  label?: string;
  variant?: 'default' | 'large' | 'compact';
  className?: string;
  showCurrency?: boolean;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  AED: 'AED',
  SGD: 'S$',
};

const formatPrice = (amount: number, currency: string = 'USD'): string => {
  const symbol = currencySymbols[currency] || currency;
  
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}K`;
  }
  
  return `${symbol}${amount.toLocaleString()}`;
};

const formatFullPrice = (amount: number, currency: string = 'USD'): string => {
  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${amount.toLocaleString()}`;
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency = 'USD',
  label,
  variant = 'default',
  className,
  showCurrency = true,
}) => {
  const formattedPrice = variant === 'compact' ? formatPrice(amount, currency) : formatFullPrice(amount, currency);

  if (variant === 'large') {
    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <span className="text-sm text-[#666666] uppercase tracking-wider font-semibold mb-1">
            {label}
          </span>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold font-display text-[#D4AF37]">
            {formattedPrice}
          </span>
          {showCurrency && currency && currencySymbols[currency] !== formattedPrice[0] && (
            <span className="text-lg text-[#999999] font-semibold">{currency}</span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={cn('text-xl font-bold font-display text-[#D4AF37]', className)} title={formatFullPrice(amount, currency)}>
        {formattedPrice}
      </span>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <span className="text-xs text-[#666666] uppercase tracking-wider font-semibold mb-0.5">
          {label}
        </span>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-display text-[#D4AF37]">
          {formattedPrice}
        </span>
        {showCurrency && currency && currencySymbols[currency] !== formattedPrice[0] && (
          <span className="text-sm text-[#999999] font-semibold">{currency}</span>
        )}
      </div>
    </div>
  );
};

export { PriceDisplay, formatPrice, formatFullPrice };

