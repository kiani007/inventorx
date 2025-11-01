'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '@/presentation/templates';
import { BlogHero } from '@/presentation/organisms/BlogHero/BlogHero';
import { BlogGrid } from '@/presentation/organisms/BlogGrid/BlogGrid';
import { BlogSidebar } from '@/presentation/organisms/BlogSidebar/BlogSidebar';
import { CategoryFilter } from '@/presentation/molecules/CategoryFilter/CategoryFilter';
import { Input } from '@/presentation/atoms/Input/Input';
import { MockBlogRepository } from '@/infrastructure/repositories/MockBlogRepository';
import { GetAllBlogPostsUseCase, GetFeaturedBlogPostsUseCase, GetBlogCategoriesUseCase } from '@/core/usecases/blog';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { BlogCategory } from '@/core/domain/entities/BlogCategory';
import { Search } from 'lucide-react';

export const BlogListingPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | undefined>();
  const [featuredSidebarPosts, setFeaturedSidebarPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | undefined>();

  // Initialize repository and use cases
  const blogRepository = new MockBlogRepository();
  const getAllBlogPostsUseCase = new GetAllBlogPostsUseCase(blogRepository);
  const getFeaturedBlogPostsUseCase = new GetFeaturedBlogPostsUseCase(blogRepository);
  const getBlogCategoriesUseCase = new GetBlogCategoriesUseCase(blogRepository);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);

      // Get all posts with filters
      const allPosts = await getAllBlogPostsUseCase.execute({
        search: searchQuery || undefined,
        category: activeCategory,
      });

      // Get featured posts for sidebar (excluding main featured)
      const featured = await getFeaturedBlogPostsUseCase.execute(4);
      
      // Set main featured post (first featured post)
      if (featured.length > 0 && !searchQuery && !activeCategory) {
        setFeaturedPost(featured[0]);
        // Rest of posts excluding the featured one
        setPosts(allPosts.filter(p => p.id !== featured[0].id));
        // Sidebar featured posts (excluding main featured)
        setFeaturedSidebarPosts(featured.slice(1));
      } else {
        setFeaturedPost(undefined);
        setPosts(allPosts);
        setFeaturedSidebarPosts(featured.slice(0, 3));
      }

      // Get categories
      const cats = await getBlogCategoriesUseCase.execute();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCategoryChange = (categorySlug: string | undefined) => {
    setActiveCategory(categorySlug);
    setSearchQuery(''); // Clear search when changing category
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setActiveCategory(undefined); // Clear category when searching
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FAFAFA]">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
            {/* Main Content */}
            <div className="space-y-12">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                  <Search className="w-5 h-5 text-[#999999]" />
                </div>
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-14 h-16 rounded-full text-[16px] shadow-[var(--neo-shadow)] border-0 bg-white"
                />
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Blog Grid */}
              <BlogGrid
                posts={posts}
                loading={loading}
                featuredPost={featuredPost}
              />
            </div>

            {/* Sidebar */}
            <BlogSidebar
              featuredPosts={featuredSidebarPosts}
              categories={categories}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

