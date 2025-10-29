/* stylelint-disable */
'use client';

import React from 'react';
import { Button, ButtonLoader } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';

export type PaginationType = 'infinite' | 'page-numbers';

export interface PaginationProps {
  type?: PaginationType;
  currentPage?: number;
  totalPages?: number;
  hasMore?: boolean;
  loading?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onPageChange?: (page: number) => void;
  onLoadMore?: () => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  type = 'page-numbers',
  currentPage = 1,
  totalPages = 1,
  hasMore = false,
  loading = false,
  onNext,
  onPrevious,
  onPageChange,
  onLoadMore,
  className,
}) => {
  // Infinite scroll "Load More" button
  if (type === 'infinite') {
    if (!hasMore) return null;
    
    return (
      <div className={cn('flex justify-center pt-8', className)}>
        <button
          onClick={onLoadMore}
          disabled={loading}
          className={cn(
            'px-12 py-4 rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300',
            'bg-linear-to-r from-[#D4AF37] to-[#E5C558] text-white',
            'shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)]',
            'hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.5)] hover:-translate-y-1',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <ButtonLoader size="sm" />
              Loading...
            </span>
          ) : (
            'Load More'
          )}
        </button>
      </div>
    );
  }

  // Page numbers pagination
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className={cn('flex justify-center items-center gap-2 mt-8', className)}>
      <Button
        variant="secondary"
        size="md"
        disabled={currentPage <= 1 || loading}
        onClick={onPrevious}
      >
        Previous
      </Button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-[#999999]">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange?.(page as number)}
            disabled={loading}
            className={cn(
              'w-10 h-10 rounded-full font-semibold text-sm transition-all duration-200',
              page === currentPage
                ? 'bg-linear-to-r from-[#D4AF37] to-[#E5C558] text-white shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)]'
                : 'bg-white text-[#666666] hover:bg-[#FFF8F0] hover:text-[#D4AF37]',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            style={page === currentPage ? {} : { boxShadow: 'var(--neo-shadow)' }}
          >
            {page}
          </button>
        );
      })}

      <Button
        variant="primary"
        size="md"
        disabled={currentPage >= totalPages || loading}
        onClick={onNext}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <ButtonLoader size="sm" />
            Next
          </span>
        ) : (
          'Next'
        )}
      </Button>
    </div>
  );
};
