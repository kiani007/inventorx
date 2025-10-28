'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';
import { ProjectStatus, ProjectCategory, PROJECT_CATEGORIES, PROJECT_STATUS_LABELS } from '@/core/domain/entities/Project';
import { theme } from '@/shared/constants/theme';
import { Button, Input } from '@/presentation/atoms';

export interface FilterState {
  search?: string;
  status?: ProjectStatus | '';
  category?: ProjectCategory | '';
  country?: string;
  proposalType?: string;
  viewType?: 'all' | 'projects' | 'auctions';
}

export interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
  variant?: 'subtle' | 'default';
  compact?: boolean;
}

const countries = theme.filters.countries;
const proposalTypes = theme.filters.proposalTypes as { value: string; label: string }[];

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, className, variant = 'subtle', compact = false }) => {
  const [filters, setFilters] = useState<FilterState>({
    viewType: 'all',
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value === '' || value === 'all') {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const handleReset = () => {
    setFilters({ viewType: 'all' });
  };

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => key !== 'viewType' && filters[key as keyof FilterState]
  ).length;

  const containerBase = compact ? 'p-4' : 'p-6';
  const containerStyle =
    variant === 'subtle'
      ? 'rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-gray-200'
      : 'rounded-[24px] bg-white shadow-sm';

  return (
    <div className={cn(containerBase, containerStyle, className)}>
      {/* View Type Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'projects', 'auctions'] as const).map((type) => (
            <Button
              key={type}
              onClick={() => {
                setFilters((prev) => ({ ...prev, viewType: type }));
                if (type === 'auctions') {
                  handleFilterChange('status', 'IN_AUCTION');
                } else if (type === 'projects') {
                  handleFilterChange('status', '');
                  setFilters((prev) => {
                    const newFilters = { ...prev, viewType: type };
                    delete newFilters.status;
                    return newFilters;
                  });
                } else {
                  handleFilterChange('status', '');
                }
              }}
              className={cn('uppercase tracking-wider text-xs', filters.viewType === type ? '' : 'text-[#666666]')}
              variant={filters.viewType === type ? 'primary' : 'secondary'}
              size={compact ? 'sm' : 'md'}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold text-[#666666]"
          variant="secondary"
          size={compact ? 'sm' : 'md'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search projects, innovations, technologies..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', (e.target as HTMLInputElement).value)}
            className={cn('w-full pl-12 pr-4', compact ? 'py-3' : 'py-4')}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Status Filter */}
          <FilterSelect
            label="Status"
            value={filters.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
            options={[
              { value: '', label: 'All Status' },
              ...Object.entries(PROJECT_STATUS_LABELS).map(([key, label]) => ({
                value: key,
                label,
              })),
            ]}
          />

          {/* Category Filter */}
          <FilterSelect
            label="Category"
            value={filters.category || ''}
            onChange={(value) => handleFilterChange('category', value)}
            options={[
              { value: '', label: 'All Categories' },
              ...Object.entries(PROJECT_CATEGORIES).map(([key, label]) => ({
                value: key,
                label,
              })),
            ]}
          />

          {/* Country Filter */}
          <FilterSelect
            label="Country"
            value={filters.country || ''}
            onChange={(value) => handleFilterChange('country', value)}
            options={[
              { value: '', label: 'All Countries' },
              ...countries.map((country) => ({
                value: country,
                label: country,
              })),
            ]}
          />

          {/* Proposal Type Filter */}
          <FilterSelect
            label="Proposal Type"
            value={filters.proposalType || ''}
            onChange={(value) => handleFilterChange('proposalType', value)}
            options={[
              { value: '', label: 'All Types' },
              ...proposalTypes,
            ]}
          />
        </div>
      )}

      {/* Active Filters & Reset */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (key === 'viewType' || !value) return null;
              
              let displayValue = value;
              if (key === 'status') displayValue = PROJECT_STATUS_LABELS[value as ProjectStatus];
              if (key === 'category') displayValue = PROJECT_CATEGORIES[value as ProjectCategory];
              if (key === 'proposalType') displayValue = proposalTypes.find(p => p.value === value)?.label || value;

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm font-semibold ring-1 ring-[#D4AF37]/20"
                >
                  {key === 'search' ? `"${displayValue}"` : displayValue}
                  <button
                    onClick={() => handleFilterChange(key as keyof FilterState, '')}
                    className="hover:text-[#B8941F]"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-semibold text-[#E74C3C] hover:text-[#C0392B] transition-colors"
          >
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#666666] uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-[16px] border-2 border-transparent bg-white text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer"
        style={{ boxShadow: 'var(--neo-shadow)' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { FilterBar };

