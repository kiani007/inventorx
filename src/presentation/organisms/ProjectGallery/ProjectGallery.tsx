'/* stylelint-disable */'
'use client';

import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Project } from '@/core/domain/entities/Project';
import { ProjectCard, Pagination } from '@/presentation/molecules';
import { Text, EmptyState, SectionLoader } from '@/presentation/atoms';

export interface ProjectGalleryProps {
  projects: Project[];
  loading?: boolean;
  onLike?: (projectId: string, liked: boolean) => void;
  className?: string;
  showSummary?: boolean; // controls the "Showing X of Y" header
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  loading = false,
  onLike,
  className,
  showSummary = true,
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
    return <SectionLoader message="Loading projects..." height={400} className={className} />;
  }

  if (projects.length === 0) {
    return (
      <div className={cn('py-20', className)}>
        <EmptyState
          title="No Projects Found"
          description="Try adjusting your filters or search terms"
          icon="no-results"
        />
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Results Count */}
      {showSummary && (
        <div className="flex items-center justify-between">
          <Text variant="body" color="secondary">
            Showing <span className="font-semibold text-[#1A1A1A]">{displayedProjects.length}</span> of{' '}
            <span className="font-semibold text-[#1A1A1A]">{projects.length}</span> projects
          </Text>
        </div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onLike={onLike} />
        ))}
      </div>

      {/* Load More Pagination */}
      {hasMore && (
        <Pagination
          type="infinite"
          hasMore={hasMore}
          loading={loadingMore}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export { ProjectGallery };