import React from 'react';
import { BlogCard } from '@/presentation/molecules/BlogCard/BlogCard';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { SectionLoader } from '@/presentation/atoms/Loaders';
import { EmptyState } from '@/presentation/atoms/EmptyState/EmptyState';

export interface BlogGridProps {
  posts: BlogPost[];
  loading?: boolean;
  featuredPost?: BlogPost;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, loading, featuredPost }) => {
  if (loading) {
    return <SectionLoader message="Loading blog posts..." height={600} />;
  }

  if (posts.length === 0 && !featuredPost) {
    return (
      <div className="py-20">
        <EmptyState
          icon="empty"
          title="No blog posts found"
          description="Try adjusting your filters or check back later for new content."
        />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <BlogCard post={featuredPost} featured />
        </div>
      )}

      {/* Grid of Posts */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

