/* stylelint-disable */
import { Investor } from '@/core/domain/entities/Investor';

export interface InvestorFilters {
  search?: string;
  category?: string;
  country?: string;
  verified?: boolean;
  min?: number;
  max?: number;
  sort?: 'MOST_ACTIVE' | 'MOST_PROJECTS' | 'HIGHEST_SUCCESS';
  page?: number;
  pageSize?: number;
}

export interface InvestorRepository {
  getAll(filters?: InvestorFilters): Promise<{ items: Investor[]; total: number }>; // pagination handled by filters
  getById(id: string): Promise<Investor | null>;
  search(query: string, page?: number, pageSize?: number): Promise<{ items: Investor[]; total: number }>;
  getFeatured(limit?: number): Promise<Investor[]>;
}


