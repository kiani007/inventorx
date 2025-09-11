import { Product, ProductEntity } from '@/core/domain/entities/Product';
import { ProductRepository } from '@/core/repositories/ProductRepository';

export class MockProductRepository implements ProductRepository {
  private products: Map<string, Product> = new Map();

  constructor() {
    // Initialize with some mock data
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const mockProducts = [
      new ProductEntity(
        '1',
        'Smart Watch Pro',
        'Advanced fitness tracking and health monitoring smartwatch',
        299.99,
        'Electronics',
        50,
        '/images/smartwatch.jpg'
      ),
      new ProductEntity(
        '2',
        'Wireless Headphones',
        'Premium noise-cancelling wireless headphones',
        199.99,
        'Electronics',
        30,
        '/images/headphones.jpg'
      ),
      new ProductEntity(
        '3',
        'Laptop Stand',
        'Ergonomic aluminum laptop stand for better posture',
        49.99,
        'Accessories',
        100,
        '/images/laptop-stand.jpg'
      ),
      new ProductEntity(
        '4',
        'USB-C Hub',
        'Multi-port USB-C hub with HDMI and SD card reader',
        79.99,
        'Accessories',
        75,
        '/images/usb-hub.jpg'
      ),
    ];

    mockProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const id = (this.products.size + 1).toString();
    const product = new ProductEntity(
      id,
      data.name,
      data.description,
      data.price,
      data.category,
      data.stock,
      data.imageUrl
    );
    this.products.set(id, product);
    return product;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...product, ...data, updatedAt: new Date() };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    if (!this.products.has(id)) {
      throw new Error(`Product with id ${id} not found`);
    }
    this.products.delete(id);
  }

  async search(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }
}