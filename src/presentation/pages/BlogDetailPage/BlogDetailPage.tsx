'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/presentation/templates';
import { BlogPostHeader } from '@/presentation/organisms/BlogPostHeader/BlogPostHeader';
import { BlogPostContent } from '@/presentation/organisms/BlogPostContent/BlogPostContent';
import { RelatedPosts } from '@/presentation/organisms/RelatedPosts/RelatedPosts';
import { BackLinkButton } from '@/presentation/atoms/BackLinkButton/BackLinkButton';
import { PageLoader } from '@/presentation/atoms/Loaders';
import { MockBlogRepository } from '@/infrastructure/repositories/MockBlogRepository';
import { GetBlogPostBySlugUseCase, GetRelatedBlogPostsUseCase } from '@/core/usecases/blog';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { Share2, Heart } from 'lucide-react';
import { Button } from '@/presentation/atoms/Button/Button';
import toast from 'react-hot-toast';

export interface BlogDetailPageProps {
  slug: string;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug }) => {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);

        const blogRepository = new MockBlogRepository();
        const getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(blogRepository);
        const getRelatedBlogPostsUseCase = new GetRelatedBlogPostsUseCase(blogRepository);

        const blogPost = await getBlogPostBySlugUseCase.execute(slug);
        
        if (!blogPost) {
          router.push('/blog');
          return;
        }

        setPost(blogPost);

        // Load related posts
        const related = await getRelatedBlogPostsUseCase.execute(blogPost.id, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error loading blog post:', error);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, router]);

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <PageLoader message="Loading article..." />
      </MainLayout>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-[1200px]">
          <BackLinkButton href="/blog" label="Back to Blog" className="mb-8" />
          <BlogPostHeader post={post} />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-[900px]">
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-12">
            <Button
              variant="secondary"
              size="md"
              onClick={handleLike}
              className="flex items-center gap-2"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share
            </Button>
          </div>

          {/* Blog Content */}
          <BlogPostContent content={post.content} />

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-16 p-8 bg-[#FAFAFA] rounded-[40px]">
              <div className="flex items-start gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#D4AF37]/20">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-[24px] font-semibold text-[#1A1A1A] mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-[14px] text-[#999999] mb-3">{post.author.role}</p>
                  <p className="text-[16px] text-[#666666] leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
    </MainLayout>
  );
};

