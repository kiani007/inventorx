# InventorX - Clean Architecture with Atomic Design

## 🏗️ Architecture Overview

This Next.js application is built using **Clean Architecture** principles combined with the **Atomic Design** pattern for component organization.

### Clean Architecture Layers

```
src/
├── core/                   # Business logic & domain
│   ├── domain/            # Domain entities & business rules
│   ├── usecases/          # Application-specific business logic
│   └── repositories/      # Data layer interfaces
├── infrastructure/        # External services & implementations
│   ├── api/              # API clients
│   ├── database/         # Database connections
│   └── services/         # Third-party services
└── presentation/         # UI Layer (Atomic Design)
```

### Atomic Design Structure

```
presentation/
├── atoms/               # Basic UI building blocks
│   ├── Button/         # Buttons with variants
│   ├── Input/          # Form inputs
│   └── Text/           # Typography components
├── molecules/          # Simple component groups
│   ├── Card/           # Card components
│   └── SearchBar/      # Search functionality
├── organisms/          # Complex UI sections
│   ├── Header/         # Site header
│   └── Footer/         # Site footer
├── templates/          # Page layouts
│   └── MainLayout/     # Main page template
└── pages/             # Complete page components
    └── HomePage/      # Homepage implementation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Key Features

### 1. **Clean Architecture Implementation**

- **Domain Layer**: Contains business entities and rules
  - `Product` entity with business logic
  - `User` entity with role management
  
- **Use Cases**: Application-specific business rules
  - `GetAllProductsUseCase`: Retrieve products
  - `CreateProductUseCase`: Create new products
  - `SearchProductsUseCase`: Search functionality

- **Repository Pattern**: Abstraction for data access
  - `ProductRepository` interface
  - `MockProductRepository` implementation

### 2. **Atomic Design Components**

- **Atoms**: Reusable basic components
  - Button with multiple variants (primary, secondary, danger, ghost, link)
  - Input with error states
  - Text with typography variants

- **Molecules**: Combinations of atoms
  - Card with title, description, and footer
  - SearchBar with input and button

- **Organisms**: Complex sections
  - Header with navigation and mobile menu
  - Footer with links and social media

- **Templates**: Page layouts
  - MainLayout with header and footer

### 3. **TypeScript Configuration**

Path aliases configured for clean imports:
```typescript
import { Button } from '@/presentation/atoms';
import { ProductEntity } from '@/core/domain/entities/Product';
```

### 4. **Styling**

- Tailwind CSS for utility-first styling
- Class Variance Authority (CVA) for component variants
- Responsive design with mobile-first approach

## 🔧 Development Guidelines

### Adding New Components

1. **Atoms**: Create in `src/presentation/atoms/`
2. **Molecules**: Create in `src/presentation/molecules/`
3. **Organisms**: Create in `src/presentation/organisms/`

### Adding Business Logic

1. **Entities**: Add to `src/core/domain/entities/`
2. **Use Cases**: Add to `src/core/usecases/`
3. **Repositories**: Define interfaces in `src/core/repositories/`

### Dependency Flow

```
Presentation Layer → Use Cases → Domain Layer
         ↓              ↓
   Infrastructure   Repositories
```

## 🎯 Benefits

1. **Separation of Concerns**: Business logic is independent of UI
2. **Testability**: Each layer can be tested in isolation
3. **Scalability**: Easy to add new features without affecting existing code
4. **Reusability**: Atomic components can be reused throughout the app
5. **Maintainability**: Clear structure makes code easy to understand

## 📝 Example Usage

### Using a Use Case

```typescript
const repository = new MockProductRepository();
const useCase = new GetAllProductsUseCase(repository);
const products = await useCase.execute();
```

### Using Atomic Components

```tsx
import { Button, Text } from '@/presentation/atoms';
import { Card } from '@/presentation/molecules';

<Card title="Product" description="Description">
  <Text variant="body">Content</Text>
  <Button variant="primary">Action</Button>
</Card>
```

## 🔄 Next Steps

1. Add authentication system
2. Implement real API integration
3. Add state management (Redux/Zustand)
4. Add unit and integration tests
5. Implement CI/CD pipeline
6. Add internationalization
7. Implement error boundaries
8. Add loading states and skeletons

## 📚 Resources

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)