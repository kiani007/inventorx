import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { BlogRepository, BlogFilters } from '@/core/repositories/BlogRepository';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { BlogCategory } from '@/core/domain/entities/BlogCategory';

// Initialize Sanity client
const sanityClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads (set to false for fresh data)
});

// Image URL builder (ready for use when needed)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const builder = imageUrlBuilder(sanityClient);

export class SanityBlogRepository implements BlogRepository {
  private client: SanityClient;

  constructor() {
    this.client = sanityClient;
  }

  async getAll(filters?: BlogFilters): Promise<BlogPost[]> {
    let query = `*[_type == "blogPost"`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {};

    // Build filter conditions
    const conditions: string[] = [];

    if (filters?.category) {
      conditions.push(`category->slug.current == $category`);
      params.category = filters.category;
    }

    if (filters?.tag) {
      conditions.push(`$tag in tags`);
      params.tag = filters.tag;
    }

    if (filters?.search) {
      conditions.push(`(title match $search || excerpt match $search)`);
      params.search = `*${filters.search}*`;
    }

    if (filters?.featured !== undefined) {
      conditions.push(`isFeatured == $featured`);
      params.featured = filters.featured;
    }

    if (filters?.dateFrom) {
      conditions.push(`publishedAt >= $dateFrom`);
      params.dateFrom = filters.dateFrom;
    }

    if (filters?.dateTo) {
      conditions.push(`publishedAt <= $dateTo`);
      params.dateTo = filters.dateTo;
    }

    // Add conditions to query
    if (conditions.length > 0) {
      query += ` && ${conditions.join(' && ')}`;
    }

    query += `] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      author->{
        _id,
        name,
        avatar {
          asset->{
            url
          }
        },
        role,
        bio,
        email
      },
      category->{
        _id,
        title,
        slug,
        description
      },
      tags,
      publishedAt,
      _updatedAt,
      readTime,
      isFeatured,
      "views": 0,
      "likes": 0
    } | order(isFeatured desc, publishedAt desc)`;

    const results = await this.client.fetch(query, params);
    return results.map(this.mapToBlogPost);
  }

  async getById(id: string): Promise<BlogPost | null> {
    const query = `*[_type == "blogPost" && _id == $id][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      author->{
        _id,
        name,
        avatar {
          asset->{
            url
          }
        },
        role,
        bio,
        email
      },
      category->{
        _id,
        title,
        slug,
        description
      },
      tags,
      publishedAt,
      _updatedAt,
      readTime,
      isFeatured,
      "views": 0,
      "likes": 0
    }`;

    const result = await this.client.fetch(query, { id });
    return result ? this.mapToBlogPost(result) : null;
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      author->{
        _id,
        name,
        avatar {
          asset->{
            url
          }
        },
        role,
        bio,
        email
      },
      category->{
        _id,
        title,
        slug,
        description
      },
      tags,
      publishedAt,
      _updatedAt,
      readTime,
      isFeatured,
      "views": 0,
      "likes": 0
    }`;

    const result = await this.client.fetch(query, { slug });
    return result ? this.mapToBlogPost(result) : null;
  }

  async getFeatured(limit: number = 3): Promise<BlogPost[]> {
    const query = `*[_type == "blogPost" && isFeatured == true] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      author->{
        _id,
        name,
        avatar {
          asset->{
            url
          }
        },
        role,
        bio,
        email
      },
      category->{
        _id,
        title,
        slug,
        description
      },
      tags,
      publishedAt,
      _updatedAt,
      readTime,
      isFeatured,
      "views": 0,
      "likes": 0
    } | order(publishedAt desc) [0...${limit}]`;

    const results = await this.client.fetch(query);
    return results.map(this.mapToBlogPost);
  }

  async getRelated(postId: string, limit: number = 3): Promise<BlogPost[]> {
    // First get the current post to find its category and tags
    const currentPost = await this.getById(postId);
    if (!currentPost) return [];

    const query = `*[_type == "blogPost" && _id != $postId && (
      category._ref == $categoryId ||
      count((tags[])[@ in $tags]) > 0
    )] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      author->{
        _id,
        name,
        avatar {
          asset->{
            url
          }
        },
        role,
        bio,
        email
      },
      category->{
        _id,
        title,
        slug,
        description
      },
      tags,
      publishedAt,
      _updatedAt,
      readTime,
      isFeatured,
      "views": 0,
      "likes": 0
    } | order(publishedAt desc) [0...${limit}]`;

    const results = await this.client.fetch(query, {
      postId,
      categoryId: currentPost.category.id,
      tags: currentPost.tags,
    });

    return results.map(this.mapToBlogPost);
  }

  async getAllCategories(): Promise<BlogCategory[]> {
    const query = `*[_type == "blogCategory"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }`;

    const results = await this.client.fetch(query);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return results.map((cat: any) => ({
      id: cat._id,
      title: cat.title,
      slug: cat.slug.current,
      description: cat.description,
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToBlogPost(data: any): BlogPost {
    return {
      id: data._id,
      title: data.title,
      slug: data.slug.current,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: {
        url: data.featuredImage.asset.url,
        alt: data.featuredImage.alt || data.title,
      },
      author: {
        id: data.author._id,
        name: data.author.name,
        avatar: data.author.avatar.asset.url,
        bio: data.author.bio,
        role: data.author.role,
        email: data.author.email,
      },
      category: {
        id: data.category._id,
        title: data.category.title,
        slug: data.category.slug.current,
        description: data.category.description,
      },
      tags: data.tags || [],
      publishedAt: new Date(data.publishedAt),
      updatedAt: new Date(data._updatedAt),
      readTime: data.readTime,
      isFeatured: data.isFeatured,
      views: data.views,
      likes: data.likes,
    };
  }
}

