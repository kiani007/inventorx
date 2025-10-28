'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Input, Button, Select } from '@/presentation/atoms';

type FieldType = 'search' | 'select' | 'multi-select' | 'date' | 'date-range';

export interface FilterField {
  type: FieldType;
  name: string;
  placeholder?: string;
  width?: string;
  options?: { value: string | number | boolean; label: string }[];
  value?: string | string[] | number | boolean;
}

export interface FilterControlsProps {
  fields: FilterField[];
  filterValues?: Record<string, string | string[] | number | boolean | undefined>;
  onChange: (name: string, value: string | string[]) => void;
  onReset?: () => void;
  className?: string;
  compact?: boolean;
  minWidth?: number; // px, ensures good UX while still fitting content
}

// Minimal generic inputs; selects can be swapped to shadcn Select later via our atoms
export const FilterControls: React.FC<FilterControlsProps> = ({
  fields,
  filterValues = {},
  onChange,
  onReset,
  className,
  compact = false,
  minWidth = 220,
}) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {fields.map((field) => {
        const width = field.width || undefined;
        const commonProps = {
          className: cn(width, compact ? 'py-2' : 'py-3'),
        };

        switch (field.type) {
          case 'search':
            return (
              <div
                key={field.name}
                className={cn('relative inline-flex', width)}
                style={{ minWidth }}
              >
                <Input
                  placeholder={field.placeholder || 'Search'}
                  value={(filterValues[field.name] ?? '') as string}
                  onChange={(e) => onChange(field.name, (e.target as HTMLInputElement).value)}
                  className={cn('pl-10', compact ? 'py-2' : 'py-3')}
                  look="flat"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            );
          case 'select':
            return (
              <Select
                key={field.name}
                name={field.name}
                value={(filterValues[field.name] ?? '') as string}
                onChange={onChange}
                placeholder={field.placeholder || 'All'}
                options={(field.options || []) as { value: string | number | boolean; label: string }[]}
                className={cn('w-auto', width)}
                variant="neomorphic"
                // ensure a reasonable minimum so layout stays elegant
                // SelectTrigger uses className above; wrapper div handles min width
              />
            );
          case 'multi-select':
            return (
              <select
                key={field.name}
                multiple
                value={(filterValues[field.name] ?? []) as string[]}
                onChange={(e) =>
                  onChange(
                    field.name,
                    Array.from(e.target.selectedOptions).map((o) => o.value)
                  )
                }
                className={cn(
                  'rounded-xl bg-white text-[14px] text-[#1A1A1A] ring-1 ring-gray-200 focus:ring-2 focus:ring-[#D4AF37]/40 outline-none px-4',
                  compact ? 'py-2' : 'py-3',
                  width
                )}
                style={{ minWidth }}
              >
                {(field.options || []).map((opt) => (
                  <option key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );
          case 'date':
          case 'date-range':
            // Placeholder; can swap in shadcn Calendar later
            return (
              <Input
                key={field.name}
                type="date"
                value={(filterValues[field.name] ?? '') as string}
                onChange={(e) => onChange(field.name, (e.target as HTMLInputElement).value)}
                placeholder={field.placeholder}
                className={cn(width, compact ? 'py-2' : 'py-3')}
              />
            );
          default:
            return <div key={field.name} />;
        }
      })}

      {onReset && (
        <Button variant="secondary" size={compact ? 'sm' : 'md'} onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
};

export type { FieldType };

