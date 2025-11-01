import { BlogRepository } from '../../repositories/BlogRepository';
import { BlogPost } from '../../domain/entities/BlogPost';

export class GetRelatedBlogPostsUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(postId: string, limit?: number): Promise<BlogPost[]> {
    return await this.blogRepository.getRelated(postId, limit);
  }
}

