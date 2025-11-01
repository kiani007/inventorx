import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogDetailPage } from '@/presentation/pages';
import { MockBlogRepository } from '@/infrastructure/repositories/MockBlogRepository';
import { GetBlogPostBySlugUseCase, GetAllBlogPostsUseCase } from '@/core/usecases/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts at build time
export async function generateStaticParams() {
  const blogRepository = new MockBlogRepository();
  const getAllBlogPostsUseCase = new GetAllBlogPostsUseCase(blogRepository);
  
  const posts = await getAllBlogPostsUseCase.execute();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blogRepository = new MockBlogRepository();
  const getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(blogRepository);
  
  const { slug } = await params;
  const post = await getBlogPostBySlugUseCase.execute(slug);

  if (!post) {
    return {
      title: 'Post Not Found | InventorX',
    };
  }

  return {
    title: `${post.title} | InventorX Blog`,
    description: post.excerpt,
    keywords: [post.category.title, ...post.tags],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      url: `https://inventorx.com/blog/${post.slug}`,
      images: [
        {
          url: post.featuredImage.url,
          width: 1200,
          height: 630,
          alt: post.featuredImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage.url],
    },
  };
}

// Enable ISR - Revalidate every hour
export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogRepository = new MockBlogRepository();
  const getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(blogRepository);
  
  const { slug } = await params;
  const post = await getBlogPostBySlugUseCase.execute(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailPage slug={slug} />;
}

