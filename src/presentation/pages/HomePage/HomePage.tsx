'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/presentation/templates';
import { Text, Button } from '@/presentation/atoms';
import { Card, SearchBar } from '@/presentation/molecules';
import { MockProductRepository } from '@/infrastructure/repositories/MockProductRepository';
import { GetAllProductsUseCase } from '@/core/usecases/product/GetAllProducts';
import { SearchProductsUseCase } from '@/core/usecases/product/SearchProducts';
import { Product } from '@/core/domain/entities/Product';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize repository and use cases
  const productRepository = new MockProductRepository();
  const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
  const searchProductsUseCase = new SearchProductsUseCase(productRepository);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getAllProductsUseCase.execute();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const searchResults = await searchProductsUseCase.execute(query);
      setFilteredProducts(searchResults);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Text variant="h1" className="text-white mb-6">
              Welcome to InventorX
            </Text>
            <Text variant="body" className="text-white/90 text-lg mb-8">
              Experience the power of clean architecture with Atomic Design.
              Built with Next.js, TypeScript, and modern best practices.
            </Text>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Text variant="h2" className="text-center mb-12">
            Architecture Features
          </Text>
          <div className="grid md:grid-cols-3 gap-8">
            <Card
              title="Clean Architecture"
              description="Separation of concerns with domain, application, and infrastructure layers"
              variant="elevated"
            >
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Domain Entities</li>
                <li>• Use Cases</li>
                <li>• Repository Pattern</li>
                <li>• Dependency Injection</li>
              </ul>
            </Card>
            <Card
              title="Atomic Design"
              description="Component hierarchy from atoms to templates for maximum reusability"
              variant="elevated"
            >
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Atoms: Basic building blocks</li>
                <li>• Molecules: Simple components</li>
                <li>• Organisms: Complex sections</li>
                <li>• Templates: Page layouts</li>
              </ul>
            </Card>
            <Card
              title="TypeScript & Next.js"
              description="Type-safe development with the latest Next.js features"
              variant="elevated"
            >
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Full TypeScript support</li>
                <li>• App Router</li>
                <li>• Server Components</li>
                <li>• Path aliases</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Text variant="h2" className="text-center mb-4">
              Sample Products
            </Text>
            <Text variant="body" color="secondary" className="text-center mb-8">
              Demonstrating the use of domain entities and use cases
            </Text>
            <div className="max-w-md mx-auto">
              <SearchBar
                placeholder="Search products..."
                onSearch={handleSearch}
                variant="default"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <Text variant="body" color="secondary">
                Loading products...
              </Text>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  footer={
                    <div className="flex justify-between items-center">
                      <Text variant="h4" color="primary">
                        ${product.price}
                      </Text>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  }
                  variant="outlined"
                >
                  <div className="space-y-2">
                    <Text variant="small" color="secondary">
                      Category: {product.category}
                    </Text>
                    <Text variant="small" color={product.stock > 0 ? 'success' : 'danger'}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Text variant="h2" className="text-white mb-6">
            Ready to Build Something Amazing?
          </Text>
          <Text variant="body" className="text-white/80 mb-8 max-w-2xl mx-auto">
            This architecture provides a solid foundation for scalable, maintainable applications.
            Start building with confidence using clean architecture and atomic design principles.
          </Text>
          <Button size="lg" variant="primary">
            Start Your Project
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};