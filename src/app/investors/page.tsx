/* stylelint-disable */
import type { Metadata } from 'next';
import { InvestorDirectoryPage } from '@/presentation/pages';

export const metadata: Metadata = {
  title: 'Investor Directory - InventorX',
  description: 'Browse verified investors by category, country, and investment range.'
};

export default function InvestorsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  // Server component wrapper; pass any initial filters from searchParams if needed
  return <InvestorDirectoryPage />;
}


