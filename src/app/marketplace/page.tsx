import { MarketplacePage } from '@/presentation/pages/MarketplacePage/MarketplacePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace - InventorX',
  description: 'Discover revolutionary innovations and invest in groundbreaking technologies. Browse projects, auctions, and connect with brilliant inventors.',
};

export default function Marketplace() {
  return <MarketplacePage />;
}

