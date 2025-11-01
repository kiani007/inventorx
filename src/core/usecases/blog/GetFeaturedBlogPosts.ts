import { BlogRepository } from '../../repositories/BlogRepository';
import { BlogPost } from '../../domain/entities/BlogPost';

export class GetFeaturedBlogPostsUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(limit?: number): Promise<BlogPost[]> {
    return await this.blogRepository.getFeatured(limit);
  }
}

