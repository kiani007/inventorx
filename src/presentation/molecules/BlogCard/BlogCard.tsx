import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Badge } from '@/presentation/atoms/Badge/Badge';
import { AuthorAvatar } from '@/presentation/atoms/AuthorAvatar/AuthorAvatar';
import { ReadTime } from '@/presentation/atoms/ReadTime/ReadTime';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { cn } from '@/shared/utils/cn';

export interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false, className }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className={cn(
          'group h-full bg-white rounded-[40px] overflow-hidden transition-all duration-300',
          'shadow-[var(--neo-shadow)] hover:shadow-[var(--neo-shadow-hover)]',
          'hover:-translate-y-2',
          className
        )}
      >
        {/* Featured Image */}
        <div className={cn('relative overflow-hidden', featured ? 'h-[400px]' : 'h-[280px]')}>
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes={featured ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 400px'}
          />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <Badge variant="featured" size="md">
              {post.category.title}
            </Badge>
          </div>

          {/* Featured Badge */}
          {post.isFeatured && (
            <div className="absolute top-6 right-6">
              <Badge variant="trending" size="md">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn('p-8', featured && 'p-10')}>
          {/* Title */}
          <h3
            className={cn(
              'font-display font-semibold text-[#1A1A1A] mb-4',
              'line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300',
              featured ? 'text-[32px] leading-tight' : 'text-[24px] leading-tight'
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={cn('text-[16px] text-[#666666] mb-6', featured ? 'line-clamp-3' : 'line-clamp-2')}>
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <AuthorAvatar src={post.author.avatar} alt={post.author.name} size="sm" />
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#1A1A1A]">{post.author.name}</span>
                <span className="text-[13px] text-[#999999]">{post.author.role}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-[13px] text-[#999999]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
              <ReadTime minutes={post.readTime} className="text-[13px]" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

