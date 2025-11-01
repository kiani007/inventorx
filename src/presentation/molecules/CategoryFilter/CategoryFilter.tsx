import React from 'react';
import { BlogCategory } from '@/core/domain/entities/BlogCategory';
import { cn } from '@/shared/utils/cn';

export interface CategoryFilterProps {
  categories: BlogCategory[];
  activeCategory?: string;
  onCategoryChange: (categorySlug: string | undefined) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <button
        onClick={() => onCategoryChange(undefined)}
        className={cn(
          'px-6 py-2.5 rounded-full font-semibold text-[14px] uppercase tracking-wider',
          'transition-all duration-300',
          !activeCategory
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white shadow-[0_8px_20px_rgba(212,175,55,0.3)]'
            : 'bg-white text-[#666666] shadow-[var(--neo-shadow)] hover:shadow-[var(--neo-shadow-hover)]'
        )}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={cn(
            'px-6 py-2.5 rounded-full font-semibold text-[14px] uppercase tracking-wider',
            'transition-all duration-300',
            activeCategory === category.slug
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white shadow-[0_8px_20px_rgba(212,175,55,0.3)]'
              : 'bg-white text-[#666666] shadow-[var(--neo-shadow)] hover:shadow-[var(--neo-shadow-hover)]'
          )}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

