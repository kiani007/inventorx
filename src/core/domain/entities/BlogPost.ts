import { BlogAuthor } from './BlogAuthor';
import { BlogCategory } from './BlogCategory';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Portable Text from Sanity (typed as any for flexibility)
  featuredImage: {
    url: string;
    alt: string;
  };
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  readTime: number; // minutes
  isFeatured: boolean;
  views: number;
  likes: number;
}

