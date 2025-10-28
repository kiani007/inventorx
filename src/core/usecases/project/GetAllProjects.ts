import { ProjectRepository, ProjectFilters } from '../../repositories/ProjectRepository';
import { Project } from '../../domain/entities/Project';

export class GetAllProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(filters?: ProjectFilters): Promise<Project[]> {
    return await this.projectRepository.getAll(filters);
  }
}

