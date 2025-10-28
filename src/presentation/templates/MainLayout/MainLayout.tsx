'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { LuxuryHeader as Header, LuxuryFooter as Footer } from '@/presentation/organisms';

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  headerProps?: React.ComponentProps<typeof Header>;
  footerProps?: React.ComponentProps<typeof Footer>;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  headerProps,
  footerProps,
  showHeader = true,
  showFooter = true,
}) => {
  const defaultNavigation = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/marketplace' },
    { label: 'Auctions', href: '/marketplace?view=auctions' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const defaultFooterSections = [
    {
      title: 'Products',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Enterprise', href: '/enterprise' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Support', href: '/support' },
        { label: 'API', href: '/api' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <Header
          navigation={defaultNavigation}
          {...headerProps}
        />
      )}
      
      <main className={cn('flex-grow', className)}>
        {children}
      </main>
      
      {showFooter && (
        <Footer
          sections={defaultFooterSections}
          {...footerProps}
        />
      )}
    </div>
  );
};

MainLayout.displayName = 'MainLayout';

export { MainLayout };