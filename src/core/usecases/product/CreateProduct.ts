import { Product } from '@/core/domain/entities/Product';
import { ProductRepository } from '@/core/repositories/ProductRepository';

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    // Validate input
    if (data.price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (data.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    if (!data.name || data.name.trim() === '') {
      throw new Error('Product name is required');
    }

    // Create product
    return await this.productRepository.create(data);
  }
}