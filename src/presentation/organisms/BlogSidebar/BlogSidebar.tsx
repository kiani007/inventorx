import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { BlogCategory } from '@/core/domain/entities/BlogCategory';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export interface BlogSidebarProps {
  featuredPosts: BlogPost[];
  categories: BlogCategory[];
  className?: string;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  featuredPosts,
  categories,
  className,
}) => {
  return (
    <aside className={cn('space-y-8', className)}>
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="bg-white rounded-[40px] p-8 shadow-[var(--neo-shadow)]">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-display text-[24px] font-semibold text-[#1A1A1A]">
              Featured Posts
            </h3>
          </div>

          <div className="space-y-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group flex gap-4 cursor-pointer">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-[#1A1A1A] line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {post.title}
                    </h4>
                    <span className="text-[12px] text-[#999999] mt-1">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-[40px] p-8 shadow-[var(--neo-shadow)]">
          <h3 className="font-display text-[24px] font-semibold text-[#1A1A1A] mb-6">
            Categories
          </h3>

          <div className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className="block px-4 py-3 rounded-2xl bg-[#FAFAFA] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#E5C558] hover:text-white text-[14px] font-medium text-[#666666] transition-all duration-300"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

