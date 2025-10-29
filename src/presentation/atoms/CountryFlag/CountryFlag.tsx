'/* stylelint-disable */'
'use client';

import React from 'react';

function countryToEmoji(countryName: string): string {
  // Very lightweight mapping using en-US names; fallback to globe
  const map: Record<string, string> = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    Canada: '🇨🇦',
    Spain: '🇪🇸',
    Japan: '🇯🇵',
    Germany: '🇩🇪',
    France: '🇫🇷',
    'United Arab Emirates': '🇦🇪',
  };
  return map[countryName] ?? '🌐';
}

export interface CountryFlagProps {
  country: string;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ country }) => {
  return <span aria-label={country}>{countryToEmoji(country)}</span>;
};


