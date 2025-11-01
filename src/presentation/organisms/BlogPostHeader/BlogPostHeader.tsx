import React from 'react';
import Image from 'next/image';
import { Calendar, Eye } from 'lucide-react';
import { Badge } from '@/presentation/atoms/Badge/Badge';
import { AuthorAvatar } from '@/presentation/atoms/AuthorAvatar/AuthorAvatar';
import { ReadTime } from '@/presentation/atoms/ReadTime/ReadTime';
import { BlogPost } from '@/core/domain/entities/BlogPost';

export interface BlogPostHeaderProps {
  post: BlogPost;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden shadow-[var(--luxury-shadow)]">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <Badge variant="featured" size="lg">
            {post.category.title}
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto max-w-[900px] px-4">
        {/* Title & Meta */}
        <div className="relative -mt-32 z-10">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[var(--luxury-shadow)]">
            {/* Title */}
            <h1 className="font-display text-[40px] md:text-[56px] font-bold text-[#1A1A1A] leading-tight mb-8">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100">
              {/* Author */}
              <div className="flex items-center gap-3">
                <AuthorAvatar src={post.author.avatar} alt={post.author.name} size="lg" />
                <div className="flex flex-col">
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">{post.author.name}</span>
                  <span className="text-[14px] text-[#999999]">{post.author.role}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-gray-200" />

              {/* Date & Time */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[14px] text-[#666666]">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <ReadTime minutes={post.readTime} className="text-[14px]" />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-gray-200" />

              {/* Views */}
              <div className="flex items-center gap-2 text-[14px] text-[#666666]">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-[#FAFAFA] text-[13px] font-medium text-[#666666] uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

