import { BlogRepository, BlogFilters } from '@/core/repositories/BlogRepository';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { BlogAuthor } from '@/core/domain/entities/BlogAuthor';
import { BlogCategory } from '@/core/domain/entities/BlogCategory';

// Mock Authors
const mockAuthors: BlogAuthor[] = [
  {
    id: 'author-1',
    name: 'Sarah Mitchell',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Innovation strategist and technology writer with 10+ years of experience in deep tech.',
    role: 'Senior Editor',
    email: 'sarah.mitchell@inventorx.com',
  },
  {
    id: 'author-2',
    name: 'Dr. James Chen',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Venture capitalist and former research scientist specializing in biotechnology investments.',
    role: 'Investment Analyst',
    email: 'james.chen@inventorx.com',
  },
  {
    id: 'author-3',
    name: 'Maria Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'IP attorney and startup advisor helping inventors protect their innovations.',
    role: 'Legal Contributor',
    email: 'maria.rodriguez@inventorx.com',
  },
  {
    id: 'author-4',
    name: 'Alex Thompson',
    avatar: 'https://i.pravatar.cc/150?img=13',
    bio: 'Serial entrepreneur and innovation coach with multiple successful exits.',
    role: 'Guest Writer',
    email: 'alex.thompson@innovator.com',
  },
];

// Mock Categories
const mockCategories: BlogCategory[] = [
  {
    id: 'cat-1',
    title: 'Innovation',
    slug: 'innovation',
    description: 'Latest trends and insights in innovation and R&D',
  },
  {
    id: 'cat-2',
    title: 'Technology',
    slug: 'technology',
    description: 'Deep tech, AI, and emerging technologies',
  },
  {
    id: 'cat-3',
    title: 'Investment',
    slug: 'investment',
    description: 'Investment strategies and funding insights',
  },
  {
    id: 'cat-4',
    title: 'Entrepreneurship',
    slug: 'entrepreneurship',
    description: 'Building and scaling innovative businesses',
  },
  {
    id: 'cat-5',
    title: 'Success Stories',
    slug: 'success-stories',
    description: 'Real-world success stories from inventors and investors',
  },
  {
    id: 'cat-6',
    title: 'Legal & IP',
    slug: 'legal-ip',
    description: 'Intellectual property and legal guidance',
  },
];

// Mock Blog Posts
const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Future of Medical Innovation: How AI is Transforming Healthcare',
    slug: 'future-medical-innovation-ai-healthcare',
    excerpt: 'Discover how artificial intelligence is revolutionizing medical diagnostics, drug discovery, and patient care in ways we never imagined possible.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      alt: 'Medical AI technology illustration',
    },
    author: mockAuthors[1],
    category: mockCategories[1],
    tags: ['AI', 'Healthcare', 'MedTech', 'Innovation'],
    publishedAt: new Date('2024-10-28'),
    updatedAt: new Date('2024-10-28'),
    readTime: 8,
    isFeatured: true,
    views: 3421,
    likes: 234,
  },
  {
    id: 'post-2',
    title: '5 Essential Steps to Protect Your Invention with Patents',
    slug: 'essential-steps-protect-invention-patents',
    excerpt: 'A comprehensive guide to navigating the patent process, from provisional applications to international protection strategies.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
      alt: 'Legal documents and patents',
    },
    author: mockAuthors[2],
    category: mockCategories[5],
    tags: ['Patents', 'IP', 'Legal', 'Protection'],
    publishedAt: new Date('2024-10-25'),
    updatedAt: new Date('2024-10-25'),
    readTime: 12,
    isFeatured: true,
    views: 2876,
    likes: 189,
  },
  {
    id: 'post-3',
    title: 'From Garage to Global: The Journey of a Successful Green Energy Startup',
    slug: 'garage-to-global-green-energy-startup-journey',
    excerpt: 'An inspiring story of how one inventor turned a backyard experiment into a multi-million dollar renewable energy company.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
      alt: 'Solar panel installation',
    },
    author: mockAuthors[3],
    category: mockCategories[4],
    tags: ['Green Energy', 'Success Story', 'Startup', 'Entrepreneurship'],
    publishedAt: new Date('2024-10-22'),
    updatedAt: new Date('2024-10-22'),
    readTime: 10,
    isFeatured: false,
    views: 1987,
    likes: 156,
  },
  {
    id: 'post-4',
    title: 'Understanding Venture Capital: What Investors Look For in Deep Tech',
    slug: 'understanding-venture-capital-investors-deep-tech',
    excerpt: 'Learn the key factors that venture capitalists evaluate when considering investments in deep technology innovations.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      alt: 'Business meeting and investment discussion',
    },
    author: mockAuthors[1],
    category: mockCategories[2],
    tags: ['Venture Capital', 'Investment', 'Deep Tech', 'Funding'],
    publishedAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-20'),
    readTime: 9,
    isFeatured: true,
    views: 4123,
    likes: 312,
  },
  {
    id: 'post-5',
    title: 'The Rise of Biotech: Innovations Shaping Tomorrow\'s Medicine',
    slug: 'rise-of-biotech-innovations-shaping-medicine',
    excerpt: 'Explore the cutting-edge biotechnology breakthroughs that promise to revolutionize how we treat diseases and extend human life.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200',
      alt: 'Biotechnology laboratory',
    },
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: ['Biotech', 'Medicine', 'Innovation', 'Healthcare'],
    publishedAt: new Date('2024-10-18'),
    updatedAt: new Date('2024-10-18'),
    readTime: 11,
    isFeatured: false,
    views: 2654,
    likes: 201,
  },
  {
    id: 'post-6',
    title: 'Navigating the Innovation Marketplace: A Guide for First-Time Inventors',
    slug: 'navigating-innovation-marketplace-guide-first-time-inventors',
    excerpt: 'Essential tips and strategies for inventors looking to commercialize their innovations and connect with the right investors.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
      alt: 'Business strategy and planning',
    },
    author: mockAuthors[3],
    category: mockCategories[3],
    tags: ['Marketplace', 'Inventors', 'Commercialization', 'Strategy'],
    publishedAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-15'),
    readTime: 7,
    isFeatured: false,
    views: 1876,
    likes: 134,
  },
  {
    id: 'post-7',
    title: 'Quantum Computing: The Next Frontier in Technology Investment',
    slug: 'quantum-computing-next-frontier-technology-investment',
    excerpt: 'Why quantum computing is attracting billions in investment and what it means for the future of innovation.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
      alt: 'Quantum computing visualization',
    },
    author: mockAuthors[0],
    category: mockCategories[1],
    tags: ['Quantum Computing', 'Technology', 'Investment', 'Future Tech'],
    publishedAt: new Date('2024-10-12'),
    updatedAt: new Date('2024-10-12'),
    readTime: 13,
    isFeatured: true,
    views: 5234,
    likes: 421,
  },
  {
    id: 'post-8',
    title: 'Building Strategic Partnerships: Lessons from Successful Inventor-Investor Relationships',
    slug: 'building-strategic-partnerships-inventor-investor-relationships',
    excerpt: 'Real-world examples of how strong partnerships between inventors and investors create extraordinary value.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200',
      alt: 'Business handshake and partnership',
    },
    author: mockAuthors[3],
    category: mockCategories[4],
    tags: ['Partnerships', 'Success Stories', 'Collaboration', 'Investment'],
    publishedAt: new Date('2024-10-10'),
    updatedAt: new Date('2024-10-10'),
    readTime: 9,
    isFeatured: false,
    views: 2234,
    likes: 178,
  },
  {
    id: 'post-9',
    title: 'The Economics of Innovation: Understanding Valuation in Early-Stage Tech',
    slug: 'economics-innovation-understanding-valuation-early-stage-tech',
    excerpt: 'A deep dive into how innovations are valued, from patent worth to market potential assessment.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
      alt: 'Financial charts and analysis',
    },
    author: mockAuthors[1],
    category: mockCategories[2],
    tags: ['Valuation', 'Economics', 'Investment', 'Early-Stage'],
    publishedAt: new Date('2024-10-08'),
    updatedAt: new Date('2024-10-08'),
    readTime: 14,
    isFeatured: false,
    views: 3098,
    likes: 245,
  },
  {
    id: 'post-10',
    title: 'Space Tech Revolution: Private Innovation Beyond Earth\'s Atmosphere',
    slug: 'space-tech-revolution-private-innovation-beyond-earth',
    excerpt: 'How private inventors and investors are driving the new space race and commercializing the final frontier.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mock content - will be replaced with Sanity Portable Text' }],
      },
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200',
      alt: 'Space satellite and Earth',
    },
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: ['Space Tech', 'Innovation', 'Private Space', 'Future'],
    publishedAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-10-05'),
    readTime: 10,
    isFeatured: true,
    views: 4567,
    likes: 389,
  },
];

export class MockBlogRepository implements BlogRepository {
  private posts: BlogPost[] = mockBlogPosts;
  private categories: BlogCategory[] = mockCategories;

  async getAll(filters?: BlogFilters): Promise<BlogPost[]> {
    let filtered = [...this.posts];

    if (filters) {
      if (filters.category) {
        const categorySlug = filters.category.toLowerCase();
        filtered = filtered.filter(p => p.category.slug === categorySlug);
      }
      if (filters.tag) {
        const tagLower = filters.tag.toLowerCase();
        filtered = filtered.filter(p => 
          p.tags.some(tag => tag.toLowerCase() === tagLower)
        );
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.excerpt.toLowerCase().includes(searchLower) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      if (filters.featured !== undefined) {
        filtered = filtered.filter(p => p.isFeatured === filters.featured);
      }
      if (filters.dateFrom) {
        filtered = filtered.filter(p => new Date(p.publishedAt) >= new Date(filters.dateFrom!));
      }
      if (filters.dateTo) {
        filtered = filtered.filter(p => new Date(p.publishedAt) <= new Date(filters.dateTo!));
      }
    }

    // Sort by featured first, then by date
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return filtered;
  }

  async getById(id: string): Promise<BlogPost | null> {
    return this.posts.find(p => p.id === id) || null;
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    return this.posts.find(p => p.slug === slug) || null;
  }

  async getFeatured(limit: number = 3): Promise<BlogPost[]> {
    return this.posts
      .filter(p => p.isFeatured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  async getRelated(postId: string, limit: number = 3): Promise<BlogPost[]> {
    const post = await this.getById(postId);
    if (!post) return [];

    // Find posts with same category or similar tags
    const related = this.posts
      .filter(p => p.id !== postId)
      .filter(p => 
        p.category.id === post.category.id ||
        p.tags.some(tag => post.tags.includes(tag))
      )
      .sort((a, b) => {
        // Prioritize same category
        if (a.category.id === post.category.id && b.category.id !== post.category.id) return -1;
        if (a.category.id !== post.category.id && b.category.id === post.category.id) return 1;
        
        // Then by date
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      })
      .slice(0, limit);

    return related;
  }

  async getAllCategories(): Promise<BlogCategory[]> {
    return this.categories;
  }
}

