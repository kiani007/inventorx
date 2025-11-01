import { Metadata } from 'next';
import { BlogListingPage } from '@/presentation/pages';

export const metadata: Metadata = {
  title: 'Innovation Blog | InventorX',
  description: 'Explore cutting-edge insights, success stories, and expert guidance on technology, investment, and entrepreneurship from industry leaders.',
  keywords: ['innovation', 'technology', 'investment', 'entrepreneurship', 'startups', 'deep tech', 'blog'],
  openGraph: {
    title: 'Innovation Blog | InventorX',
    description: 'Explore cutting-edge insights, success stories, and expert guidance on technology, investment, and entrepreneurship.',
    type: 'website',
    url: 'https://inventorx.com/blog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
        width: 1200,
        height: 630,
        alt: 'InventorX Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innovation Blog | InventorX',
    description: 'Explore cutting-edge insights on technology, investment, and entrepreneurship.',
  },
};

// Enable ISR - Revalidate every hour
export const revalidate = 3600;

export default function BlogPage() {
  return <BlogListingPage />;
}

