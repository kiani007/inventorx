'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/presentation/templates';
import {
  ProjectDetailHero,
  ProjectDetailContent,
  ProjectGallery,
} from '@/presentation/organisms';
import { Text, Button } from '@/presentation/atoms';
import { MockProjectRepository } from '@/infrastructure/repositories/MockProjectRepository';
import { GetProjectByIdUseCase } from '@/core/usecases/project/GetProjectById';
import { GetRelatedProjectsUseCase } from '@/core/usecases/project/GetRelatedProjects';
import { Project } from '@/core/domain/entities/Project';

export interface ProjectDetailPageProps {
  projectId: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated] = useState(false); // In real app, get from auth context
  const router = useRouter();

  // Initialize repository and use cases
  const projectRepository = new MockProjectRepository();
  const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository);
  const getRelatedProjectsUseCase = new GetRelatedProjectsUseCase(projectRepository);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectData = await getProjectByIdUseCase.execute(projectId);
        
        if (!projectData) {
          router.push('/marketplace');
          return;
        }

        setProject(projectData);

        // Load related projects
        const related = await getRelatedProjectsUseCase.execute(projectId, 4);
        setRelatedProjects(related);
      } catch (error) {
        console.error('Error loading project:', error);
        router.push('/marketplace');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, router]);

  const handleLike = (projectId: string, liked: boolean) => {
    console.log(`Project ${projectId} ${liked ? 'liked' : 'unliked'}`);
    
    if (project && project.id === projectId) {
      setProject({
        ...project,
        likes: project.likes + (liked ? 1 : -1),
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
            <Text variant="body" color="secondary">
              Loading project details...
            </Text>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <MainLayout>
      {/* Back Button */}
      <section className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/marketplace')}
            className="flex items-center gap-2 text-[#666666] hover:text-[#D4AF37]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Marketplace
          </Button>
        </div>
      </section>

      {/* Project Hero */}
      <ProjectDetailHero project={project} onLike={handleLike} />

      {/* Project Content */}
      <ProjectDetailContent project={project} isAuthenticated={isAuthenticated} />

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-transparent to-[#FAFAFA]">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Text variant="h2" className="text-3xl font-bold font-display mb-2">
                Similar Projects
              </Text>
              <Text variant="body" color="secondary">
                Explore more innovations in this category
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProjects.map((relatedProject) => (
                <div key={relatedProject.id}>
                  <ProjectGallery
                    projects={[relatedProject]}
                    onLike={handleLike}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

