import { ProjectRepository } from '../../repositories/ProjectRepository';
import { Project } from '../../domain/entities/Project';

export class GetFeaturedProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return await this.projectRepository.getFeatured();
  }
}

