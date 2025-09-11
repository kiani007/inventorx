import { Product } from '@/core/domain/entities/Product';
import { ProductRepository } from '@/core/repositories/ProductRepository';

export class SearchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') {
      return [];
    }
    
    return await this.productRepository.search(query.trim());
  }
}