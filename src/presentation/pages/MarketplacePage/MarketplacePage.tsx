'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '@/presentation/templates';
import { MarketplaceHero, ProjectGallery } from '@/presentation/organisms';
import { FilterBar, FilterControls, type FilterState } from '@/presentation/molecules';
import { Tabs, TabsList, TabsTrigger } from '@/presentation/atoms';
import { theme } from '@/shared/constants/theme';
import { MockProjectRepository } from '@/infrastructure/repositories/MockProjectRepository';
import { GetAllProjectsUseCase } from '@/core/usecases/project/GetAllProjects';
import { Project } from '@/core/domain/entities/Project';
import { ProjectFilters } from '@/core/repositories/ProjectRepository';

export const MarketplacePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({});

  // Initialize repository and use cases
  const projectRepository = new MockProjectRepository();
  const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);

  const loadProjects = async (currentFilters: FilterState = {}) => {
    try {
      setLoading(true);
      
      // Convert FilterState to ProjectFilters
      const projectFilters: ProjectFilters = {};
      
      if (currentFilters.search) projectFilters.search = currentFilters.search;
      if (currentFilters.status) projectFilters.status = currentFilters.status;
      if (currentFilters.category) projectFilters.category = currentFilters.category;
      if (currentFilters.country) projectFilters.country = currentFilters.country;
      if (currentFilters.proposalType) projectFilters.proposalType = currentFilters.proposalType;
      
      // Handle view type
      if (currentFilters.viewType === 'auctions') {
        projectFilters.isAuction = true;
      } else if (currentFilters.viewType === 'projects') {
        projectFilters.isAuction = false;
      }

      const allProjects = await getAllProjectsUseCase.execute(projectFilters);
      setProjects(allProjects);
      setFilteredProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    loadProjects(newFilters);
  }, []);

  const handleLike = (projectId: string, liked: boolean) => {
    // In a real app, this would call an API
    console.log(`Project ${projectId} ${liked ? 'liked' : 'unliked'}`);
    
    // Update the likes count locally
    setFilteredProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, likes: project.likes + (liked ? 1 : -1) }
          : project
      )
    );
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <MarketplaceHero />

      {/* Filter & Gallery Section */}
      <section className="py-12 bg-gradient-to-b from-transparent to-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Filters: standalone generic controls + dedicated view tabs */}
            <div className="space-y-6">
              <Tabs value={filters.viewType || 'all'} onValueChange={(v) => {
                if (v === 'auctions') handleFilterChange({ ...filters, viewType: 'auctions', status: 'IN_AUCTION' });
                else if (v === 'projects') handleFilterChange({ ...filters, viewType: 'projects', status: undefined });
                else handleFilterChange({ ...filters, viewType: 'all', status: undefined });
              }}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="auctions">Auctions</TabsTrigger>
                </TabsList>
              </Tabs>

              <FilterControls
                fields={[
                  { type: 'search', name: 'search', placeholder: 'Search projects, innovations, technologies...' },
                  { type: 'select', name: 'status', placeholder: 'Status', options: Object.entries({ AVAILABLE: 'Available', IN_AUCTION: 'Live Auction', IN_NEGOTIATION: 'In Negotiation', SOLD: 'Sold' }).map(([value, label]) => ({ value, label })) },
                  { type: 'select', name: 'category', placeholder: 'Category', options: Object.entries({ MEDICAL_TECH: 'Medical Technology', GREEN_ENERGY: 'Green Energy', AI_ML: 'AI & Machine Learning', BIOTECH: 'Biotechnology', ROBOTICS: 'Robotics', SPACE_TECH: 'Space Technology', FINTECH: 'Financial Technology', EDTECH: 'Educational Technology' }).map(([value, label]) => ({ value, label })) },
                  { type: 'select', name: 'country', placeholder: 'Country', options: theme.filters.countries.map((c) => ({ value: c, label: c })) },
                  { type: 'select', name: 'proposalType', placeholder: 'Proposal Type', options: theme.filters.proposalTypes as { value: string; label: string }[] },
                ]}
                filterValues={filters as Record<string, string | string[] | number | boolean | undefined>}
                onChange={(name, value) => handleFilterChange({ ...filters, [name]: value })}
                onReset={() => handleFilterChange({ viewType: filters.viewType })}
                compact
              />
            </div>

            {/* Project Gallery */}
            <ProjectGallery
              projects={filteredProjects}
              loading={loading}
              onLike={handleLike}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

