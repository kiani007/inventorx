/* stylelint-disable */
import type { Metadata } from 'next';
import { InvestorDirectoryPage } from '@/presentation/pages';

export const metadata: Metadata = {
  title: 'Investor Directory - InventorX',
  description: 'Browse verified investors by category, country, and investment range.'
};

export default async function InvestorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const normalized: Record<string, string | boolean | undefined> = {};
  for (const [key, raw] of Object.entries(params)) {
    const val = Array.isArray(raw) ? raw[0] : raw;
    if (val === undefined) continue;
    if (val === 'true' || val === 'false') {
      normalized[key] = val === 'true';
    } else {
      normalized[key] = val;
    }
  }
  return <InvestorDirectoryPage initialFilters={normalized} />;
}


