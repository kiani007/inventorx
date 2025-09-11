import { Product } from '@/core/domain/entities/Product';
import { ProductRepository } from '@/core/repositories/ProductRepository';

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(category?: string): Promise<Product[]> {
    if (category) {
      return await this.productRepository.findByCategory(category);
    }
    return await this.productRepository.findAll();
  }
}