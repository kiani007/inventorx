import { BlogPost } from '../domain/entities/BlogPost';
import { BlogCategory } from '../domain/entities/BlogCategory';

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface BlogRepository {
  getAll(filters?: BlogFilters): Promise<BlogPost[]>;
  getById(id: string): Promise<BlogPost | null>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  getFeatured(limit?: number): Promise<BlogPost[]>;
  getRelated(postId: string, limit?: number): Promise<BlogPost[]>;
  getAllCategories(): Promise<BlogCategory[]>;
}

