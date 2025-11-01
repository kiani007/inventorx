import { BlogRepository } from '../../repositories/BlogRepository';
import { BlogPost } from '../../domain/entities/BlogPost';

export class GetBlogPostBySlugUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(slug: string): Promise<BlogPost | null> {
    return await this.blogRepository.getBySlug(slug);
  }
}

