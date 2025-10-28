import { ProjectRepository } from '../../repositories/ProjectRepository';
import { Project } from '../../domain/entities/Project';

export class GetRelatedProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(projectId: string, limit: number = 4): Promise<Project[]> {
    return await this.projectRepository.getRelated(projectId, limit);
  }
}

