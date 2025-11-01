import React from 'react';
import { BlogCard } from '@/presentation/molecules/BlogCard/BlogCard';
import { BlogPost } from '@/core/domain/entities/BlogPost';

export interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FAFAFA]">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-[48px] font-bold text-[#1A1A1A] mb-4">
            Related Articles
          </h2>
          <p className="text-[18px] text-[#666666]">
            Continue exploring insights and stories
          </p>
        </div>

        {/* Related Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

