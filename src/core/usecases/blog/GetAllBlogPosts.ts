import { BlogRepository, BlogFilters } from '../../repositories/BlogRepository';
import { BlogPost } from '../../domain/entities/BlogPost';

export class GetAllBlogPostsUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(filters?: BlogFilters): Promise<BlogPost[]> {
    return await this.blogRepository.getAll(filters);
  }
}

