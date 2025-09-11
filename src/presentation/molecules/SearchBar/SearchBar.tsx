import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Input } from '@/presentation/atoms';
import { Button } from '@/presentation/atoms';

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  onSearch?: (value: string) => void;
  showButton?: boolean;
  buttonText?: string;
  variant?: 'default' | 'rounded' | 'minimal';
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  (
    {
      className,
      placeholder = 'Search...',
      onSearch,
      showButton = true,
      buttonText = 'Search',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
      if (onSearch) {
        onSearch(searchValue);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    const variantStyles = {
      default: 'flex gap-2',
      rounded: 'flex gap-2 p-2 bg-gray-100 rounded-full',
      minimal: 'flex gap-2 border-b border-gray-300 pb-2',
    };

    return (
      <div ref={ref} className={cn(variantStyles[variant], className)} {...props}>
        <Input
          type="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cn(
            'flex-1',
            variant === 'rounded' && 'rounded-full border-0 bg-white',
            variant === 'minimal' && 'border-0 focus:ring-0'
          )}
        />
        {showButton && (
          <Button
            onClick={handleSearch}
            variant={variant === 'minimal' ? 'ghost' : 'primary'}
            size={variant === 'rounded' ? 'sm' : 'md'}
            className={variant === 'rounded' ? 'rounded-full' : ''}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };