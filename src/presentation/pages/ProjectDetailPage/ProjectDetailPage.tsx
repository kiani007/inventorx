'/* stylelint-disable */'
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/presentation/templates';
import {
  ProjectDetailHero,
  ProjectDetailContent,
  ProjectGallery,
} from '@/presentation/organisms';
import { Text, BackLinkButton, PageLoader } from '@/presentation/atoms';
import { AsyncState } from '@/shared/types';
import { MockProjectRepository } from '@/infrastructure/repositories/MockProjectRepository';
import { GetProjectByIdUseCase } from '@/core/usecases/project/GetProjectById';
import { GetRelatedProjectsUseCase } from '@/core/usecases/project/GetRelatedProjects';
import { Project } from '@/core/domain/entities/Project';

export interface ProjectDetailPageProps {
  projectId: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId }) => {
  const [projectState, setProjectState] = useState<AsyncState<Project>>({ loading: true });
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isAuthenticated] = useState(false); // In real app, get from auth context
  const router = useRouter();

  // Initialize repository and use cases
  const projectRepository = new MockProjectRepository();
  const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository);
  const getRelatedProjectsUseCase = new GetRelatedProjectsUseCase(projectRepository);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setProjectState({ loading: true });
        const projectData = await getProjectByIdUseCase.execute(projectId);
        
        if (!projectData) {
          router.push('/marketplace');
          return;
        }

        setProjectState({ loading: false, data: projectData });

        // Load related projects
        const related = await getRelatedProjectsUseCase.execute(projectId, 4);
        setRelatedProjects(related);
      } catch (error) {
        console.error('Error loading project:', error);
        setProjectState({ loading: false, error: 'Failed to load project' });
        router.push('/marketplace');
      } finally {
        // no-op: handled in setProjectState
      }
    };

    loadProject();
  }, [projectId, router]);

  const handleLike = (projectId: string, liked: boolean) => {
    console.log(`Project ${projectId} ${liked ? 'liked' : 'unliked'}`);
    
    if (projectState.data && projectState.data.id === projectId) {
      setProjectState({
        loading: false,
        data: { ...projectState.data, likes: projectState.data.likes + (liked ? 1 : -1) },
      });
    }
  };

  if (projectState.loading) {
    return (
      <MainLayout>
        <PageLoader message="Loading project details..." />
      </MainLayout>
    );
  }

  if (!projectState.data) {
    return null;
  }

  return (
    <MainLayout>
      {/* Back Button */}
      <section className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <BackLinkButton href="/marketplace" label="Back to Marketplace" />
        </div>
      </section>

      {/* Project Hero */}
      <ProjectDetailHero project={projectState.data} onLike={handleLike} />

      {/* Project Content */}
      <ProjectDetailContent project={projectState.data} isAuthenticated={isAuthenticated} />

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-linear-to-b from-transparent to-[#FAFAFA]">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Text variant="h2" className="text-3xl font-bold font-display mb-2">
                Similar Projects
              </Text>
              <Text variant="body" color="secondary">
                Explore more innovations in this category
              </Text>
            </div>
            <ProjectGallery projects={relatedProjects} onLike={handleLike} showSummary={false} />
          </div>
        </section>
      )}
    </MainLayout>
  );
};

