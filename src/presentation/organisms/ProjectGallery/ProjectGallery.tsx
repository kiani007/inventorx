'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';
import { Project } from '@/core/domain/entities/Project';
import { ProjectCard } from '@/presentation/molecules';
import { Text } from '@/presentation/atoms';

export interface ProjectGalleryProps {
  projects: Project[];
  loading?: boolean;
  onLike?: (projectId: string, liked: boolean) => void;
  className?: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  loading = false,
  onLike,
  className,
}) => {
  const [displayCount, setDisplayCount] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 12);
      setLoadingMore(false);
    }, 500);
  };

  const displayedProjects = projects.slice(0, displayCount);
  const hasMore = displayCount < projects.length;

  if (loading) {
    return (
      <div className={cn('py-20', className)}>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
          <Text variant="body" color="secondary">
            Loading projects...
          </Text>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={cn('py-20', className)}>
        <div
          className="flex flex-col items-center justify-center gap-6 p-12 rounded-[24px] bg-gradient-to-br from-[#FFF8F0] to-white"
          style={{ boxShadow: 'var(--neo-shadow)' }}
        >
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFF8F0] to-white flex items-center justify-center"
            style={{ boxShadow: 'var(--inner-shadow)' }}
          >
            <svg
              className="w-12 h-12 text-[#D4AF37]/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-center">
            <Text variant="h3" className="mb-2">
              No Projects Found
            </Text>
            <Text variant="body" color="secondary">
              Try adjusting your filters or search terms
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <Text variant="body" color="secondary">
          Showing <span className="font-semibold text-[#1A1A1A]">{displayedProjects.length}</span> of{' '}
          <span className="font-semibold text-[#1A1A1A]">{projects.length}</span> projects
        </Text>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onLike={onLike} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={cn(
              'px-12 py-4 rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300',
              'bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white',
              'shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)]',
              'hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.5)] hover:-translate-y-1',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </span>
            ) : (
              `Load More Projects`
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export { ProjectGallery };

