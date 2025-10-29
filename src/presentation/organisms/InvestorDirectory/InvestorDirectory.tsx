/* stylelint-disable */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Investor } from '@/core/domain/entities/Investor';
import { MockInvestorRepository } from '@/infrastructure/repositories/MockInvestorRepository';
import { GetInvestorsUseCase } from '@/core/usecases/investor/GetInvestors';
import { InvestorCard, Pagination, InvestorRow, InvestorPreviewPane } from '@/presentation/molecules';
import { Text, Tabs, TabsList, TabsTrigger, EmptyState } from '@/presentation/atoms';
import { FilterControls } from '@/presentation/molecules';
import { AsyncState } from '@/shared/types';

export interface InvestorDirectoryProps {
  initialFilters?: Record<string, string | boolean | undefined>;
}

export const InvestorDirectory: React.FC<InvestorDirectoryProps> = ({ initialFilters = {} }) => {
  const [state, setState] = useState<AsyncState<{ items: Investor[]; total: number }>>({ loading: true });
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [filters, setFilters] = useState<Record<string, string | boolean | undefined>>({
    viewType: 'all',
    layout: 'split',
    ...initialFilters,
  });
  const [selectedInvestorId, setSelectedInvestorId] = useState<string | undefined>(undefined);

  const repo = useMemo(() => new MockInvestorRepository(), []);
  const getInvestors = useMemo(() => new GetInvestorsUseCase(repo), [repo]);

  useEffect(() => {
    const run = async () => {
      setState({ loading: true });
      
      // Build filters from state
      const category = filters.category && filters.category !== 'ALL' ? String(filters.category) : undefined;
      const country = filters.country ? String(filters.country) : undefined;
      const search = filters.search ? String(filters.search) : undefined;
      const min = filters.min ? Number(filters.min) : undefined;
      const sort = (filters.sort || 'MOST_ACTIVE') as any;
      
      // Handle viewType
      let verified: boolean | undefined = undefined;
      if (filters.viewType === 'verified') {
        verified = true;
      }

      const result = await getInvestors.execute({
        page,
        pageSize,
        search,
        category,
        country,
        verified,
        sort,
        min,
      });
      setState({ loading: false, data: result });
      if (!selectedInvestorId && result.items.length > 0) {
        setSelectedInvestorId(result.items[0].id);
      }
    };
    run();
  }, [filters, page, pageSize, getInvestors]);

  const handleFilterChange = (name: string, value: string | string[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setFilters((prev) => ({
      ...prev,
      [name]: newValue || undefined,
    }));
    // Reset to page 1 when filters change
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ viewType: filters.viewType });
    setPage(1);
  };

  const totalPages = state.data ? Math.ceil(state.data.total / pageSize) : 0;

  return (
    <section className="py-12 bg-linear-to-b from-transparent to-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Tabs for view type */}
          <Tabs
            value={String(filters.viewType || 'all')}
            onValueChange={(v) => {
              setFilters((prev) => ({ ...prev, viewType: v }));
              setPage(1);
            }}
          >
            <TabsList>
              <TabsTrigger value="all">All Investors</TabsTrigger>
              <TabsTrigger value="verified">Verified Only</TabsTrigger>
              <TabsTrigger value="active">Most Active</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters */}
          <FilterControls
            fields={[
              { type: 'search', name: 'search', placeholder: 'Search investors, expertise...' },
              {
                type: 'select',
                name: 'category',
                placeholder: 'Category',
                options: [
                  { label: 'All Categories', value: 'ALL' },
                  { label: 'AI/ML', value: 'AI_ML' },
                  { label: 'Medical Tech', value: 'MEDICAL_TECH' },
                  { label: 'Green Energy', value: 'GREEN_ENERGY' },
                  { label: 'Fintech', value: 'FINTECH' },
                  { label: 'Biotech', value: 'BIOTECH' },
                  { label: 'Space Tech', value: 'SPACE_TECH' },
                  { label: 'EdTech', value: 'EDTECH' },
                  { label: 'Robotics', value: 'ROBOTICS' },
                ],
              },
              { type: 'search', name: 'country', placeholder: 'Country (e.g., United States)' },
              {
                type: 'select',
                name: 'sort',
                placeholder: 'Sort by',
                options: [
                  { label: 'Most Active', value: 'MOST_ACTIVE' },
                  { label: 'Most Projects', value: 'MOST_PROJECTS' },
                  { label: 'Highest Success', value: 'HIGHEST_SUCCESS' },
                ],
              },
            ]}
            filterValues={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            compact
          />

          {/* Results */}
          {state.loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
              <Text variant="body" color="secondary">
                Loading investors...
              </Text>
            </div>
          ) : state.data && state.data.items.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <Text variant="body" color="secondary">
                  Showing <span className="font-semibold text-[#1A1A1A]">{state.data.items.length}</span> of{' '}
                  <span className="font-semibold text-[#1A1A1A]">{state.data.total}</span> investors
                </Text>
                <div className="hidden md:flex items-center gap-2">
                  {['split','grid','list'].map((layout) => (
                    <button
                      key={layout}
                      onClick={() => setFilters((p) => ({ ...p, layout }))}
                      className={
                        String(filters.layout) === layout
                          ? 'px-3 py-1.5 rounded-full bg-[#D4AF37] text-white text-sm font-semibold'
                          : 'px-3 py-1.5 rounded-full bg-white text-[#666666] text-sm border border-gray-200 hover:text-[#1A1A1A]'
                      }
                    >
                      {layout.charAt(0).toUpperCase() + layout.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {String(filters.layout) === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {state.data.items.map((inv) => (
                    <InvestorCard key={inv.id} investor={inv} />
                  ))}
                </div>
              )}

              {String(filters.layout) === 'list' && (
                <div className="space-y-3">
                  {state.data.items.map((inv) => (
                    <InvestorRow key={inv.id} investor={inv} onSelect={setSelectedInvestorId} selected={selectedInvestorId === inv.id} />
                  ))}
                </div>
              )}

              {String(filters.layout) === 'split' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-3">
                    {state.data.items.map((inv) => (
                      <InvestorRow key={inv.id} investor={inv} onSelect={setSelectedInvestorId} selected={selectedInvestorId === inv.id} />
                    ))}
                  </div>
                  <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
                    <InvestorPreviewPane investor={state.data.items.find((i) => i.id === selectedInvestorId)} />
                  </div>
                </div>
              )}

              {/* Pagination */}
              <Pagination
                type="page-numbers"
                currentPage={page}
                totalPages={totalPages}
                onNext={() => setPage((p) => p + 1)}
                onPrevious={() => setPage((p) => p - 1)}
                onPageChange={setPage}
              />
            </>
          ) : (
            <EmptyState
              title="No Investors Found"
              description="Try changing filters or search terms"
              icon="no-results"
            />
          )}
        </div>
      </div>
    </section>
  );
};