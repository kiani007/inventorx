import { BlogRepository } from '../../repositories/BlogRepository';
import { BlogCategory } from '../../domain/entities/BlogCategory';

export class GetBlogCategoriesUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(): Promise<BlogCategory[]> {
    return await this.blogRepository.getAllCategories();
  }
}

