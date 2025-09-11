'use client';

import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Button, Text } from '@/presentation/atoms';
import { SearchBar } from '@/presentation/molecules';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  title?: string;
  navigation?: Array<{ label: string; href: string }>;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      logo,
      title = 'InventorX',
      navigation = [],
      showSearch = true,
      onSearch,
      actions,
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <header
        ref={ref}
        className={cn('bg-white border-b border-gray-200', className)}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {logo && <div className="flex-shrink-0">{logo}</div>}
              <Text variant="h3" className="font-bold">
                {title}
              </Text>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Search and Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {showSearch && (
                <SearchBar
                  placeholder="Search..."
                  onSearch={onSearch}
                  showButton={false}
                  variant="minimal"
                  className="w-64"
                />
              )}
              {actions}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              {showSearch && (
                <div className="mt-4 px-4">
                  <SearchBar
                    placeholder="Search..."
                    onSearch={onSearch}
                    variant="default"
                  />
                </div>
              )}
              {actions && <div className="mt-4 px-4">{actions}</div>}
            </div>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header };