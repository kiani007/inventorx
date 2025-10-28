import { Project, ProjectStatus, ProjectCategory } from '../domain/entities/Project';

export interface ProjectFilters {
  status?: ProjectStatus;
  category?: ProjectCategory;
  country?: string;
  isAuction?: boolean;
  proposalType?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface ProjectRepository {
  getAll(filters?: ProjectFilters): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  search(query: string): Promise<Project[]>;
  getFeatured(): Promise<Project[]>;
  getTrending(): Promise<Project[]>;
  getRelated(projectId: string, limit?: number): Promise<Project[]>;
}

