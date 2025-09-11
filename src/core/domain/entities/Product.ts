export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public stock: number,
    public imageUrl?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  isInStock(): boolean {
    return this.stock > 0;
  }

  updateStock(quantity: number): void {
    this.stock = quantity;
    this.updatedAt = new Date();
  }

  updatePrice(price: number): void {
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = price;
    this.updatedAt = new Date();
  }
}