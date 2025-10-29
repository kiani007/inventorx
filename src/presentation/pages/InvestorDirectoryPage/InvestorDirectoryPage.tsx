/* stylelint-disable */
'use client';

import React from 'react';
import { MainLayout } from '@/presentation/templates';
import { InvestorDirectoryHero, InvestorDirectory } from '@/presentation/organisms';

export interface InvestorDirectoryPageProps {
  initialFilters?: Record<string, string | boolean | undefined>;
}

export const InvestorDirectoryPage: React.FC<InvestorDirectoryPageProps> = ({ initialFilters }) => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <InvestorDirectoryHero />

      {/* Directory with Filters & Grid */}
      <InvestorDirectory initialFilters={initialFilters} />
    </MainLayout>
  );
};

